"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ban = exports.VoiceRegion = exports.Role = exports.Template = exports.ServerWidget = exports.Emoji = exports.ServerMember = exports.ServerPreview = void 0;
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
        this.client = data.client;
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
        this.afkChannelFlake = data.afk_channel_id === null ? data.afk_channel_id : new Flake_1.default(data.afk_channel_id);
        this.afkTimeout = data.afk_timeout;
        this.isWidget = data.widget_enabled;
        this.widgetChannelFlake = data.widget_channel_id === undefined || data.widget_channel_id === null ? data.widget_channel_id : new Flake_1.default(data.widget_channel_id);
        this.verificationLevel = data.verification_level;
        this.defaultNotifications = data.default_message_notifications;
        this.explicitFilter = data.explicit_content_filter;
        this.roles = (() => {
            const collection = new Collection_1.default();
            for (const object of data.roles) {
                const subject = new Role(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.emojis = (() => {
            const collection = new Collection_1.default();
            for (const object of data.emojis) {
                const subject = new Emoji({ client: this.client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.features = data.features;
        this.mfaLevel = data.mfa_level;
        this.applicationFlake = data.application_id === null ? data.application_id : new Flake_1.default(data.application_id);
        this.systemChannelFlake = data.system_channel_id === null ? data.system_channel_id : new Flake_1.default(data.system_channel_id);
        this.systemChannelFlags = data.system_channel_flags;
        this.rulesChannelFlake = data.rules_channel_id === null ? data.rules_channel_id : new Flake_1.default(data.rules_channel_id);
        this.joinedTime = data.joined_at === undefined ? data.joined_at : Date.parse(data.joined_at);
        this.isLarge = data.large;
        this.isUnavailable = data.unavailable;
        this.memberCount = data.member_count;
        this.voiceStates = data.voice_states === undefined ? data.voice_states : (() => {
            const collection = new Collection_1.default();
            for (const object of data.voice_states) {
                const subject = new VoiceState({ client: this.client, ...object });
                collection.set(subject.userFlake.id, subject);
            }
            return collection;
        })();
        this.members = data.members === undefined ? data.members : (() => {
            const collection = new Collection_1.default();
            for (const object of data.members) {
                const subject = new ServerMember({ client: this.client, ...object });
                collection.set(subject.user.flake.id, subject);
            }
            return collection;
        })();
        this.channels = data.channels === undefined ? data.channels : (() => {
            const collection = new Collection_1.default();
            for (const object of data.channels) {
                const subject = new Channel_1.default({ client: this.client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.presences = data.presences === undefined ? data.presences : (() => {
            const collection = new Collection_1.default();
            for (const object of data.presences) {
                const subject = new Presence_1.default({ client: this.client, ...object });
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
        this.publicUpdatesChannelFlake = data.public_updates_channel_id === null ? data.public_updates_channel_id : new Flake_1.default(data.public_updates_channel_id);
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.roughMemberCount = data.approximate_member_count;
        this.roughPresenceCount = data.approximate_presence_count;
    }
    get joinedDate() {
        return this.joinedTime === undefined ? this.joinedTime : new Date(this.joinedTime);
    }
    getDefaultMessageNotifications() {
        const find = Object.entries(DefaultMessageNotificationLevels).find(element => element[0] === String(this.defaultNotifications));
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
        return this.icon === null ? null : this.client.getServerIconURL({ format: params.format, size: params.size, serverIcon: this.icon, serverID: String(this.flake.id) });
    }
    getSplashURL(params) {
        return this.splash === null ? null : this.client.getServerSplashURL({ format: params.format, size: params.size, serverSplash: this.splash, serverID: String(this.flake.id) });
    }
    getDiscoverySplashURL(params) {
        return this.discoverySplash === null ? null : this.client.getServerDiscoverySplashURL({ format: params.format, size: params.size, serverDiscoverySplash: this.discoverySplash, serverID: String(this.flake.id) });
    }
    getBannerURL(params) {
        return this.banner === null ? null : this.client.getServerBannerURL({ format: params.format, size: params.size, serverBanner: this.banner, serverID: String(this.flake.id) });
    }
}
class ServerPreview extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.emojis = (() => {
            const collection = new Collection_1.default();
            for (const object of data.emojis) {
                const subject = new Emoji({ client: this.client, ...object });
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
        return this.icon === null ? null : this.client.getServerIconURL({ format: params.format, size: params.size, serverIcon: this.icon, serverID: String(this.flake.id) });
    }
    getSplashURL(params) {
        return this.splash === null ? null : this.client.getServerSplashURL({ format: params.format, size: params.size, serverSplash: this.splash, serverID: String(this.flake.id) });
    }
    getDiscoverySplashURL(params) {
        return this.discoverySplash === null ? null : this.client.getServerDiscoverySplashURL({ format: params.format, size: params.size, serverDiscoverySplash: this.discoverySplash, serverID: String(this.flake.id) });
    }
}
exports.ServerPreview = ServerPreview;
class Role extends Base_1.default {
    get mention() {
        return `<@&${this.flake.id}>`;
    }
    constructor(data) {
        super();
        this.flake = new Flake_1.default(data.id);
        this.name = data.name;
        this.colorDec = data.color;
        this.isHoist = data.hoist;
        this.position = data.position;
        this.bitPermission = data.permissions === undefined ? data.permissions : new Permission_1.BitSet(data.permissions);
        this.isManaged = data.managed;
        this.isMentionable = data.mentionable;
        this.tags = data.tags === undefined ? data.tags : new RoleTags(data.tags);
    }
}
exports.Role = Role;
class RoleTags extends Base_1.default {
    constructor(data) {
        super();
        this.botFlake = data.bot_id === undefined ? data.bot_id : new Flake_1.default(data.bot_id);
        this.integrationFlake = data.integration_id === undefined ? data.integration_id : new Flake_1.default(data.integration_id);
        this.isPremiumSubscriber = data.premium_subscriber;
    }
}
class Emoji extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = data.id === null ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.roleFlakes = data.roles === undefined ? data.roles : data.roles.map(element => new Flake_1.default(element));
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this.client, ...data.user });
        this.isWrapped = data.require_colons;
        this.isManaged = data.managed;
        this.isAnimated = data.animated;
        this.isAvailable = data.available;
    }
    get emojiName() {
        return this.name === null || this.flake === null ? this.name : `<${this.isAnimated ? 'a' : ''}:${this.name}:${this.flake.id}>`;
    }
    getEmojiURL(params) {
        return this.flake === null ? null : this.client.getCustomEmojiURL({ size: params.size, animated: Boolean(this.isAnimated), emojiID: String(this.flake.id) });
    }
}
exports.Emoji = Emoji;
class ServerMember extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this.client, ...data.user });
        this.nick = data.nick;
        this.joinedTime = data.joined_at === undefined ? data.joined_at : Date.parse(data.joined_at);
        this.roleFlakes = data.roles === undefined ? data.roles : data.roles.map(element => new Flake_1.default(element));
        this.premiumTime = data.premium_since === undefined || data.premium_since === null ? data.premium_since : Date.parse(data.premium_since);
        this.isDeaf = data.deaf;
        this.isMute = data.mute;
        this.isPending = data.pending;
    }
    get mention() {
        return this.user === undefined ? this.user : `<@!${this.user.flake.id}>`;
    }
    get joinedDate() {
        return new Date(this.joinedTime);
    }
    get premiumDate() {
        return this.premiumTime === undefined || this.premiumTime === null ? this.premiumTime : new Date(this.premiumTime);
    }
}
exports.ServerMember = ServerMember;
class Ban extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.reason = data.reason;
        this.user = new User_1.default({ client: this.client, ...data.user });
    }
}
exports.Ban = Ban;
class VoiceState extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.channelFlake = data.channel_id === undefined || data.channel_id === null ? data.channel_id : new Flake_1.default(data.channel_id);
        this.userFlake = data.user_id === undefined ? data.user_id : new Flake_1.default(data.user_id);
        this.member = data.member === undefined ? data.member : new ServerMember({ client: this.client, ...data.member });
        this.sessionID = data.session_id;
        this.isDeaf = data.deaf;
        this.isMute = data.mute;
        this.isSelfDeaf = data.self_deaf;
        this.isSelfMute = data.self_mute;
        this.isSelfStream = data.self_stream;
        this.isSelfVideo = data.self_video;
        this.isSuppress = data.suppress;
    }
}
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
        this.isEnabled = data.enabled;
        this.channelFlake = data.channel_id === null ? data.channel_id : new Flake_1.default(data.channel_id);
    }
}
exports.ServerWidget = ServerWidget;
class Template extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.code = data.code;
        this.name = data.name;
        this.description = data.description;
        this.usageCount = data.usage_count;
        this.creatorFlake = new Flake_1.default(data.creator_id);
        this.creator = new User_1.default({ client: this.client, ...data.creator });
        this.createdTime = Date.parse(data.created_at);
        this.updatedTime = Date.parse(data.updated_at);
        this.serverFlake = new Flake_1.default(data.source_guild_id);
        this.snapshotServer = new Server({ client: this.client, ...data.serialized_source_guild });
        this.isDirty = data.is_dirty;
    }
    get createdDate() {
        return new Date(this.createdTime);
    }
    get updatedDate() {
        return new Date(this.updatedTime);
    }
}
exports.Template = Template;
exports.default = Server;
