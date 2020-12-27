"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const WebhookTypes = { 1: 'Incoming', 2: 'Channel Follower' };
class Webhook extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.type = data.type;
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.channelFlake = data.channel_id === undefined ? data.channel_id : new Flake_1.default(data.channel_id);
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this.client, ...data.user });
        this.name = data.name;
        this.avatar = data.avatar;
        this.token = data.token;
        this.appFlake = data.application_id === undefined || data.application_id === null ? data.application_id : new Flake_1.default(data.application_id);
    }
    getAvatarURL(params) {
        return this.avatar === undefined || this.avatar === null ? null : this.client.getUserAvatarURL({ format: params.format, size: params.size, avatar: this.avatar, id: String(this.flake.id) });
    }
    getType() {
        const find = Object.entries(WebhookTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
exports.default = Webhook;
