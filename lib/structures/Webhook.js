"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const WebhookTypes = { 1: 'Incoming', 2: 'Channel Follower' };
class Webhook extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = new Flake_1.default(data.id);
        this.type = data.type;
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.channelFlake = data.channel_id === undefined ? data.channel_id : new Flake_1.default(data.channel_id);
        this.user = data.user === undefined ? data.user : new User_1.default({ _client: this._client, ...data.user });
        this.name = data.name;
        this.avatar = data.avatar;
        this.token = data.token;
        this.appFlake = data.application_id === undefined || data.application_id === null ? data.application_id : new Flake_1.default(data.application_id);
    }
    get server() {
        return this.serverFlake === undefined ? this.serverFlake : this._client.servers.get(this.serverFlake.id);
    }
    get channel() {
        return this.channelFlake === undefined ? this.channelFlake : this._client.channels.get(this.channelFlake.id);
    }
    get app() {
        return this.appFlake === undefined || this.appFlake === null ? this.appFlake : this._client.apps.get(this.appFlake.id);
    }
    getAvatarURL(params) {
        return this.avatar === undefined || this.avatar === null ? null : this._client.getUserAvatarURL({ ...params, avatar: this.avatar, userID: String(this.flake.id) });
    }
    getType() {
        const find = Object.entries(WebhookTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
exports.default = Webhook;
