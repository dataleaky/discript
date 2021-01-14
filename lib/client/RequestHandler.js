"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const EventHandler_1 = require("./EventHandler");
const node_fetch_1 = require("node-fetch");
class Emitter extends Base_1.default {
    constructor() {
        super();
        this._events = new Collection_1.default();
    }
    say(event, ...args) {
        const listeners = this._events.get(event);
        if (listeners)
            for (const listener of listeners)
                try {
                    listener(...args);
                }
                catch (error) {
                    this.say('error', error, null);
                }
        else if (event === 'error')
            throw args[0] || new Error('Unhandled error');
        return this;
    }
    listen(event, listener) {
        let listeners = this._events.get(event);
        if (listeners === undefined)
            listeners = [listener];
        else
            listeners.push(listener);
        this._events.set(event, listeners, true);
        return this;
    }
    forget(event) {
        this._events.delete(event);
        return this;
    }
}
class RequestHandler extends Emitter {
    constructor(client) {
        super();
        this._client = client;
        this.shards = new Collection_1.default();
        this.gatewayURL = null;
    }
    generateFlake(time) {
        return (BigInt(time instanceof Date ? time.getTime() : time) - BigInt(14200704e5)) << BigInt(22);
    }
    computePermissions(member, channel) {
        if (channel.server.owner.flake.id === member.user.flake.id)
            return BigInt(2147483647);
        let b_permissions = channel.server.roles.get(channel.server.flake.id).bitPermission.flags;
        member.roles.forEach(element => base_permissions |= element.bitPermission.flags);
        let base_permissions = (b_permissions & BigInt(8)) === BigInt(8) ? BigInt(2147483647) : b_permissions;
        if ((base_permissions & BigInt(8)) === BigInt(8))
            return BigInt(2147483647);
        let overwrites = channel.permissions;
        let overwrite_everyone = overwrites.get(channel.serverFlake.id);
        if (overwrite_everyone) {
            base_permissions &= ~overwrite_everyone.deny.flags;
            base_permissions |= overwrite_everyone.allow.flags;
        }
        let allow = BigInt(0);
        let deny = BigInt(0);
        member.rolesFlake.forEach(element => {
            let overwrite_role = overwrites.get(element.id);
            if (overwrite_role) {
                allow |= overwrite_role.allow.flags;
                deny |= overwrite_role.deny.flags;
            }
        });
        base_permissions &= ~deny;
        base_permissions |= allow;
        let overwrite_member = overwrites.get(member.user.flake.id);
        if (overwrite_member) {
            base_permissions &= ~overwrite_member.deny.flags;
            base_permissions |= overwrite_member.allow.flags;
        }
        return base_permissions;
    }
    async request(params) {
        const headers = {
            'Authorization': this._client.options.token,
            'User-Agent': this._client.options.userAgent,
        };
        if (params.body?.reason) {
            headers['X-Audit-Log-Reason'] = encodeURIComponent(params.body.reason);
            if (params.method !== 'PUT' || !params.url.includes('/bans/'))
                delete params.body.reason;
        }
        let file;
        if (params.file) {
        }
        else if (params.body) {
            if (['GET', 'DELETE'].includes(params.method)) {
                params.url += '?' + Object.entries(params.body).map(element => `${encodeURIComponent(element[0])}=${encodeURIComponent(typeof element[1] === 'bigint' ? element[1].toString() : Array.isArray(element[1]) ? element[1].map((value) => value.toString()).join(',') : element[1])}`).join('&');
                params.body = undefined;
            }
            else
                headers['Content-Type'] = 'application/json';
        }
        const resporse = await node_fetch_1.default(params.url, { headers: headers, body: file || params.body && Object.keys(params.body).length ? JSON.stringify(params.body || '') : undefined, method: params.method });
        const rateLimit = {
            global: resporse.headers.get('X-RateLimit-Global'),
            limit: resporse.headers.get('X-RateLimit-Limit'),
            remaining: resporse.headers.get('X-RateLimit-Remaining'),
            reset: resporse.headers.get('X-RateLimit-Reset'),
            resetAfter: resporse.headers.get('X-RateLimit-Reset-After'),
            bucket: resporse.headers.get('X-RateLimit-Bucket')
        };
        this.say('debug', `Debug: Request ratelimits ${JSON.stringify(rateLimit, null, 2)}`);
        if (resporse.status === 419)
            return new Error(JSON.stringify(rateLimit, null, 2));
        let resporseText = await resporse.text();
        resporseText = JSON.parse(resporseText || '{}');
        this.say('debug', `Debug: Request resporse ${JSON.stringify(resporseText, null, 2)}`);
        return resporseText;
    }
    async connect() {
        if (this._client.options.numShards === 'auto') {
            const resp = await this._client.getGatewayBot();
            this._client.options.numShards = resp.shards;
            this.gatewayURL = resp.url;
        }
        else
            this.gatewayURL = (await this._client.getGateway()).url;
        this.gatewayURL += '?v=8&encoding=json';
        for (let key = 0; key < this._client.options.numShards; key++) {
            this.say('debug', `Debug: Shard ${key} create`);
            const shard = new EventHandler_1.default({ _client: this._client, id: key });
            this.shards.set(key, shard, true);
            shard.connect();
            this.listen('shardReady', () => {
                for (const subject of this.shards.values())
                    if (subject.status !== 'ready')
                        return;
                this.say('ready');
            });
        }
    }
}
exports.default = RequestHandler;
