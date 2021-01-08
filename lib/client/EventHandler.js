"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const App_1 = require("../structures/App");
const Channel_1 = require("../structures/Channel");
const Message_1 = require("../structures/Message");
const Presence_1 = require("../structures/Presence");
const Server_1 = require("../structures/Server");
const User_1 = require("../structures/User");
const WebSocket = require("ws");
class EventHandler extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.id = data.id;
        this.reset();
    }
    reset() {
        this.rateLimit = {
            queue: [],
            total: 120,
            remaining: 120,
            interval: 60000
        };
        if (this.heartbeatInterval !== null)
            clearInterval(this.heartbeatInterval);
        this.heartbeatInterval = null;
        this.heartbeatTime = null;
        this.heartbeatIsAcked = false;
        this.responseTime = Infinity;
        this.startTime = null;
        this.sequence = null;
        this.status = 'disconnected';
        this._client.handler.say('debug', `Debug: Shard ${this.id} reset`);
    }
    connect() {
        this.ws = new WebSocket(this._client.handler.gatewayURL);
        this.ws.addEventListener('open', () => this._client.handler.say('debug', `Debug: Shard ${this.id} connected`));
        this.ws.addEventListener('message', data => this.receive(JSON.parse(data.data)));
        this.ws.addEventListener('error', error => this._client.handler.say('error', error.error, this.id));
        this.ws.addEventListener('close', cb => {
            let error = null, reconnect = true, reset = false;
            switch (cb.code) {
                case 4000:
                    error = new Error(`${cb.code}: Unknown gateway error - ${cb.reason}`);
                    break;
                case 4001:
                    error = new Error(`${cb.code}: Gateway received invalid opcode - ${cb.reason}`);
                    break;
                case 4002:
                    error = new Error(`${cb.code}: Gateway received invalid data - ${cb.reason}`);
                    break;
                case 4003:
                    error = new Error(`${cb.code}: Not authenticated - ${cb.reason}`);
                    reconnect = false;
                    break;
                case 4004:
                    error = new Error(`${cb.code}: Gateway received invalid account token - ${cb.reason}`);
                    reconnect = false;
                    break;
                case 4005:
                    error = new Error(`${cb.code}: Already authenticated - ${cb.reason}`);
                    reset = true;
                    break;
                case 4007:
                    error = new Error(`${cb.code}: Gateway received invalid sequence - ${cb.reason}`);
                    break;
                case 4008:
                    error = new Error(`${cb.code}: Rate limited - ${cb.reason}`);
                    break;
                case 4009:
                    error = new Error(`${cb.code}: Session timed out - ${cb.reason}`);
                    break;
                case 4010:
                    error = new Error(`${cb.code}: Gateway received invalid shard - ${cb.reason}`);
                    break;
                case 4011:
                    error = new Error(`${cb.code}: Sharding required - ${cb.reason}`);
                    reconnect = false;
                    break;
                case 4012:
                    error = new Error(`${cb.code}: Gateway received invalid API version - ${cb.reason}`);
                    reset = true;
                    break;
                case 4013:
                    error = new Error(`${cb.code}: Gateway received invalid intents - ${cb.reason}`);
                    reconnect = false;
                    break;
                case 4014:
                    error = new Error(`${cb.code}: Gateway received disallowed intents - ${cb.reason}`);
                    reconnect = false;
                    break;
                default:
                    if (cb.code === 1000) {
                        error = new Error(`${cb.code}: Clean disconnect`);
                        reconnect = false;
                    }
                    else
                        error = new Error(`${cb.code}: Unknown error - ${cb.reason}`);
                    break;
            }
            this.disconnect({ reconnect, reset, error });
            this._client.handler.say('debug', `Debug: Shard ${this.id} disconnect: ${cb.code}: ${cb.reason}`);
        });
    }
    disconnect(params) {
        this.status = 'disconnected';
        if (params.error !== undefined)
            this._client.handler.say('error', params.error, this.id);
        if (params.reset)
            this.reset();
        if (params.reconnect) {
            this.resume({ seq: this.sequence, session_id: this.sessionID, token: this._client.options.token });
            this._client.handler.say('debug', `Debug: Shard ${this.id} reconnected`);
            this.connect();
        }
        else {
            this._client.handler.say('debug', `Debug: Shard ${this.id} disconnected`);
        }
    }
    identify(params) {
        this.status = 'connect';
        this.send({ op: 2, d: params, priority: true });
    }
    resume(params) {
        this.status = 'resume';
        this.send({ op: 6, d: params, priority: true });
    }
    heartbeat(params) {
        if (this.status !== 'ready' && this.status !== 'connect')
            return;
        if (this.heartbeatTime !== null && !this.heartbeatIsAcked)
            this.disconnect({ reconnect: true, reset: false });
        this.heartbeatIsAcked = false;
        this.heartbeatTime = Date.now();
        this.send({ op: 1, d: params, priority: true });
    }
    requestServerMembers(params) {
        this.send({ op: 8, d: params });
    }
    editVoiceState(params) {
        this.send({ op: 4, d: params });
    }
    editPresence(params) {
        this.send({ op: 3, d: params });
    }
    send(params) {
        if (params.priority)
            this.rateLimit.queue.unshift(JSON.stringify({ op: params.op, d: params.d }, null, 2));
        else
            this.rateLimit.queue.push(JSON.stringify({ op: params.op, d: params.d }, null, 2));
        const attempt = () => {
            if (!this.rateLimit.remaining || !this.rateLimit.queue.length)
                return;
            if (this.rateLimit.remaining === this.rateLimit.total)
                setTimeout(() => {
                    this.rateLimit.remaining = this.rateLimit.total;
                    attempt();
                }, this.rateLimit.interval);
            while (this.rateLimit.remaining > 0) {
                if (!this.rateLimit.queue.length)
                    return;
                const item = this.rateLimit.queue.shift();
                if (!item)
                    continue;
                this.rateLimit.remaining--;
                this.ws.send(item);
                this._client.handler.say('debug', `Debug: Shard ${this.id} sent ${item}`);
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
                    case 'READY': {
                        this.status = 'ready';
                        this.startTime = Date.now();
                        this._client.user = new User_1.default({ _client: this._client, ...payload.d.user });
                        payload.d.private_channels.forEach(element => {
                            const subject = new Channel_1.default({ _client: this._client, ...element });
                            this._client.channels.set(subject.flake.id, subject);
                        });
                        payload.d.guilds.forEach(element => {
                            const subject = new Server_1.default({ _client: this._client, ...element });
                            this._client.servers.set(subject.flake.id, subject);
                        });
                        this.sessionID = payload.d.session_id;
                        const subject = new App_1.default({ _client: this._client, ...payload.d.application });
                        this._client.apps.set(subject.flake.id, subject);
                        this._client.handler.say('debug', `Debug: Shard ${this.id} received "${payload.t}" payload ${JSON.stringify(payload, null, 2)}`);
                        this._client.handler.say('shardReady');
                        break;
                    }
                    case 'RESUMED': {
                        this.status = 'ready';
                        this.heartbeat(this.sequence);
                        break;
                    }
                    case 'GUILD_MEMBER_CHUNK': {
                        payload.d.members.forEach(element => {
                            const subject = new Server_1.ServerMember({ _client: this._client, ...element });
                            this._client.servers.get(BigInt(payload.d.guild_id)).members.set(subject.user.flake.id, subject);
                        });
                        this._client.handler.say('debug', `Debug: Shard ${this.id} received "${payload.t}" payload ${JSON.stringify(payload, null, 2)}`);
                        break;
                    }
                    case 'CHANNEL_CREATE': {
                        const subject = new Channel_1.default({ _client: this._client, ...payload.d });
                        this._client.channels.set(subject.flake.id, subject);
                        this._client.handler.say('channelAdd', subject);
                        break;
                    }
                    case 'CHANNEL_UPDATE': {
                        const subject = new Channel_1.default({ _client: this._client, ...payload.d });
                        this._client.channels.set(subject.flake.id, subject);
                        this._client.handler.say('channelEdit', subject);
                        break;
                    }
                    case 'CHANNEL_DELETE': {
                        const subject = new Channel_1.default({ _client: this._client, ...payload.d });
                        this._client.channels.delete(subject.flake.id);
                        this._client.handler.say('channelRemove', subject);
                        break;
                    }
                    case 'CHANNEL_PINS_UPDATE': {
                        this._client.handler.say('channelPinsEdit', payload.d.channel_id, payload.d.guild_id, payload.d.last_pin_timestamp === undefined || payload.d.last_pin_timestamp === null ? payload.d.last_pin_timestamp : Date.parse(payload.d.last_pin_timestamp));
                        break;
                    }
                    case 'GUILD_CREATE': {
                        const subject = new Server_1.default({ _client: this._client, ...payload.d });
                        this._client.servers.set(subject.flake.id, subject);
                        this._client.handler.say('serverAdd', subject);
                        break;
                    }
                    case 'GUILD_UPDATE': {
                        const subject = new Server_1.default({ _client: this._client, ...payload.d });
                        this._client.servers.set(subject.flake.id, subject);
                        this._client.handler.say('serverEdit', subject);
                        break;
                    }
                    case 'GUILD_DELETE': {
                        const subject = new Server_1.default({ _client: this._client, ...payload.d });
                        this._client.servers.set(subject.flake.id, subject);
                        this._client.handler.say('serverRemove', subject);
                        break;
                    }
                    case 'GUILD_BAN_ADD': {
                        this._client.handler.say('serverBanAdd', payload.d.guild_id, new User_1.default({ _client: this._client, ...payload.d.user }));
                        break;
                    }
                    case 'GUILD_BAN_REMOVE': {
                        this._client.handler.say('serverBanRemove', payload.d.guild_id, new User_1.default({ _client: this._client, ...payload.d.user }));
                        break;
                    }
                    case 'GUILD_EMOJIS_UPDATE': {
                        const collection = new Collection_1.default();
                        for (const object of payload.d.emojis) {
                            const subject = new Server_1.Emoji({ _client: this._client, ...object });
                            collection.set(subject.flake.id, subject);
                        }
                        this._client.handler.say('serverEmojisEdit', payload.d.guild_id, collection);
                        break;
                    }
                    case 'GUILD_INTEGRATIONS_UPDATE': {
                        this._client.handler.say('serverIntegrationsEdit', payload.d.guild_id);
                        break;
                    }
                    case 'GUILD_MEMBER_ADD': {
                        this._client.handler.say('serverMemberAdd', payload.d.guild_id, new Server_1.ServerMember({ _client: this._client, ...payload.d }));
                        break;
                    }
                    case 'GUILD_MEMBER_UPDATE': {
                        this._client.handler.say('serverMemberEdit', payload.d.guild_id, new User_1.default({ _client: this._client, ...payload.d.user }), payload.d.roles, Date.parse(payload.d.joined_at), payload.d.nick, payload.d.premium_since === undefined || payload.d.premium_since === null ? payload.d.premium_since : Date.parse(payload.d.premium_since));
                        break;
                    }
                    case 'GUILD_MEMBER_REMOVE': {
                        this._client.handler.say('serverMemberRemove', payload.d.guild_id, new User_1.default({ _client: this._client, ...payload.d.user }));
                        break;
                    }
                    case 'GUILD_ROLE_CREATE': {
                        this._client.handler.say('serverRoleAdd', payload.d.guild_id, new Server_1.Role({ _client: this._client, ...payload.d.role }));
                        break;
                    }
                    case 'GUILD_ROLE_UPDATE': {
                        this._client.handler.say('serverRoleEdit', payload.d.guild_id, new Server_1.Role({ _client: this._client, ...payload.d.role }));
                        break;
                    }
                    case 'GUILD_ROLE_DELETE': {
                        this._client.handler.say('serverRoleRemove', payload.d.guild_id, payload.d.role_id);
                        break;
                    }
                    case 'INVITE_CREATE': {
                        this._client.handler.say('inviteAdd', payload.d.code, payload.d.channel_id, Date.parse(payload.d.created_at), payload.d.guild_id, payload.d.inviter === undefined ? payload.d.inviter : new User_1.default({ _client: this._client, ...payload.d.inviter }), payload.d.max_age, payload.d.max_uses, payload.d.target_user === undefined ? payload.d.target_user : new User_1.default({ _client: this._client, ...payload.d.target_user }), payload.d.target_user_type, payload.d.temporary, payload.d.uses);
                        break;
                    }
                    case 'INVITE_DELETE': {
                        this._client.handler.say('inviteRemove', payload.d.code, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'MESSAGE_CREATE': {
                        const subject = new Message_1.default({ _client: this._client, ...payload.d });
                        this._client.handler.say('messageAdd', subject);
                        break;
                    }
                    case 'MESSAGE_UPDATE': {
                        const subject = new Message_1.default({ _client: this._client, ...payload.d });
                        this._client.handler.say('messageEdit', subject);
                        break;
                    }
                    case 'MESSAGE_DELETE': {
                        this._client.handler.say('messageRemove', payload.d.id, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'MESSAGE_DELETE_BULK': {
                        this._client.handler.say('messagesRemove', payload.d.ids, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'MESSAGE_REACTION_ADD': {
                        this._client.handler.say('messageReactionAdd', new Server_1.Emoji({ _client: this._client, ...payload.d.emoji }), payload.d.user_id, payload.d.message_id, payload.d.channel_id, payload.d.guild_id, payload.d.member === undefined ? payload.d.member : new Server_1.ServerMember({ _client: this._client, ...payload.d.member }));
                        break;
                    }
                    case 'MESSAGE_REACTION_REMOVE': {
                        this._client.handler.say('messageReactionRemove', new Server_1.Emoji({ _client: this._client, ...payload.d.emoji }), payload.d.user_id, payload.d.message_id, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'MESSAGE_REACTION_REMOVE_ALL': {
                        this._client.handler.say('messageReactionsRemove', payload.d.message_id, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'MESSAGE_REACTION_REMOVE_EMOJI': {
                        this._client.handler.say('messageReactionsEmojiRemove', new Server_1.Emoji({ _client: this._client, ...payload.d.emoji }), payload.d.message_id, payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    case 'PRESENCE_UPDATE': {
                        const subject = new Presence_1.default({ _client: this._client, ...payload.d });
                        this._client.handler.say('presenceEdit', subject);
                        break;
                    }
                    case 'TYPING_START': {
                        this._client.handler.say('typingStart', payload.d.timestamp, payload.d.user_id, payload.d.channel_id, payload.d.guild_id, payload.d.member === undefined ? payload.d.member : new Server_1.ServerMember({ _client: this._client, ...payload.d.member }));
                        break;
                    }
                    case 'USER_UPDATE': {
                        const subject = new User_1.default({ _client: this._client, ...payload.d });
                        this._client.handler.say('userEdit', subject);
                        break;
                    }
                    case 'VOICE_STATE_UPDATE': {
                        const subject = new Server_1.VoiceState({ _client: this._client, ...payload.d });
                        this._client.handler.say('voiceStateEdit', subject);
                        break;
                    }
                    case 'VOICE_SERVER_UPDATE': {
                        this._client.handler.say('voiceServerEdit', payload.d.token, payload.d.guild_id, payload.d.endpoint);
                        break;
                    }
                    case 'WEBHOOKS_UPDATE': {
                        this._client.handler.say('webhookEdit', payload.d.channel_id, payload.d.guild_id);
                        break;
                    }
                    default: {
                        this._client.handler.say('debug', `Debug: Shard ${this.id} received unknown "DISPATCH" payload ${JSON.stringify(payload, null, 2)}`);
                        break;
                    }
                }
                break;
            case 1: {
                this.heartbeat(this.sequence);
                this._client.handler.say('debug', `Debug: Shard ${this.id} received "HEARTBEAT" payload ${JSON.stringify(payload, null, 2)}`);
                break;
            }
            case 7: {
                this.disconnect({ reconnect: true, reset: false });
                this._client.handler.say('debug', `Debug: Shard ${this.id} received "RECONNECT" payload ${JSON.stringify(payload, null, 2)}`);
                break;
            }
            case 9: {
                this.disconnect({ reconnect: true, reset: !payload.d });
                this._client.handler.say('debug', `Debug: Shard ${this.id} received "INVALID_SESSION" payload ${JSON.stringify(payload, null, 2)}`);
                break;
            }
            case 10: {
                if (this.heartbeatInterval !== null)
                    clearInterval(this.heartbeatInterval);
                this._client.handler.say('debug', `Debug: Shard ${this.id} received "HELLO" payload ${JSON.stringify(payload, null, 2)}`);
                this.identify({ intents: this._client.options.intents, properties: this._client.options.properties, token: this._client.options.token, compress: this._client.options.isCompress, guild_subscriptions: this._client.options.isServerSubscriptions, large_threshold: this._client.options.largeThreshold, presence: this._client.options.presence, shard: [this.id, this._client.options.numShards] });
                this.heartbeat(this.sequence);
                this.heartbeatInterval = setInterval(() => this.heartbeat(this.sequence), payload.d.heartbeat_interval);
                break;
            }
            case 11: {
                this.heartbeatIsAcked = true;
                this.responseTime = Date.now() - this.heartbeatTime;
                this._client.handler.say('debug', `Debug: Shard ${this.id} received "HEARTBEAT_ACK" payload ${JSON.stringify(payload, null, 2)}`);
                break;
            }
            default: {
                this._client.handler.say('debug', `Debug: Shard ${this.id} received unknown payload ${JSON.stringify(payload, null, 2)}`);
                break;
            }
        }
    }
}
exports.default = EventHandler;
