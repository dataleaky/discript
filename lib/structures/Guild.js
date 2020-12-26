"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const DefaultMessageNotificationLevel = { 0: 'All Messages', 1: 'Only Mentions', };
const ExplicitContentFilterLevel = { 0: 'Disabled', 1: 'Members Without Roles', 2: 'All Members' };
const MFALevel = { 0: 'None', 1: 'Elevated' };
const VerificationLevel = { 0: 'None', 1: 'Low', 2: 'Medium', 3: 'High', 4: 'Very High', };
const PremiumTier = { 0: 'None', 1: 'Tier 1', 2: 'Tier 2', 3: 'Tier 3' };
const SystemChannelFlags = { 1: 'Suppress Join Notifications', 2: 'Suppress Premium Subscriptions' };
class Guild extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.iconTemplate = data.icon_hash;
        this.splash = data.splash;
        this.discoverySplash = data.discovery_splash;
        this.isOwned = data.owner;
        this.ownerFlake = new Flake_1.default(data.owner_id);
        this.permissions = data.permissions;
        this.region = data.region;
        this.afkChannelFlake = data.afk_channel_id === null ? data.afk_channel_id : new Flake_1.default(data.afk_channel_id);
        this.afkTimeout = data.afk_timeout;
        this.isWidgetEnabled = data.widget_enabled;
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
                const subject = new VoiceState({ client: this.client, data: object });
                collection.set(subject.userFlake.id, subject);
            }
            return collection;
        })();
        this.members = data.members === undefined ? data.members : (() => {
            const collection = new Collection_1.default();
            for (const object of data.members) {
                const subject = new GuildMember({ client: this.client, data: object });
                if (subject.user !== undefined)
                    collection.set(subject.user.flake.id, subject);
            }
            return collection;
        })();
        this.channels = data.channels === undefined ? data.channels : (() => {
            const collection = new Collection_1.default();
            for (const object of data.channels) {
                const subject = new Channel({ client: this.client, data: object });
                if (subject.flake !== undefined)
                    collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.presences = data.presences === undefined ? data.presences : (() => {
            const collection = new Collection_1.default();
            for (const object of data.presences) {
                const subject = new Presence({ client: this.client, data: object });
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
        if (data.public_updates_channel_id !== undefined) {
            if (data.public_updates_channel_id === null)
                this.publicUpdatesChannelFlake = null;
            else
                this.publicUpdatesChannelFlake = new Flake_1.default(data.public_updates_channel_id);
        }
        this.maxVideoChannelUsers = data.max_video_channel_users;
        this.roughMemberCount = data.approximate_member_count;
        this.roughPresenceCount = data.approximate_presence_count;
    }
    get joinedDate() {
        return this.joinedTime === undefined ? this.joinedTime : new Date(this.joinedTime);
    }
    getDefaultMessageNotifications() {
        const find = Object.entries(DefaultMessageNotificationLevel).find(element => element[0] === String(this.defaultNotifications));
        if (find)
            return find[1];
        return null;
    }
    getExplicitContentFilter() {
        const find = Object.entries(ExplicitContentFilterLevel).find(element => element[0] === String(this.explicitFilter));
        if (find)
            return find[1];
        return null;
    }
    getMFALevel() {
        const find = Object.entries(MFALevel).find(element => element[0] === String(this.mfaLevel));
        if (find)
            return find[1];
        return null;
    }
    getVerificationLevel() {
        const find = Object.entries(VerificationLevel).find(element => element[0] === String(this.verificationLevel));
        if (find)
            return find[1];
        return null;
    }
    getPremiumTier() {
        const find = Object.entries(PremiumTier).find(element => element[0] === String(this.premiumTier));
        if (find)
            return find[1];
        return null;
    }
    getSystemChannelFlags() {
        const find = Object.entries(SystemChannelFlags).filter(element => Number(element[0]) & Number(this.systemChannelFlags));
        if (find.length)
            return find.map(element => element[1]);
        return null;
    }
    getIconURL(params) {
        return this.icon === null ? null : this.client.getGuildIconURL({ format: params.format, size: params.size, guildIcon: this.icon, guildID: String(this.flake.id) });
    }
    getSplashURL(params) {
        return this.splash === null ? null : this.client.getGuildSplashURL({ format: params.format, size: params.size, guildSplash: this.splash, guildID: String(this.flake.id) });
    }
    getDiscoverySplashURL(params) {
        return this.discoverySplash === null ? null : this.client.getGuildDiscoverySplashURL({ format: params.format, size: params.size, guildDiscoverySplash: this.discoverySplash, guildID: String(this.flake.id) });
    }
    getBannerURL(params) {
        return this.banner === null ? null : this.client.getGuildBannerURL({ format: params.format, size: params.size, guildBanner: this.banner, guildID: String(this.flake.id) });
    }
}
class Role extends Base_1.default {
    get mention() {
        return `<@&${this.flake.id}>`;
    }
    constructor(data) {
        super();
        this.flake = new Flake_1.default(data.id);
        this.name = data.name;
        this.colorDec = `#${data.color.toString(16)}`;
        this.isHoist = data.hoist;
        this.position = data.position;
        this.permissions = data.permissions;
        this.isManaged = data.managed;
        this.isMentionable = data.mentionable;
        this.tags = data.tags === undefined ? data.tags : new RoleTags(data.tags);
    }
}
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
        this.roles = data.roles === undefined ? data.roles : data.roles.map(element => new Flake_1.default(element));
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this.client, ...data.user });
        this.isWrapped = data.require_colons;
        this.isManaged = data.managed;
        this.isAnimated = data.animated;
        this.isAvailable = data.available;
    }
    get emojiName() {
        if (this.name === undefined)
            return undefined;
        if (this.flake === undefined || this.flake === null)
            return this.name;
        else if (this.isAnimated === undefined || !this.isAnimated)
            return `<:${this.name}:${this.flake.id}>`;
        else
            return `<a:${this.name}:${this.flake.id}>`;
    }
    getEmojiURL(params) {
        return this.flake === null ? null : this.client.getCustomEmojiURL({ size: params.size, animated: Boolean(this.isAnimated), emojiID: String(this.flake.id) });
    }
}
exports.default = Guild;
