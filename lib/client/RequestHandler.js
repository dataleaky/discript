"use strict";

const Base = require("../dev/Base");
const Collection = require("../dev/Collection");
const EventHandler = require("./EventHandler");
const fetch = require("node-fetch");
class Emitter extends Base.default {
  constructor() {
    super();
    this.events = new Collection.default();
  }
  say(event, ...args) {
    const listeners = this.events.get(event);
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
    let listeners = this.events.get(event);
    if (listeners === undefined)
      listeners = [listener];
    else
      listeners.push(listener);
    this.events.set(event, listeners);
    return this;
  }
  forget(event) {
    this.events.delete(event);
    return this;
  }
}
class RequestHandler extends Emitter {
  constructor(client) {
    super();
    this.client = client;
    this.shards = new Collection.default();
    this.cache = {};
  }
  async request(params) {
    const headers = {
      'Authorization': this.client.options.token,
      'User-Agent': this.client.options.userAgent,
    };
    if (params.body?.reason) {
      headers['X-Audit-Log-Reason'] = encodeURIComponent(params.body.reason);
      delete params.body.reason;
    }
    let file;
    if (params.file) {
      // if (!(params.file instanceof FormData)) {
      //   if (!Array.isArray(params.file))
      //     params.file = [params.file];
      //   file = new FormData();
      //   for (let key = 0; key < params.file.length; key++)
      //     file.append('file', (params.file[key] as FileContents).blob, (params.file[key] as FileContents).name);
      //   file.append('payloadTypes._JSON', JSON.stringify({ ...params.body, file: undefined }));
      // }
    }
    else if (params.body && !['get', 'delete'].includes(params.method))
      headers['Content-Type'] = 'application/json';
    const resporse = await (await fetch.default(params.url, { headers: headers, body: file || params.body && Object.keys(params.body).length ? JSON.stringify(params.body || '') : undefined, method: params.method })).text();
    this.client.handler.say('debug', 'Debug: Request headers ' + JSON.stringify(headers, null, 2) + ' body ' + JSON.stringify(file || params.body && Object.keys(params.body).length ? JSON.stringify(params.body || '') : 'NOT', null, 2) + ' resporse ' + (resporse || '"NOT"'));
    return resporse ? JSON.parse(resporse) : {};
  }
  async connect() {
    if (this.client.options.shard === 'auto') {
      const resp = await this.client.getGatewayBot();
      this.cache.gateway = resp;
      this.client.options.shard = resp.shards;
    }
    else
      this.cache.gateway = await this.client.getGateway();
    this.cache.gateway.url += '?v=8&encoding=json';
    for (let key = 0; key < this.client.options.shard; key++) {
      this.client.handler.say('debug', `Debug: Shard ${key} create`);
      const shard = new EventHandler.default({ client: this.client, id: key });
      this.shards.set(key, shard);
      shard.connect();
    }
  }
}
exports.default = RequestHandler;
