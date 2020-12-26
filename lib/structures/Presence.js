"use strict";

exports.Activity = void 0;
const Base = require("../Base");
const Flake = require("./Flake");
const User = require("./User");
const ActivityTypes = { 0: 'Game', 1: 'Streaming', 2: 'Listening', 4: 'Custom', 5: 'Competing' };
const ActivityFlags = { 1: 'Instance', 2: 'Join', 4: 'Spectate', 8: 'Join Request', 16: 'Sync', 32: 'Play' };
class Presence extends Base.default {
  constructor(data) {
    super();
    this.client = data.client;
    this.user = data.user === undefined ? data.user : new User.default({ client: this.client, ...data.user });
    this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake.default(data.guild_id);
    this.status = data.status;
    this.activities = data.activities === undefined ? data.activities : data.activities.map(element => new Activity({ client: this.client, ...element }));
    this.clientStatus = data.client_status === undefined ? data.client_status : new ClientStatus(data.client_status);
  }
}
class ClientStatus extends Base.default {
  constructor(data) {
    super();
    if (data.desktop)
      this.desktop = data.desktop;
    if (data.mobile)
      this.mobile = data.mobile;
    if (data.web)
      this.web = data.web;
  }
}
class Activity extends Base.default {
  constructor(data) {
    super();
    this.client = data.client;
    this.name = data.name;
    this.type = data.type;
    this.url = data.url;
    this.createdTime = data.created_at;
    this.timestamps = data.timestamps === undefined ? data.timestamps : new ActivityTimestamps(data.timestamps);
    this.appFlake = data.application_id === undefined ? data.application_id : new Flake.default(data.application_id);
    this.details = data.details;
    this.state = data.state;
    this.emoji = data.emoji === undefined || data.emoji === null ? data.emoji : new ActivityEmoji({ client: this.client, ...data.emoji });
    this.party = data.party === undefined ? data.party : new ActivityParty(data.party);
    this.assets = data.assets === undefined ? data.assets : new ActivityAssets({ client: this.client, ...data.assets, appFlake: this.appFlake });
    this.secrets = data.secrets === undefined ? data.secrets : new ActivitySecrets(data.secrets);
    this.isInstance = data.instance;
    this.flags = data.flags;
  }
  get createdDate() {
    return new Date(this.createdTime);
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
class ActivityTimestamps extends Base.default {
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
class ActivityEmoji extends Base.default {
  constructor(data) {
    super();
    this.client = data.client;
    this.name = data.name;
    this.flake = data.id === undefined ? data.id : new Flake.default(data.id);
    this.isAnimated = data.animated;
  }
  getEmojiURL(params) {
    return this.flake === undefined ? undefined : this.client.getCustomEmojiURL({ size: params.size, animated: Boolean(this.isAnimated), id: String(this.flake.id) });
  }
}
class ActivityParty extends Base.default {
  constructor(data) {
    super();
    this.flake = data.id === undefined ? data.id : new Flake.default(data.id);
    this.size = data.size;
  }
}
class ActivityAssets extends Base.default {
  constructor(data) {
    super();
    this.client = data.client;
    this.largeImage = data.large_image;
    this.largeText = data.large_text;
    this.smallImage = data.small_image;
    this.smallText = data.small_text;
  }
  getLargeImageURL(params) {
    return this.appFlake === undefined ? this.appFlake : this.largeImage === undefined ? this.largeImage : this.client.getApplicationAssetURL({ format: params.format, size: params.size, id: this.largeImage, appID: String(this.appFlake.id) });
  }
  getSmallImageURL(params) {
    return this.appFlake === undefined ? this.appFlake : this.smallImage === undefined ? this.smallImage : this.client.getApplicationAssetURL({ format: params.format, size: params.size, id: this.smallImage, appID: String(this.appFlake.id) });
  }
}
class ActivitySecrets extends Base.default {
  constructor(data) {
    super();
    this.join = data.join;
    this.spectate = data.spectate;
    this.match = data.match;
  }
}
exports.default = Presence;
