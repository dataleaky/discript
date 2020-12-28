"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Channel_1 = require("../structures/Channel");
const Message_1 = require("../structures/Message");
const Server_1 = require("../structures/Server");
const User_1 = require("../structures/User");
const WebSocket = require("ws");
const GatewayOpcodes = { 0: 'Dispatch', 1: 'Heartbeat', 2: 'Identify', 3: 'Presence Update', 4: 'Voice State Update', 6: 'Resume', 7: 'Reconnect', 8: 'Request Server Members', 9: 'Invalid Session', 10: 'Hello', 11: 'Heartbeat ACK' };
class EventHandler extends Base_1.default {
    constructor({ client, id }) {
        super();
        this._client = client;
        this.id = id;
        this.restart();
    }
    restart() {
        this.sequence = 0;
        this.cache = {};
        this.ratelimits = {
            queue: [],
            total: 120,
            remaining: 120,
            time: 60000,
            timer: null,
        };
        this.heartbeat = null;
        this.heartbeatAck = false;
        this.heartbeatTime = 0;
    }
    connect() {
        if (this._client.handler.cache.gateway) {
            this.ws = new WebSocket(this._client.handler.cache.gateway?.url);
            this.ws.addEventListener('open', () => this._client.handler.say('debug', `Debug: Shard ${this.id} connect`));
            this.ws.addEventListener('message', data => this.receive(JSON.parse(data.data)));
            this.ws.addEventListener('error', error => this._client.handler.say('error', error.error, this.id));
            this.ws.addEventListener('close', data => {
                this._client.handler.say('debug', `Debug: Shard ${this.id} disconnect: ${data.code}: ${data.reason}`);
                throw new Error('Disconnected!');
            });
        }
    }
    send(op) {
        switch (op) {
            case 1:
                this.heartbeatTime = Date.now();
                this.trySendWS({ op, d: this.sequence || null });
                break;
            case 2:
                this.trySendWS({ op, d: { token: this._client.options.token, properties: this._client.options.properties, compress: this._client.options.isCompress, large_threshold: this._client.options.largeThreshold, shard: [this.id, this._client.options.shard], presence: this._client.options.presence, guild_subscriptions: this._client.options.isServerSubscriptions, intents: this._client.options.intents } });
                break;
        }
    }
    trySendWS({ op, d, priority }) {
        if (priority)
            this.ratelimits.queue.unshift(JSON.stringify({ op, d, priority }));
        else
            this.ratelimits.queue.push(JSON.stringify({ op, d, priority }));
        const attempt = () => {
            if (!this.ws)
                throw new Error('No WebSocket');
            if (this.ratelimits.remaining === 0)
                return;
            if (this.ratelimits.queue.length === 0)
                return;
            if (this.ratelimits.remaining === this.ratelimits.total)
                this.ratelimits.timer = setTimeout(() => {
                    this.ratelimits.remaining = this.ratelimits.total;
                    attempt();
                }, this.ratelimits.time);
            while (this.ratelimits.remaining > 0) {
                const item = this.ratelimits.queue.shift();
                if (!item)
                    return;
                this.ws.send(item);
                this._client.handler.say('debug', `Debug: Shard ${this.id} send: ${item}`);
                this.ratelimits.remaining--;
            }
        };
        attempt();
    }
    receive(payload) {
        if (payload.s)
            this.sequence = payload.s;
        switch (payload.op) {
            case 0:
                switch (payload.t) {
                    case 'RECONNECT':
                        break;
                    case 'READY':
                        this.cache.ready = payload.d;
                        this._client.handler.say('ready');
                        this._client.startTime = Date.now();
                        this._client.user = new User_1.default({ client: this._client, ...payload.d.user });
                        if (payload.d.guilds !== undefined) {
                            const data = payload.d.guilds;
                            const collection = new Collection_1.default();
                            if (Array.isArray(data))
                                for (const object of data) {
                                    const subject = new Server_1.default({ client: this._client, ...object });
                                    collection.set(subject.flake.id, subject);
                                }
                            ;
                            this._client.servers = collection;
                        }
                        ;
                        break;
                    case 'RESUMED':
                        break;
                    case 'CHANNEL_CREATE': {
                        const channel = new Channel_1.default({ client: this._client, ...payload.d });
                        if (channel.flake)
                            this._client.channels.set(channel.flake.id, channel);
                        this._client.handler.say('channelCreate', channel);
                        break;
                    }
                    case 'CHANNEL_UPDATE': {
                        const channel = new Channel_1.default({ client: this._client, ...payload.d });
                        if (channel.flake)
                            this._client.channels.set(channel.flake.id, channel);
                        this._client.handler.say('channelUpdate', channel);
                        break;
                    }
                    case 'CHANNEL_DELETE': {
                        const channel = new Channel_1.default({ client: this._client, ...payload.d });
                        if (channel.flake)
                            this._client.channels.delete(channel.flake.id);
                        this._client.handler.say('channelDelete', channel);
                        break;
                    }
                    case 'CHANNEL_PINS_UPDATE': {
                        this._client.handler.say('channelPinsUpdate', payload.d);
                        break;
                    }
                    case 'GUILD_CREATE': {
                        let server = new Server_1.default({ client: this._client, ...payload.d });
                        // (server.flake.id >> 22n) % BigInt(this.client.options.shard);
                        server.channels.forEach(channel => this._client.channels.set(channel.flake.id, channel));
                        this._client.servers.set(server.flake.id, server);
                        this._client.handler.say('serverCreate', server);
                        break;
                    }
                    case 'GUILD_UPDATE':
                        this._client.handler.say('serverUpdate', new Server_1.default({ client: this._client, ...payload.d }));
                        break;
                    case 'GUILD_DELETE':
                        this._client.handler.say('serverDelete', new Server_1.default({ client: this._client, ...payload.d }));
                        break;
                    case 'GUILD_BAN_ADD':
                        this._client.handler.say('serverBanAdd', payload.d);
                        break;
                    case 'GUILD_BAN_REMOVE':
                        this._client.handler.say('serverBanRemove', payload.d);
                        break;
                    case 'GUILD_EMOJIS_UPDATE':
                        break;
                    case 'GUILD_INTEGRATIONS_UPDATE':
                        break;
                    case 'GUILD_MEMBER_ADD':
                        break;
                    case 'GUILD_MEMBER_REMOVE':
                        break;
                    case 'GUILD_MEMBER_UPDATE':
                        break;
                    case 'GUILD_MEMBERS_CHUNK':
                        break;
                    case 'GUILD_ROLE_CREATE':
                        break;
                    case 'GUILD_ROLE_UPDATE':
                        break;
                    case 'GUILD_ROLE_DELETE':
                        break;
                    case 'INVITE_CREATE':
                        break;
                    case 'INVITE_DELETE':
                        break;
                    case 'MESSAGE_CREATE': {
                        const message = new Message_1.default({ client: this._client, ...payload.d });
                        this._client.channels.get(message.channelFlake.id).lastMessageFlake = message.flake;
                        this._client.handler.say('messageCreate', message);
                        break;
                    }
                    case 'MESSAGE_UPDATE': {
                        const message = new Message_1.default({ client: this._client, ...payload.d });
                        this._client.handler.say('messageCreate', message);
                        break;
                    }
                    case 'MESSAGE_DELETE':
                        break;
                    case 'MESSAGE_DELETE_BULK':
                        break;
                    case 'MESSAGE_REACTION_ADD':
                        break;
                    case 'MESSAGE_REACTION_REMOVE':
                        break;
                    case 'MESSAGE_REACTION_REMOVE_ALL':
                        break;
                    case 'MESSAGE_REACTION_REMOVE_EMOJI':
                        break;
                    case 'PRESENCE_UPDATE':
                        break;
                    case 'TYPING_START':
                        break;
                    case 'USER_UPDATE':
                        break;
                    case 'VOICE_STATE_UPDATE':
                        break;
                    case 'VOICE_SERVER_UPDATE':
                        break;
                    case 'WEBHOOKS_UPDATE':
                        break;
                    default:
                        this._client.handler.say('warning', `Unknown gateway event: ${JSON.stringify(payload)}`);
                        break;
                }
                break;
            case 10:
                this.send(2);
                this.send(1);
                this._client.handler.say('debug', `Debug: Shard ${this.id} receive: ${JSON.stringify(payload)}`);
                if (payload.d)
                    this.heartbeat = setInterval(() => this.send(1), Number(payload.d.heartbeat_interval));
                break;
            case 11:
                this._client.ping = Date.now() - this.heartbeatTime;
                break;
            default:
                this._client.handler.say('warning', `Unknown opcode: ${JSON.stringify(payload)}`);
                break;
        }
    }
}
exports.default = EventHandler;
