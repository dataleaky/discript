"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowedChannel = exports.ChannelTypes = void 0;
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const Permission_1 = require("./Permission");
const User_1 = require("./User");
const ChannelTypes = { 0: 'Server Text', 1: 'DM', 2: 'Server Voice', 3: 'Group DM', 4: 'Server Category', 5: 'Server News', 6: 'Server Store' };
exports.ChannelTypes = ChannelTypes;
class Channel extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.type = data.type;
        this.serverFlake = data.guild_id === undefined ? undefined : new Flake_1.default(data.guild_id);
        this.position = data.position;
        this.permissions = data.permission_overwrites === undefined ? data.permission_overwrites : (() => {
            const collection = new Collection_1.default();
            for (const object of data.permission_overwrites) {
                const subject = new Permission_1.default(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.name = data.name;
        this.topic = data.topic;
        this.isNSFW = data.nsfw;
        this.lastMessageFlake = data.last_message_id === undefined || data.last_message_id === null ? data.last_message_id : new Flake_1.default(data.last_message_id);
        this.bitrate = data.bitrate;
        this.userLimit = data.user_limit;
        this.slowmode = data.rate_limit_per_user;
        this.recipients = data.recipients === undefined ? data.recipients : (() => {
            const collection = new Collection_1.default();
            for (const object of data.recipients) {
                const subject = new User_1.default({ _client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.icon = data.icon;
        this.ownerFlake = data.owner_id === undefined ? data.owner_id : new Flake_1.default(data.owner_id);
        this.appFlake = data.application_id === undefined ? data.application_id : new Flake_1.default(data.application_id);
        this.parentFlake = data.parent_id === undefined || data.parent_id === null ? data.parent_id : new Flake_1.default(data.parent_id);
        this.lastPinTime = data.last_pin_timestamp === undefined || data.last_pin_timestamp === null ? data.last_pin_timestamp : Date.parse(data.last_pin_timestamp);
    }
    get mention() {
        return this.flake === undefined ? this.flake : `<#${this.flake.id}>`;
    }
    get lastPinDate() {
        return this.lastPinTime === undefined || this.lastPinTime === null ? this.lastPinTime : new Date(this.lastPinTime);
    }
    get server() {
        return this.serverFlake === undefined ? this.serverFlake : this._client.servers.get(this.serverFlake.id);
    }
    get lastMessage() {
        return this.lastMessageFlake === undefined || this.lastMessageFlake === null ? this.lastMessageFlake : this._client.messages.get(this.lastMessageFlake.id);
    }
    get owner() {
        return this.ownerFlake === undefined ? this.ownerFlake : this._client.users.get(this.ownerFlake.id);
    }
    get app() {
        return this.appFlake === undefined ? this.appFlake : this._client.apps.get(this.appFlake.id);
    }
    get parent() {
        return this.parentFlake === undefined || this.parentFlake === null ? this.parentFlake : this._client.channels.get(this.parentFlake.id);
    }
    getType() {
        const find = Object.entries(ChannelTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
class FollowedChannel extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.channelFlake = data.channel_id === undefined ? data.channel_id : new Flake_1.default(data.channel_id);
        this.webhookFlake = data.webhook_id === undefined ? data.webhook_id : new Flake_1.default(data.webhook_id);
    }
    get channel() {
        return this.channelFlake === undefined ? this.channelFlake : this._client.channels.get(this.channelFlake.id);
    }
    get webhook() {
        return this.webhookFlake === undefined ? this.webhookFlake : this._client.webhooks.get(this.webhookFlake.id);
    }
}
exports.FollowedChannel = FollowedChannel;
exports.default = Channel;
