"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Application_1 = require("../structures/Application");
const AuditLog_1 = require("../structures/AuditLog");
const Channel_1 = require("../structures/Channel");
const Integration_1 = require("../structures/Integration");
const Invite_1 = require("../structures/Invite");
const Message_1 = require("../structures/Message");
const Server_1 = require("../structures/Server");
const User_1 = require("../structures/User");
const Webhook_1 = require("../structures/Webhook");
const RequestHandler_1 = require("./RequestHandler");
const pack = { name: 'discript', version: '1.0.0', homepage: 'https://github.com/dataleaky/discript' };
class Client extends Base_1.default {
    constructor(options) {
        super();
        this.options = {
            token: options.token,
            properties: options.properties === undefined ? {
                $os: process.platform,
                $browser: pack.name,
                $device: pack.name
            } : options.properties,
            isCompress: options.isCompress,
            largeThreshold: options.largeThreshold,
            shard: options.shard === undefined ? 'auto' : options.shard,
            presence: options.presence,
            isServerSubscriptions: options.isServerSubscriptions,
            intents: options.intents === undefined ? 513 : options.intents,
            defaultImageSize: options.defaultImageSize === undefined ? 1024 : options.defaultImageSize,
            defaultImageFormat: options.defaultImageFormat === undefined ? 'webp' : options.defaultImageFormat,
            defaultURLs: options.defaultURLs === undefined ? {
                base: 'https://discord.com/api',
                cdn: 'https://cdn.discordapp.com',
                invite: 'https://discord.gg',
                template: 'https://discord.com/template'
            } : options.defaultURLs,
            defaultEndpoints: options.defaultEndpoints === undefined ? {
                CDNCustomEmoji: (id, format) => `${this.options.defaultURLs.cdn}/emojis/${id}.${format}`,
                CDNServerIcon: (id, icon, format) => `${this.options.defaultURLs.cdn}/icons/${id}/${icon}.${format}`,
                CDNServerSplash: (id, splash, format) => `${this.options.defaultURLs.cdn}/splashes/${id}/${splash}.${format}`,
                CDNServerDiscoverySplash: (id, discoverySplash, format) => `${this.options.defaultURLs.cdn}/discovery-splashes/${id}/${discoverySplash}.${format}`,
                CDNServerBanner: (id, banner, format) => `${this.options.defaultURLs.cdn}/banners/${id}/${banner}.${format}`,
                CDNUserAvatarDefault: (tag) => `${this.options.defaultURLs.cdn}/embed/avatars/${tag}.png`,
                CDNUserAvatar: (id, avatar, format) => `${this.options.defaultURLs.cdn}/avatars/${id}/${avatar}.${format}`,
                CDNApplicationIcon: (appID, icon, format) => `${this.options.defaultURLs.cdn}/app-icons/${appID}/${icon}.${format}`,
                CDNApplicationAsset: (appID, id, format) => `${this.options.defaultURLs.cdn}/app-assets/${appID}/${id}.${format}`,
                CDNAchievementIcon: (appID, id, icon, format) => `${this.options.defaultURLs.cdn}/	app-assets/${appID}/achievements/${id}/icons/${icon}.${format}`,
                CDNTeamIcon: (id, icon, format) => `${this.options.defaultURLs.cdn}/team-icons/${id}/${icon}.${format}`,
                Gateway: () => `${this.options.defaultURLs.base}/gateway`,
                GatewayBot: () => `${this.options.defaultURLs.base}/gateway/bot`,
                GuildAuditLog: (serverID) => `${this.options.defaultURLs.base}/guilds/${serverID}/audit-logs`
            } : options.defaultEndpoints,
            userAgent: options.userAgent === undefined ? `DiscordBot (${pack.homepage}, ${pack.version})` : options.userAgent,
            isDisableStrict: options.isDisableStrict === undefined ? false : options.isDisableStrict
        };
        if (this.options.shard === 'auto' && !this.options.token.startsWith('Bot ') && !this.options.isDisableStrict)
            this.options.token = `Bot ${this.options.token}`;
        this.handler = new RequestHandler_1.default(this);
        this.servers = new Collection_1.default();
        this.channels = new Collection_1.default();
        this.user = User_1.default.prototype;
        this.startTime = 0;
        this.ping = Infinity;
    }
    ;
    getCustomEmojiURL(params) {
        return this.options.defaultEndpoints.CDNCustomEmoji(params.id, params.animated ? 'gif' : 'png') + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getServerIconURL(params) {
        return this.options.defaultEndpoints.CDNServerIcon(params.id, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' && !params.icon.startsWith('a_') ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getServerSplashURL(params) {
        return this.options.defaultEndpoints.CDNServerSplash(params.id, params.splash, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getServerDiscoverySplashURL(params) {
        return this.options.defaultEndpoints.CDNServerDiscoverySplash(params.id, params.discoverySplash, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getServerBannerURL(params) {
        return this.options.defaultEndpoints.CDNServerBanner(params.id, params.banner, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getUserAvatarDefaultURL(params) {
        return this.options.defaultEndpoints.CDNUserAvatarDefault(params.tag);
    }
    ;
    getUserAvatarURL(params) {
        return this.options.defaultEndpoints.CDNUserAvatar(params.id, params.avatar, params.format === undefined || params.format === 'auto' || params.format === 'gif' && !params.avatar.startsWith('a_') ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getApplicationIconURL(params) {
        return this.options.defaultEndpoints.CDNApplicationIcon(params.appID, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getApplicationAssetURL(params) {
        return this.options.defaultEndpoints.CDNApplicationAsset(params.appID, params.id, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getAchievementIconURL(params) {
        return this.options.defaultEndpoints.CDNAchievementIcon(params.appID, params.id, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    getTeamIconURL(params) {
        return this.options.defaultEndpoints.CDNTeamIcon(params.id, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    ;
    async getGateway() {
        return this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Gateway() });
    }
    ;
    async getGatewayBot() {
        return this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.GatewayBot() });
    }
    ;
    async getApplicationInformation(options) {
        return new Application_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/oauth2/applications/${options.userID === undefined ? '@me' : options.userID}` }) });
    }
    ;
    async getAuditLog(params) {
        return new AuditLog_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.GuildAuditLog(params.serverID), body: { user_id: params.userID, action_type: params.actionType, before: params.before, limit: params.limit } }) });
    }
    ;
    async getChannel(params) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${params.channelID}` }) });
    }
    ;
    async updateChannel(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/channels/${options.channelID}`, body: { name: options.options.name, type: options.options.type, position: options.options.position, topic: options.options.topic, nsfw: options.options.nsfw, rate_limit_per_user: options.options.rateLimitPerUser, bitrate: options.options.bitrate, user_limit: options.options.userLimit, permission_overwrites: options.options.permissionOverwrites, parent_id: options.options.parentID, reason: options.reason } }) });
    }
    ;
    async deleteServerChannel(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/channels/${options.channelID}`, body: { reason: options.reason } }) });
    }
    ;
    async closeDMChannel(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/channels/${options.channelID}` }) });
    }
    ;
    async getMessages(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages`, body: { around: options.options.around, before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getMessage(options) {
        return new Message_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}` }) });
    }
    ;
    async createMessage(options) {
        return new Message_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages`, body: { content: options.options.content, nonce: options.options.nonce, tts: options.options.tts, embed: options.options.embed, payload_JSON: options.options.payloadJSON, allowed_mentions: options.options.allowedMentions }, file: options.options.file }) });
    }
    ;
    async crosspostMessage(options) {
        return new Message_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/crosspost` }) });
    }
    ;
    async createReaction(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}/${options.userID === undefined ? '@me' : options.userID}` });
    }
    ;
    async deleteReaction(options) {
        this.handler.request({ method: 'DELETE', url: options.all ? options.emoji === undefined ? `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/reactions` : `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/crosspost` : `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}/${options.userID === undefined ? '@me' : options.userID}` });
    }
    ;
    async getReactions(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}`, body: { before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new User_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async updateMessage(options) {
        return new Message_1.default({ client: this, ...await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}`, body: { content: options.options.content, embed: options.options.embed, flags: options.options.flags } }) });
    }
    ;
    async deleteMessage(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async deleteBulkMessages(options) {
        this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/messages/bulk-delete`, body: { messages: options.options.messages, reason: options.reason } });
    }
    ;
    async updateChannelPermissions(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/permissions/${options.overwriteID}`, body: { allow: options.options.allow, deny: options.options.deny, type: options.options.type, reason: options.reason } });
    }
    ;
    async getChannelInvites(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/invites` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Invite_1.InviteMetadata({ client: this, ...object });
            collection.set(subject.code, subject);
        }
        ;
        return collection;
    }
    ;
    async createChannelInvite(options) {
        return new Invite_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/invites`, body: { max_age: options.options.maxAge, max_uses: options.options.maxUses, temporary: options.options.temporary, unique: options.options.unique, target_user: options.options.targetUser, target_user_type: options.options.targetUserType, reason: options.reason } }) });
    }
    ;
    async deleteChannelPermission(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/permissions/${options.overwriteID}`, body: { reason: options.reason } });
    }
    ;
    async followNewsChannel(options) {
        return new Channel_1.FollowedChannel(await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/followers`, body: { webhook_channel_id: options.options.webhookChannelID } }));
    }
    ;
    async triggerTypingIndicator(options) {
        this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/typing` });
    }
    ;
    async getPinnedMessages(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/pins` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createPinnedChannelMessage(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/pins/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async deletePinnedChannelMessage(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/pins/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async createGroupDMRecipient(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/recipients/${options.userID}`, body: { access_token: options.options.accessToken, nick: options.options.nick } });
    }
    ;
    async deleteGroupDMRecipient(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/recipients/${options.userID}` });
    }
    ;
    async getServerEmojis(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.serverID}/emojis` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Emoji({ client: this, ...object });
            if (subject.flake !== undefined && subject.flake !== null)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getServerEmoji(options) {
        return new Server_1.Emoji({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/emojis/${options.emojiID}` }) });
    }
    ;
    async createServerEmoji(options) {
        return new Server_1.Emoji({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/emojis`, body: { name: options.options.name, image: options.options.image, roles: options.options.roles, reason: options.reason } }) });
    }
    ;
    async updateServerEmoji(options) {
        return new Server_1.Emoji({ client: this, ...await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/emojis/${options.emojiID}`, body: { name: options.options.name, image: options.options.image, reason: options.reason } }) });
    }
    ;
    async deleteServerEmoji(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/emojis/${options.emojiID}`, body: { reason: options.reason } });
    }
    ;
    async createServer(options) {
        return new Server_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds`, body: { name: options.options.name, region: options.options.region, icon: options.options.icon, verification_level: options.options.verificationLevel, default_message_notifications: options.options.defaultMessageNotifications, explicit_content_filter: options.options.explicitContentFilter, roles: options.options.roles, channels: options.options.channels, afk_channel_id: options.options.afkChannelID, afk_timeout: options.options.afkTimeout, system_channel_id: options.options.systemChannelID } }) });
    }
    ;
    async getServer(options) {
        return new Server_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}`, body: { with_counts: options.options.withCounts } }) });
    }
    ;
    async getServerPreview(options) {
        return new Server_1.ServerPreview({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/preview` }) });
    }
    ;
    async updateServer(options) {
        return new Server_1.default({ client: this, ...await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}`, body: { name: options.options.name, region: options.options.region, verification_level: options.options.verificationLevel, default_message_notifications: options.options.defaultMessageNotifications, explicit_content_filter: options.options.explicitContentFilter, afk_channel_id: options.options.afkChannelID, afk_timeout: options.options.afkTimeout, icon: options.options.icon, owner_id: options.options.ownerID, splash: options.options.splash, banner: options.options.banner, system_channel_id: options.options.systemChannelID, rules_channel_id: options.options.rulesChannelID, public_updates_channel_id: options.options.publicUpdatesChannelID, preferred_locale: options.options.preferredLocale, reason: options.reason } }) });
    }
    ;
    async deleteServer(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}` });
    }
    ;
    async getServerChannels(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/channels` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ client: this, ...object });
            if (subject.flake !== undefined)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createServerChannel(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/channels`, body: { name: options.options.name, type: options.options.type, topic: options.options.topic, bitrate: options.options.bitrate, user_limit: options.options.userLimit, rate_limit_per_user: options.options.rateLimitPerUser, position: options.options.position, permission_overwrites: options.options.permissionOverwrites, parent_id: options.options.parentID, nsfw: options.options.nsfw, reason: options.reason } }) });
    }
    ;
    async updateServerChannelPositions(options) {
        this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/channels`, body: { id: options.options.id, position: options.options.position } });
    }
    ;
    async getServerMember(options) {
        return new Server_1.ServerMember({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}` }) });
    }
    ;
    async getServerMembers(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members`, body: { after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.ServerMember({ client: this, ...object });
            if (subject.user !== undefined)
                collection.set(subject.user.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createServerMember(options) {
        return new Server_1.ServerMember({ client: this, ...await this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}`, body: { access_token: options.options.accessToken, nick: options.options.nick, roles: options.options.roles, mute: options.options.mute, deaf: options.options.deaf } }) });
    }
    ;
    async updateServerMember(options) {
        this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}`, body: { nick: options.options.nick, roles: options.options.roles, mute: options.options.mute, deaf: options.options.deaf, channel_id: options.options.channelID, reason: options.reason } });
    }
    ;
    async updateUserNick(options) {
        this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID === undefined ? '@me' : options.userID}/nick`, body: { nick: options.options.nick } });
    }
    ;
    async createServerMemberRole(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async deleteServerMemberRole(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async deleteServerMember(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/members/${options.userID}`, body: { reason: options.reason } });
    }
    ;
    async getServerBans(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/bans` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Ban({ client: this, ...object });
            collection.set(subject.user.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getServerBan(options) {
        return new Server_1.Ban({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/bans/${options.userID}` }) });
    }
    ;
    async createServerBan(options) {
        this.handler.request({ method: 'PUT', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/bans/${options.userID}`, body: { delete_message_days: options.options.deleteMessageDays, reason: options.options.reason } });
    }
    ;
    async deleteServerBan(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/bans/${options.userID}`, body: { reason: options.reason } });
    }
    ;
    async getServerRoles(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/roles` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Role(object);
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createServerRole(options) {
        return new Server_1.Role(await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/roles`, body: { name: options.options.name, permissions: options.options.permissions, color: options.options.color, hoist: options.options.hoist, mentionable: options.options.mentionable, reason: options.reason } }));
    }
    ;
    async updateServerRolePositions(options) {
        const data = await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/roles`, body: { id: options.options.id, position: options.options.position } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Role(object);
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async updateServerRole(options) {
        return new Server_1.Role(await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/roles/${options.roleID}`, body: { name: options.options.name, permissions: options.options.permissions, color: options.options.color, hoist: options.options.hoist, mentionable: options.options.mentionable, reason: options.reason } }));
    }
    ;
    async deleteServerRole(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async getServerPruneCount(options) {
        this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/prune`, body: { days: options.options.days, include_roles: options.options.includeRoles } });
    }
    ;
    async beginServerPrune(options) {
        this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/prune`, body: { days: options.options.days, compute_prune_count: options.options.computePruneCount, include_roles: options.options.includeRoles, reason: options.reason } });
    }
    ;
    async getServerVoiceRegions(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/regions` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion(object);
            collection.set(subject.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getServerInvites(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/invites` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Invite_1.InviteMetadata({ client: this, ...object });
            collection.set(subject.code, subject);
        }
        ;
        return collection;
    }
    ;
    async getServerIntegrations(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/integrations`, body: { include_applications: options.options.includeApplications } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createServerIntegration(options) {
        this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/integrations`, body: { type: options.options.type, id: options.options.id, reason: options.reason } });
    }
    ;
    async updateServerIntegration(options) {
        this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/integrations/${options.integrationID}`, body: { expire_behavior: options.options.expireBehavior, expire_grace_period: options.options.expireGracePeriod, enable_emoticons: options.options.enableEmoticons, reason: options.reason } });
    }
    ;
    async deleteServerIntegration(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/integrations/${options.integrationID}`, body: { reason: options.reason } });
    }
    ;
    async syncServerIntegration(options) {
        this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/integrations/${options.integrationID}/sync` });
    }
    ;
    async getServerWidgetSettings(options) {
        return new Server_1.ServerWidget(await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/widget` }));
    }
    ;
    async updateServerWidget(options) {
        return new Server_1.ServerWidget(await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/widget`, body: options }));
    }
    ;
    async getServerWidget(options) {
        this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/widget.json` });
    }
    ;
    async getServerVanityURL(options) {
        return new Invite_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/vanity-url` }) });
    }
    ;
    async getServerWidgetImage(options) {
        return await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guilds/${options.guildID}/widget.png`, body: { style: options.options.style } });
    }
    ;
    async getInvite(options) {
        return new Invite_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/invites/${options.inviteCode}`, body: { with_counts: options.options.withCounts } }) });
    }
    ;
    async deleteInvite(options) {
        return new Invite_1.default({ client: this, ...await this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/invites/${options.inviteCode}`, body: { reason: options.reason } }) });
    }
    ;
    async getTemplate(options) {
        return new Server_1.Template({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}guilds/templates/${options.templateCode}` }) });
    }
    ;
    async createServerFromTemplate(options) {
        return new Server_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}guilds/templates/${options.templateCode}`, body: { name: options.options.name, icon: options.options.icon } }) });
    }
    ;
    async getVoiceRegions() {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/voice/regions` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion(object);
            collection.set(subject.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getUser(options) {
        return new User_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}` }) });
    }
    ;
    async updateUser(options) {
        return new User_1.default({ client: this, ...await this.handler.request({ method: 'PATCH', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}`, body: { username: options.options.username, avatar: options.options.avatar } }) });
    }
    ;
    async getServers(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/guilds`, body: { before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async leaveServer(options) {
        this.handler.request({ method: 'DELETE', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/guilds/${options.guildID}` });
    }
    ;
    async getDMs(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/channels` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ client: this, ...object });
            if (subject.flake !== undefined)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createDM(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/channels`, body: { recipient_id: options.options.recipientID } }) });
    }
    ;
    async createGroupDM(options) {
        return new Channel_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/channels`, body: { access_tokens: options.options.accessTokens, nicks: options.options.nicks } }) });
    }
    ;
    async getConnections(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/users/${options.userID === undefined ? '@me' : options.userID}/connections` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration_1.Connection({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createChannelWebhook(options) {
        return new Webhook_1.default({ client: this, ...await this.handler.request({ method: 'POST', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/webhooks`, body: { name: options.options.name, avatar: options.options.avatar, reason: options.reason } }) });
    }
    ;
    async getChannelWebhooks(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/channels/${options.channelID}/webhooks` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getServerWebhooks(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.options.defaultURLs.base}/guild/${options.serverID}/webhooks` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getWebhook(options) {
        return new Webhook_1.default({ client: this, ...await this.handler.request({ method: 'GET', url: (options.webhookToken === undefined ? `${this.options.defaultURLs.base}/webhooks/${options.webhookID}` : `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}`) }) });
    }
    ;
    async updateWebhook(options) {
        return new Webhook_1.default({ client: this, ...await this.handler.request({ method: 'PATCH', url: (options.webhookToken === undefined ? `${this.options.defaultURLs.base}/webhooks/${options.webhookID}` : `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { name: options.options.name, avatar: options.options.avatar, channel_id: options.options.channelID, reason: options.reason } }) });
    }
    ;
    async deleteWebhook(options) {
        this.handler.request({ method: 'DELETE', url: (options.webhookToken === undefined ? `${this.options.defaultURLs.base}/webhooks/${options.webhookID}` : `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { reason: options.reason } });
    }
    ;
    async executeWebhook(options) {
        this.handler.request({ method: 'POST', url: (options.slack ? `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}/slack` : options.github ? `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}/github` : `${this.options.defaultURLs.base}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { content: options.options.content, username: options.options.username, avatar_url: options.options.avatarURL, tts: options.options.tts, embeds: options.options.embeds, payload_JSON: options.options.payloadJSON, allowed_mentions: options.options.allowedMentions, wait: options.options.wait }, file: options.options.file });
    }
    ;
}
;
exports.default = Client;
