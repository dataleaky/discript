"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceState = exports.VoiceRegion = exports.Template = exports.ServerWidgetParams = exports.ServerWidget = exports.ServerPreview = exports.ServerMember = exports.Role = exports.Emoji = exports.Ban = void 0;
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Channel_1 = require("./Channel");
const Flake_1 = require("./Flake");
const Permission_1 = require("./Permission");
const Presence_1 = require("./Presence");
const User_1 = require("./User");
const DefaultMessageNotificationLevels = { 0: 'All Messages', 1: 'Only Mentions', };
const ExplicitContentFilterLevels = { 0: 'Disabled', 1: 'Members Without Roles', 2: 'All Members' };
const MFALevels = { 0: 'None', 1: 'Elevated' };
const VerificationLevels = { 0: 'None', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High', };
const PremiumTiers = { 0: 'None', 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3' };
const SystemChannelFlags = { 1: 'Suppress Join Notifications', 2: 'Suppress Premium Subscriptions' };
class Server extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.iconTemplate = data.icon_hash;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.isOwned = data.owner;
        this.ownerFlake = data.owner_id === undefined ? data.owner_id : new Flake_1.default(data.owner_id);
        this.bitPermission = data.permissions === undefined ? data.permissions : new Permission_1.BitSet(data.permissions);
        this.region = data.region;
        this.afkChannelFlake = data.afk_channel_id === undefined || data.afk_channel_id === null ? data.afk_channel_id : new Flake_1.default(data.afk_channel_id);
        this.afkTimeout = data.afk_timeout;
        this.isWidget = data.widget_enabled;
        this.widgetChannelFlake = data.widget_channel_id === undefined || data.widget_channel_id === null ? data.widget_channel_id : new Flake_1.default(data.widget_channel_id);
        this.verificationLevel = data.verification_level;
        this.messageNotifications = data.default_message_notifications;
        this.explicitFilter = data.explicit_content_filter;
        this.roles = data.roles === undefined ? data.roles : (() => {
            const collection = new Collection_1.default();
            for (const object of data.roles) {
                const subject = new Role({ _client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.emojis = data.emojis === undefined ? data.emojis : (() => {
            const collection = new Collection_1.default();
            for (const object of data.emojis) {
                const subject = new Emoji({ _client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.appFlake = data.application_id === undefined || data.application_id === null ? data.application_id : new Flake_1.default(data.application_id);
        this.systemChannelFlake = data.system_channel_id === undefined || data.system_channel_id === null ? data.system_channel_id : new Flake_1.default(data.system_channel_id);
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelFlake = data.rules_channel_id === undefined || data.rules_channel_id === null ? data.rules_channel_id : new Flake_1.default(data.rules_channel_id);
        this.joinedTime = data.joined_at === undefined ? data.joined_at : Date.parse(data.joined_at);
        this.isLarge = data.large;
        this.isUnavailable = data.unavailable;
        this.memberCount = data.member_count;
        this.voiceStates = data.voice_states === undefined ? data.voice_states : (() => {
            const collection = new Collection_1.default();
            for (const object of data.voice_states) {
                const subject = new VoiceState({ _client: this._client, ...object });
                collection.set(subject.userFlake.id, subject);
            }
            return collection;
        })();
        this.members = data.members === undefined ? data.members : (() => {
            const collection = new Collection_1.default();
            for (const object of data.members) {
                const subject = new ServerMember({ _client: this._client, ...object });
                collection.set(subject.user.flake.id, subject);
            }
            return collection;
        })();
        this.channels = data.channels === undefined ? data.channels : (() => {
            const collection = new Collection_1.default();
            for (const object of data.channels) {
                const subject = new Channel_1.default({ _client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.presences = data.presences === undefined ? data.presences : (() => {
            const collection = new Collection_1.default();
            for (const object of data.presences) {
                const subject = new Presence_1.default({ _client: this._client, ...object });
                collection.set(subject.user.flake.id, subject);
            }
            return collection;
        })();
        this.maxPresences = data.max_presences;
        this.maxMembers = data.max_members;
        this.vanityCode = data.vanity_url_code;
        this.description = data.description;
        this.banner = data.banner;
        this.premiumTier = data.premium_tier;
        this.premiumSubscriptionCount = data.premium_subscription_count;
        this.preferredLocale = data.preferred_locale;
        this.publicUpdatesChannelFlake = data.public_updates_channel_id === undefined || data.public_updates_channel_id === null ? data.public_updates_channel_id : new Flake_1.default(data.public_updates_channel_id);
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.roughMemberCount = data.approximate_member_count;
        this.roughPresenceCount = data.approximate_presence_count;
    }
    get joinedDate() {
        return this.joinedTime === undefined ? this.joinedTime : new Date(this.joinedTime);
    }
    get owner() {
        return this.ownerFlake === undefined ? this.ownerFlake : this._client.users.get(this.ownerFlake.id);
    }
    get afkChannel() {
        return this.afkChannelFlake === undefined || this.afkChannelFlake == null ? this.afkChannelFlake : this._client.channels.get(this.afkChannelFlake.id);
    }
    get widgetChannel() {
        return this.widgetChannelFlake === undefined || this.widgetChannelFlake == null ? this.widgetChannelFlake : this._client.channels.get(this.widgetChannelFlake.id);
    }
    get app() {
        return this.appFlake === undefined || this.appFlake === null ? this.appFlake : this._client.apps.get(this.appFlake.id);
    }
    get systemChannel() {
        return this.systemChannelFlake === undefined || this.systemChannelFlake == null ? this.systemChannelFlake : this._client.channels.get(this.systemChannelFlake.id);
    }
    get rulesChannel() {
        return this.rulesChannelFlake === undefined || this.rulesChannelFlake == null ? this.rulesChannelFlake : this._client.channels.get(this.rulesChannelFlake.id);
    }
    get publicUpdatesChannel() {
        return this.publicUpdatesChannelFlake === undefined || this.publicUpdatesChannelFlake == null ? this.publicUpdatesChannelFlake : this._client.channels.get(this.publicUpdatesChannelFlake.id);
    }
    getDefaultMessageNotifications() {
        const find = Object.entries(DefaultMessageNotificationLevels).find(element => element[0] === String(this.messageNotifications));
        return find ? find[1] : null;
    }
    getExplicitContentFilter() {
        const find = Object.entries(ExplicitContentFilterLevels).find(element => element[0] === String(this.explicitFilter));
        return find ? find[1] : null;
    }
    getMFALevel() {
        const find = Object.entries(MFALevels).find(element => element[0] === String(this.mfaLevel));
        return find ? find[1] : null;
    }
    getVerificationLevel() {
        const find = Object.entries(VerificationLevels).find(element => element[0] === String(this.verificationLevel));
        return find ? find[1] : null;
    }
    getPremiumTier() {
        const find = Object.entries(PremiumTiers).find(element => element[0] === String(this.premiumTier));
        return find ? find[1] : null;
    }
    getSystemChannelFlags() {
        const find = Object.entries(SystemChannelFlags).filter(element => Number(element[0]) & Number(this.systemChannelFlags));
        return find.length ? find.map(element => element[1]) : null;
    }
    getIconURL(params) {
        return this.icon === undefined || this.icon === null ? null : this._client.getServerIconURL({ ...params, icon: this.icon, serverID: String(this.flake.id) });
    }
    getSplashURL(params) {
        return this.splash === undefined || this.splash === null ? null : this._client.getServerSplashURL({ ...params, splash: this.splash, serverID: String(this.flake.id) });
    }
    getDiscoverySplashURL(params) {
        return this.discoverySplash === undefined || this.discoverySplash === null ? null : this._client.getServerDiscoverySplashURL({ ...params, discoverySplash: this.discoverySplash, serverID: String(this.flake.id) });
    }
    getBannerURL(params) {
        return this.banner === undefined || this.banner === null ? null : this._client.getServerBannerURL({ ...params, banner: this.banner, serverID: String(this.flake.id) });
    }
}
class ServerPreview extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.emojis = data.emojis === undefined ? data.emojis : (() => {
            const collection = new Collection_1.default();
            for (const object of data.emojis) {
                const subject = new Emoji({ _client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.features = data.features;
        this.roughMemberCount = data.approximate_member_count;
        this.roughPresenceCount = data.approximate_presence_count;
        this.description = data.description;
    }
    getIconURL(params) {
        return this.icon === undefined || this.icon === null ? null : this._client.getServerIconURL({ ...params, icon: this.icon, serverID: String(this.flake.id) });
    }
    getSplashURL(params) {
        return this.splash === undefined || this.splash === null ? null : this._client.getServerSplashURL({ ...params, splash: this.splash, serverID: String(this.flake.id) });
    }
    getDiscoverySplashURL(params) {
        return this.discoverySplash === undefined || this.discoverySplash === null ? null : this._client.getServerDiscoverySplashURL({ ...params, discoverySplash: this.discoverySplash, serverID: String(this.flake.id) });
    }
}
exports.ServerPreview = ServerPreview;
class Role extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.colorDec = data.color;
        this.isHoist = data.hoist;
        this.position = data.position;
        this.bitPermission = data.permissions === undefined ? data.permissions : new Permission_1.BitSet(data.permissions);
        this.isManaged = data.managed;
        this.isMentionable = data.mentionable;
        this.tags = data.tags === undefined ? data.tags : new RoleTags({ _client: this._client, ...data.tags });
    }
    get mention() {
        return this.flake === undefined ? this.flake : `<@&${this.flake.id}>`;
    }
}
exports.Role = Role;
class RoleTags extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.botFlake = data.bot_id === undefined ? data.bot_id : new Flake_1.default(data.bot_id);
        this.integrationFlake = data.integration_id === undefined ? data.integration_id : new Flake_1.default(data.integration_id);
        this.isPremiumSubscriber = data.premium_subscriber;
    }
    get bot() {
        return this.botFlake === undefined ? this.botFlake : this._client.apps.get(this.botFlake.id);
    }
    get integration() {
        return this.integrationFlake === undefined ? this.integrationFlake : this._client.integration.get(this.integrationFlake.id);
    }
}
class Emoji extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.flake = data.id === undefined || data.id === null ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.rolesFlake = data.roles === undefined ? data.roles : data.roles.map(element => new Flake_1.default(element));
        this.user = data.user === undefined ? data.user : new User_1.default({ _client: this._client, ...data.user });
        this.isWrapped = data.require_colons;
        this.isManaged = data.managed;
        this.isAnimated = data.animated;
        this.isAvailable = data.available;
    }
    get emojiName() {
        return this.name === undefined || this.flake === undefined || this.name === null || this.flake === null ? this.name : `<${this.isAnimated ? 'a' : ''}:${this.name}:${this.flake.id}>`;
    }
    get roles() {
        return this.rolesFlake === undefined ? this.rolesFlake : (() => {
            const collection = new Collection_1.default();
            for (const object of this.rolesFlake) {
                const subject = this._client.roles.get(object.id);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
    }
    getEmojiURL(params) {
        return this.flake === undefined || this.flake === null ? null : this._client.getEmojiURL({ ...params, animated: Boolean(this.isAnimated), emojiID: String(this.flake.id) });
    }
}
exports.Emoji = Emoji;
class ServerMember extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.user = data.user === undefined ? data.user : new User_1.default({ _client: this._client, ...data.user });
        this.nick = data.nick;
        this.joinedTime = data.joined_at === undefined ? data.joined_at : Date.parse(data.joined_at);
        this.rolesFlake = data.roles === undefined ? data.roles : data.roles.map(element => new Flake_1.default(element));
        this.premiumTime = data.premium_since === undefined || data.premium_since === null ? data.premium_since : Date.parse(data.premium_since);
        this.isDeaf = data.deaf;
        this.isMute = data.mute;
        this.isPending = data.pending;
        this.bitPermission = data.permissions === undefined ? data.permissions : new Permission_1.BitSet(data.permissions);
    }
    get mention() {
        return this.user === undefined ? this.user : `<@!${this.user.flake.id}>`;
    }
    get joinedDate() {
        return this.joinedTime === undefined ? this.joinedTime : new Date(this.joinedTime);
    }
    get premiumDate() {
        return this.premiumTime === undefined || this.premiumTime === null ? this.premiumTime : new Date(this.premiumTime);
    }
    get roles() {
        return this.rolesFlake === undefined ? this.rolesFlake : (() => {
            const collection = new Collection_1.default();
            for (const object of this.rolesFlake) {
                const subject = this._client.roles.get(object.id);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
    }
}
exports.ServerMember = ServerMember;
class Ban extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.reason = data.reason;
        this.user = data.user === undefined ? data.user : new User_1.default({ _client: this._client, ...data.user });
    }
}
exports.Ban = Ban;
class VoiceState extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.channelFlake = data.channel_id === undefined || data.channel_id === null ? data.channel_id : new Flake_1.default(data.channel_id);
        this.userFlake = data.user_id === undefined ? data.user_id : new Flake_1.default(data.user_id);
        this.member = data.member === undefined ? data.member : new ServerMember({ _client: this._client, ...data.member });
        this.sessionID = data.session_id;
        this.isDeaf = data.deaf;
        this.isMute = data.mute;
        this.isSelfDeaf = data.self_deaf;
        this.isSelfMute = data.self_mute;
        this.isSelfStream = data.self_stream;
        this.isSelfVideo = data.self_video;
        this.isSuppress = data.suppress;
    }
    get server() {
        return this.serverFlake === undefined ? this.serverFlake : this._client.servers.get(this.serverFlake.id);
    }
    get channel() {
        return this.channelFlake === undefined || this.channelFlake === null ? this.channelFlake : this._client.channels.get(this.channelFlake.id);
    }
    get user() {
        return this.userFlake === undefined ? this.userFlake : this._client.users.get(this.userFlake.id);
    }
}
exports.VoiceState = VoiceState;
class VoiceRegion extends Base_1.default {
    constructor(data) {
        super();
        this.id = data.id;
        this.name = data.name;
        this.isVIP = data.vip;
        this.isOptimal = data.optimal;
        this.isDeprecated = data.deprecated;
        this.isCustom = data.custom;
    }
}
exports.VoiceRegion = VoiceRegion;
class ServerWidget extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.isEnabled = data.enabled;
        this.channelFlake = data.channel_id === undefined || data.channel_id === null ? data.channel_id : new Flake_1.default(data.channel_id);
    }
    get channel() {
        return this.channelFlake === undefined || this.channelFlake === null ? this.channelFlake : this._client.channels.get(this.channelFlake.id);
    }
}
exports.ServerWidget = ServerWidget;
class ServerWidgetParams extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        Object.entries(data).forEach(element => this[element[0]] = element[1]);
    }
}
exports.ServerWidgetParams = ServerWidgetParams;
class Template extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.usageCount = data.usage_count;
        this.creatorFlake = data.creator_id === undefined ? data.creator_id : new Flake_1.default(data.creator_id);
        this.creatorUser = data.creator === undefined ? data.creator : new User_1.default({ _client: this._client, ...data.creator });
        this.createdTime = data.created_at === undefined ? data.created_at : Date.parse(data.created_at);
        this.updatedTime = data.updated_at === undefined ? data.updated_at : Date.parse(data.updated_at);
        this.serverFlake = data.source_guild_id === undefined ? data.source_guild_id : new Flake_1.default(data.source_guild_id);
        this.snapshotServer = data.serialized_source_guild === undefined ? data.serialized_source_guild : new Server({ _client: this._client, ...data.serialized_source_guild });
        this.isDirty = data.is_dirty;
    }
    get createdDate() {
        return this.createdTime === undefined ? this.createdTime : new Date(this.createdTime);
    }
    get updatedDate() {
        return this.updatedTime === undefined ? this.updatedTime : new Date(this.updatedTime);
    }
    get creator() {
        return this.creatorFlake === undefined ? this.creatorFlake : this._client.users.get(this.creatorFlake.id);
    }
    get server() {
        return this.serverFlake === undefined ? this.serverFlake : this._client.servers.get(this.serverFlake.id);
    }
}
exports.Template = Template;
exports.default = Server;
