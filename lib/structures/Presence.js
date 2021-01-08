"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const Base_1 = require("../Base");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const ActivityTypes = { 0: 'Game', 1: 'Streaming', 2: 'Listening', 4: 'Custom', 5: 'Competing' };
const ActivityFlags = { 1: 'Instance', 2: 'Join', 4: 'Spectate', 8: 'Join Request', 16: 'Sync', 32: 'Play' };
class Presence extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.user = data.user === undefined ? data.user : new User_1.default({ _client: this._client, ...data.user });
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.status = data.status;
        this.activities = data.activities === undefined ? data.activities : data.activities.map(element => new Activity({ _client: this._client, ...element }));
        this.clientStatus = data.client_status === undefined ? data.client_status : new ClientStatus(data.client_status);
    }
    get server() {
        return this.serverFlake === undefined ? this.serverFlake : this._client.servers.get(this.serverFlake.id);
    }
}
class ClientStatus extends Base_1.default {
    constructor(data) {
        super();
        this.desktop = data.desktop;
        this.mobile = data.mobile;
        this.web = data.web;
    }
}
class Activity extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.name = data.name;
        this.type = data.type;
        this.url = data.url;
        this.createdTime = data.created_at;
        this.timestamps = data.timestamps === undefined ? data.timestamps : new ActivityTimestamps(data.timestamps);
        this.appFlake = data.application_id === undefined ? data.application_id : new Flake_1.default(data.application_id);
        this.details = data.details;
        this.state = data.state;
        this.emoji = data.emoji === undefined || data.emoji === null ? data.emoji : new ActivityEmoji({ _client: this._client, ...data.emoji });
        this.party = data.party === undefined ? data.party : new ActivityParty({ _client: this._client, ...data.party });
        this.assets = data.assets === undefined ? data.assets : new ActivityAssets({ _client: this._client, ...data.assets, appFlake: this.appFlake });
        this.secrets = data.secrets === undefined ? data.secrets : new ActivitySecrets(data.secrets);
        this.isInstance = data.instance;
        this.flags = data.flags;
    }
    get createdDate() {
        return this.createdTime === undefined ? this.createdTime : new Date(this.createdTime);
    }
    get app() {
        return this.appFlake === undefined ? this.appFlake : this._client.apps.get(this.appFlake.id);
    }
    getType() {
        const find = Object.entries(ActivityTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
    getFlags() {
        const find = Object.entries(ActivityFlags).filter(element => Number(element[0]) & Number(this.flags));
        return find.length ? find.map(element => element[1]) : null;
    }
}
exports.Activity = Activity;
class ActivityTimestamps extends Base_1.default {
    get startDate() {
        return this.startTime === undefined ? this.startTime : new Date(this.startTime);
    }
    get endDate() {
        return this.endTime === undefined ? this.endTime : new Date(this.endTime);
    }
    constructor(data) {
        super();
        this.startTime = data.start;
        this.endTime = data.end;
    }
}
class ActivityEmoji extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.name = data.name;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.isAnimated = data.animated;
    }
    get emoji() {
        return this.flake === undefined ? this.flake : this._client.emojis.get(this.flake.id);
    }
    getEmojiURL(params) {
        return this.flake === undefined ? undefined : this._client.getEmojiURL({ ...params, animated: Boolean(this.isAnimated), emojiID: String(this.flake.id) });
    }
}
class ActivityParty extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.size = data.size;
    }
    get app() {
        return this.flake === undefined ? this.flake : this._client.apps.get(this.flake.id);
    }
}
class ActivityAssets extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this._appFlake = data.appFlake;
        this.largeImage = data.large_image;
        this.largeText = data.large_text;
        this.smallImage = data.small_image;
        this.smallText = data.small_text;
    }
    getLargeImageURL(params) {
        return this._appFlake === undefined ? this._appFlake : this.largeImage === undefined ? this.largeImage : this._client.getAppAssetURL({ ...params, assetID: this.largeImage, appID: String(this._appFlake.id) });
    }
    getSmallImageURL(params) {
        return this._appFlake === undefined ? this._appFlake : this.smallImage === undefined ? this.smallImage : this._client.getAppAssetURL({ ...params, size: params.size, assetID: this.smallImage, appID: String(this._appFlake.id) });
    }
}
class ActivitySecrets extends Base_1.default {
    constructor(data) {
        super();
        this.join = data.join;
        this.spectate = data.spectate;
        this.match = data.match;
    }
}
exports.default = Presence;
