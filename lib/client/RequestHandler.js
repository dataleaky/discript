"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestHandler = void 0;
const node_fetch_1 = require("node-fetch");
const Base_1 = require("../Base");
const EventHandler_1 = require("./EventHandler");
const Types = require("../Types");
const Collection_1 = require("../Collection");
const Client_1 = require("./Client");
class RequestHandler extends Base_1.default {
    constructor(client) {
        super();
        this.client = client;
        this.events = new Collection_1.default();
        this.baseURL = Types.Constants.URLs.Base;
        this.cache = {};
    }
    ;
    async request(params) {
        let file;
        const headers = {
            'Authorization': this.client.options.token,
            'User-Agent': `DiscordBot (${Client_1.pack.homepage}, ${Client_1.pack.version})`,
        };
        if (params.body?.reason) {
            headers['X-Audit-Log-Reason'] = encodeURIComponent(params.body.reason);
            delete params.body.reason;
        }
        ;
        if (params.file) {
            if (!(params.file instanceof FormData)) {
                if (!Array.isArray(params.file))
                    params.file = [params.file];
                file = new FormData();
                for (let key = 0; key < params.file.length; key++)
                    file.append('file', params.file[key].blob, params.file[key].name);
                file.append('payloadTypes._JSON', JSON.stringify({ ...params.body, file: undefined }));
            }
            ;
        }
        else if (params.body && !['get', 'delete'].includes(params.method))
            headers['Content-Type'] = 'application/json';
        const resporse = await (await node_fetch_1.default(params.url, { headers: headers, body: file || params.body && Object.keys(params.body).length ? JSON.stringify(params.body || '') : undefined, method: params.method })).text();
        this.client.handler.say('debug', 'Debug: Request headers ' + JSON.stringify(headers, null, 2) + ' body ' + JSON.stringify(file || params.body && Object.keys(params.body).length ? JSON.stringify(params.body || '') : 'NOT', null, 2) + ' resporse ' + (resporse || '"NOT"'));
        return resporse ? JSON.parse(resporse) : {};
    }
    ;
    async connect() {
        if (this.client.options.shards === 'auto') {
            const resp = await this.client.getGatewayBot();
            this.cache.gateway = resp;
            this.client.options.shards = resp.shards;
        }
        else
            this.cache.gateway = await this.client.getGateway();
        this.cache.gateway.url += '?v=8&encoding=json';
        for (let key = 0; key < this.client.options.shards; key++) {
            this.client.handler.say('debug', `Debug: Shard ${key} create`);
            const shard = new EventHandler_1.EventHandler({ client: this.client, id: key });
            this.client.shards.set(key, shard);
            shard.connect();
        }
        ;
    }
    ;
    say(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners)
            for (const listener of listeners)
                try {
                    listener.apply(this, args);
                }
                catch (error) {
                    this.say('error', error);
                }
        else if (event === 'error')
            throw args[0] || new Error('Unhandled error');
        return this;
    }
    ;
    listen(event, listener) {
        let listeners = this.events.get(event);
        if (listeners === undefined)
            listeners = [listener];
        else
            listeners.push(listener);
        this.events.set(event, listeners);
        return this;
    }
    ;
    forget(event) {
        this.events.delete(event);
        return this;
    }
    ;
}
exports.RequestHandler = RequestHandler;
;
