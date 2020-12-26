"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocket = require("ws");
const Base_1 = require("../Base");
const Client_1 = require("./Client");
const GatewayOpcodes = {};
;
;
GatewayVersions: {
    6;
    'Deprecated', 7;
    'Doesn\'t look like anything to me', 8;
    'Available';
}
GatewayOpcodes: {
    0;
    'Dispatch', 1;
    'Heartbeat', 2;
    'Identify', 3;
    'Presence Update', 4;
    'Voice State Update', 6;
    'Resume', 7;
    'Reconnect', 8;
    'Request Guild Members', 9;
    'Invalid Session', 10;
    'Hello', 11;
    'Heartbeat ACK';
}
GatewayCloseEventCodes: {
    4000;
    'Unknown error', 4001;
    'Unknown opcode', 4002;
    'Decode error', 4003;
    'Not authenticated', 4004;
    'Authentication failed', 4005;
    'Already authenticated', 4007;
    'Invalid seq', 4008;
    'Rate limited', 4009;
    'Session timed out', 4010;
    'Invalid shard', 4011;
    'Sharding required', 4012;
    'Invalid API version', 4013;
    'Invalid intent(s)', 4014;
    'Disallowed intent(s)';
}
VoiceOpcodes: {
    0;
    'Identify', 1;
    'Select Protocol', 2;
    'Ready', 3;
    'Heartbeat', 4;
    'Session Description', 5;
    'Speaking', 6;
    'Heartbeat ACK', 7;
    'Resume', 8;
    'Hello', 9;
    'Resumed', 13;
    'Client Disconnect';
}
VoiceCloseEventCodes: {
    4001;
    'Unknown opcode', 4003;
    'Not authenticated', 4004;
    'Authentication failed', 4005;
    'Already authenticated', 4006;
    'Session no longer valid', 4009;
    'Session timeout', 4011;
    'Server not found', 4012;
    'Unknown protocol', 4014;
    'Disconnected', 4015;
    'Voice server crashed', 4016;
    'Unknown encryption mode';
}
HTTPResponseCodes: {
    200;
    'OK', 201;
    'CREATED', 204;
    'NO CONTENT', 304;
    'NOT MODIFIED', 400;
    'BAD REQUEST', 401;
    'UNAUTHORIZED', 403;
    'FORBIDDEN', 404;
    'NOT FOUND', 405;
    'METHOD NOT ALLOWED', 429;
    'TOO MANY REQUESTS', 502;
    'GATEWAY UNAVAILABLE', 500;
    'SERVER ERROR';
}
JSONErrorCodes: {
    0;
    'General error', 10001;
    'Unknown account', 10002;
    'Unknown application', 10003;
    'Unknown channel', 10004;
    'Unknown guild', 10005;
    'Unknown integration', 10006;
    'Unknown invite', 10007;
    'Unknown member', 10008;
    'Unknown message', 10009;
    'Unknown permission overwrite', 10010;
    'Unknown provider', 10011;
    'Unknown role', 10012;
    'Unknown token', 10013;
    'Unknown user', 10014;
    'Unknown emoji', 10015;
    'Unknown webhook', 10026;
    'Unknown ban', 10027;
    'Unknown SKU', 10028;
    'Unknown Store Listing', 10029;
    'Unknown entitlement', 10030;
    'Unknown build', 10031;
    'Unknown lobby', 10032;
    'Unknown branch', 10036;
    'Unknown redistributable', 10057;
    'Unknown guild template', 20001;
    'Bots cannot use this endpoint', 20002;
    'Only bots can use this endpoint', 20022;
    'This message cannot be edited due to announcement rate limits', 20028;
    'The channel you are writing has hit the write rate limit', 30001;
    'Maximum number of guilds reached', 30002;
    'Maximum number of friends reached', 30003;
    'Maximum number of pins reached for the channel', 30005;
    'Maximum number of guild roles reached', 30007;
    'Maximum number of webhooks reached', 30010;
    'Maximum number of reactions reached', 30013;
    'Maximum number of guild channels reached', 30015;
    'Maximum number of attachments in a message reached', 30016;
    'Maximum number of invites reached', 40001;
    'Unauthorized. Provide a valid token and try again', 40002;
    'You need to verify your account in order to perform this action', 40005;
    'Request entity too large. Try sending something smaller in size', 40006;
    'This feature has been temporarily disabled server-side', 40007;
    'The user is banned from this guild', 40033;
    'This message has already been crossposted', 50001;
    'Missing access', 50002;
    'Invalid account type', 50003;
    'Cannot execute action on a DM channel', 50004;
    'Guild widget disabled', 50005;
    'Cannot edit a message authored by another user', 50006;
    'Cannot send an empty message', 50007;
    'Cannot send messages to this user', 50008;
    'Cannot send messages in a voice channel', 50009;
    'Channel verification level is too high for you to gain access', 50010;
    'OAuth2 application does not have a bot', 50011;
    'OAuth2 application limit reached', 50012;
    'Invalid OAuth2 state', 50013;
    'You lack permissions to perform that action', 50014;
    'Invalid authentication token provided', 50015;
    'Note was too long', 50016;
    'Provided too few or too many messages to delete. Must provide at least 2 and fewer than 100 messages to delete', 50019;
    'A message can only be pinned to the channel it was sent in', 50020;
    'Invite code was either invalid or taken', 50021;
    'Cannot execute action on a system message', 50024;
    'Cannot execute action on this channel type', 50025;
    'Invalid OAuth2 access token provided', 50033;
    'Invalid Recipient(s)', 50034;
    'A message provided was too old to bulk delete', 50035;
    'Invalid form body', 50036;
    'An invite was accepted to a guild the application\'s bot is not in', 50041;
    'Invalid API version provided', 50074;
    'Cannot delete a channel required for Community guilds', 90001;
    'Reaction was blocked', 130000;
    'API resource is currently overloaded. Try again a little later';
}
RPCErrorCodes: {
    1000;
    'Unknown error', 4000;
    'Invalid payload', 4002;
    'Invalid command', 4003;
    'Invalid guild', 4004;
    'Invalid event', 4005;
    'Invalid channel', 4006;
    'Invalid permissions', 4007;
    'Invalid client ID', 4008;
    'Invalid origin', 4009;
    'Invalid token', 4010;
    'Invalid user', 5000;
    'OAuth2 error', 5001;
    'Select channel timed out', 5002;
    'GET_GUILD timed out', 5003;
    'Select voice force required', 5004;
    'Capture shortcut already listening';
}
RPCCloseEventCodes: {
    4000;
    'Invalid client ID', 4001;
    'Invalid origin', 4002;
    'Rate limited', 4003;
    'Token revoked', 4004;
    'Invalid version', 4005;
    'Invalid encoding';
}
URLs: {
    Base: 'https://discord.com/api',
        CDN;
    'https://cdn.discordapp.com';
}
Endpoints: {
    Gateway: '/gateway',
        GatewayBot;
    '/gateway/bot',
        Authorization;
    '/oauth2/authorize',
        Token;
    '/oauth2/token',
        TokenRevocation;
    '/oauth2/token/revoke',
    ;
}
class EventHandler extends Base_1.default {
    constructor({ client, id }) {
        super();
        this.client = client;
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
        if (this.client.handler.cache.gateway) {
            this.ws = new WebSocket(this.client.handler.cache.gateway?.url);
            this.ws.addEventListener('open', () => this.client.handler.say('debug', `Debug: Shard ${this.id} connect`));
            this.ws.addEventListener('message', data => this.receive(JSON.parse(data.data)));
            this.ws.addEventListener('error', error => this.client.handler.say('error', error.error, this.id));
            this.ws.addEventListener('close', data => {
                this.client.handler.say('debug', `Debug: Shard ${this.id} disconnect: ${data.code}: ${data.reason}`);
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
                this.trySendWS({ op, d: { token: this.client.options.token, properties: { $os: process.platform, $browser: Client_1.pack.name, $device: Client_1.pack.name }, compress: false, large_threshold: 50, shard: [this.id, this.client.options.shards], presence: this.client.options.presence, guild_subscriptions: true, intents: this.client.options.intends } });
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
                this.client.handler.say('debug', `Debug: Shard ${this.id} send: ${item}`);
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
                    case 'READY':
                        this.client.handler.say('ready');
                        this.client.starttime = Date.now();
                        break;
                    case 'MESSAGE_CREATE':
                        this.client.handler.say('messageCreate', payload.d);
                        break;
                    default:
                        this.client.handler.say('warning', `Unknown gateway event: ${JSON.stringify(payload)}`);
                        break;
                }
                break;
            case 10:
                this.send(2);
                this.send(1);
                this.client.handler.say('debug', `Debug: Shard ${this.id} receive: ${JSON.stringify(payload)}`);
                if (payload.d)
                    this.heartbeat = setInterval(() => this.send(1), Number(payload.d.heartbeat_interval));
                break;
            case 11:
                this.client.ping = Date.now() - this.heartbeatTime;
                break;
            default:
                this.client.handler.say('warning', `Unknown opcode: ${JSON.stringify(payload)}`);
                break;
        }
    }
}
exports.default = EventHandler;
