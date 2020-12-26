"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pack = void 0;
const fs_1 = require("fs");
const Base_1 = require("../Base");
require("./EventHandler");
require("../structures/Flake");
const Types = require("../Types");
const Collection_1 = require("../Collection");
const RequestHandler_1 = require("./RequestHandler");
const Webhook_1 = require("../structures/Webhook");
const Integration_1 = require("../structures/Integration");
const Channel_1 = require("../structures/Channel");
const Server_1 = require("../structures/Server");
const User_1 = require("../structures/User");
const Invite_1 = require("../structures/Invite");
exports.pack = JSON.parse(fs_1.readFileSync('./package.json', { encoding: 'utf8' }));
;
class Client extends Base_1.default {
    constructor(options) {
        super();
        this.options = {
            shards: options.shards || 'auto',
            token: options.token,
            presence: options.presence || null,
            intends: options.intends || 513,
            defaultImageSize: options.defaultImageSize || 1024,
            defaultImageFormat: options.defaultImageFormat || 'webp'
        };
        if (this.options.shards === 'auto' && !this.options.token.startsWith('Bot '))
            this.options.token = `Bot ${this.options.token}`;
        this.handler = new RequestHandler_1.RequestHandler(this);
        this.shards = new Collection_1.default();
        this.starttime = 0;
        this.ping = 0;
    }
    ;
    getCustomEmojiURL(options) {
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/emojis/${options.emojiID}.${options.animated ? 'gif' : 'png'}?size=${options.size}`;
    }
    ;
    getServerIconURL(options) {
        if (options.format === undefined || options.format === 'gif' && !options.serverIcon.startsWith('a_'))
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/icons/${options.serverID}/${options.serverIcon}.${options.format}?size=${options.size}`;
    }
    ;
    getServerSplashURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/splashes/${options.serverID}/${options.serverSplash}.${options.format}?size=${options.size}`;
    }
    ;
    getServerDiscoverySplashURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/discovery-splashes/${options.serverID}/${options.guildDiscoverySplash}.${options.format}?size=${options.size}`;
    }
    ;
    getServerBannerURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/banners/${options.serverID}/${options.serverBanner}.${options.format}?size=${options.size}`;
    }
    ;
    getDefaultUserAvatarURL(options) {
        return `${Types.Constants.URLs.CDN}/embed/avatars/${Number(options.userDiscriminator) % 5}.png`;
    }
    ;
    getUserAvatarURL(options) {
        if (options.format === undefined || options.format === 'gif' && !options.avatar.startsWith('a_'))
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/avatars/${options.id}/${options.avatar}.${options.format}?size=${options.size}`;
    }
    ;
    getApplicationIconURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/avatars/${options.applicationID}/${options.icon}.${options.format}?size=${options.size}`;
    }
    ;
    getApplicationAssetURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/app-icons/${options.applicationID}/${options.assetID}.${options.format}?size=${options.size}`;
    }
    ;
    getAchievementIconURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/app-assets/${options.applicationID}/achievements/${options.achievementID}/icons/${options.iconHash}.${options.format}?size=${options.size}`;
    }
    ;
    getTeamIconURL(options) {
        if (options.format === undefined || options.format === 'gif')
            options.format = this.options.defaultImageFormat;
        if (options.size === undefined)
            options.size = this.options.defaultImageSize;
        return `${Types.Constants.URLs.CDN}/team-icons/${options.teamID}/${options.teamIcon}.${options.format}?size=${options.size}`;
    }
    ;
    async getGateway() {
        return this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/gateway` });
    }
    ;
    async getGatewayBot() {
        return this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/gateway/bot` });
    }
    ;
    async getApplicationInformation(options) {
        return new Application({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/oauth2/applications/${options.userID === undefined ? '@me' : options.userID}` }) });
    }
    ;
    async getAuditLog(options) {
        return new AuditLog({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/audit-logs`, body: { user_id: options.options.userID, action_type: options.options.actionType, before: options.options.before, limit: options.options.limit } }) });
    }
    ;
    async getChannel(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}` }) });
    }
    ;
    async updateChannel(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/channels/${options.channelID}`, body: { name: options.options.name, type: options.options.type, position: options.options.position, topic: options.options.topic, nsfw: options.options.nsfw, rate_limit_per_user: options.options.rateLimitPerUser, bitrate: options.options.bitrate, user_limit: options.options.userLimit, permission_overwrites: options.options.permissionOverwrites, parent_id: options.options.parentID, reason: options.reason } }) });
    }
    ;
    async deleteGuildChannel(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/channels/${options.channelID}`, body: { reason: options.reason } }) });
    }
    ;
    async closeDMChannel(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/channels/${options.channelID}` }) });
    }
    ;
    async getMessages(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/messages`, body: { around: options.options.around, before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getMessage(options) {
        return new Message({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}` }) });
    }
    ;
    async createMessage(options) {
        return new Message({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/messages`, body: { content: options.options.content, nonce: options.options.nonce, tts: options.options.tts, embed: options.options.embed, payload_JSON: options.options.payloadJSON, allowed_mentions: options.options.allowedMentions }, file: options.options.file }) });
    }
    ;
    async crosspostMessage(options) {
        return new Message({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/crosspost` }) });
    }
    ;
    async createReaction(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}/${options.userID === undefined ? '@me' : options.userID}` });
    }
    ;
    async deleteReaction(options) {
        await this.handler.request({ method: 'DELETE', url: options.all ? options.emoji === undefined ? `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/reactions` : `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/crosspost` : `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}/${options.userID === undefined ? '@me' : options.userID}` });
    }
    ;
    async getReactions(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}/reactions/${options.emoji}`, body: { before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new User_1.default({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async updateMessage(options) {
        return new Message({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}`, body: { content: options.options.content, embed: options.options.embed, flags: options.options.flags } }) });
    }
    ;
    async deleteMessage(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async deleteBulkMessages(options) {
        await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/messages/bulk-delete`, body: { messages: options.options.messages, reason: options.reason } });
    }
    ;
    async updateChannelPermissions(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/channels/${options.channelID}/permissions/${options.overwriteID}`, body: { allow: options.options.allow, deny: options.options.deny, type: options.options.type, reason: options.reason } });
    }
    ;
    async getChannelInvites(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/invites` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Invite_1.default({ client: this, data: object });
            collection.set(subject.code, subject);
        }
        ;
        return collection;
    }
    ;
    async createChannelInvite(options) {
        return new Invite_1.default({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/invites`, body: { max_age: options.options.maxAge, max_uses: options.options.maxUses, temporary: options.options.temporary, unique: options.options.unique, target_user: options.options.targetUser, target_user_type: options.options.targetUserType, reason: options.reason } }) });
    }
    ;
    async deleteChannelPermission(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/channels/${options.channelID}/permissions/${options.overwriteID}`, body: { reason: options.reason } });
    }
    ;
    async followNewsChannel(options) {
        return new FollowedChannel({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/followers`, body: { webhook_channel_id: options.options.webhookChannelID } }) });
    }
    ;
    async triggerTypingIndicator(options) {
        await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/typing` });
    }
    ;
    async getPinnedMessages(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/pins` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createPinnedChannelMessage(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/channels/${options.channelID}/pins/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async deletePinnedChannelMessage(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/channels/${options.channelID}/pins/${options.messageID}`, body: { reason: options.reason } });
    }
    ;
    async createGroupDMRecipient(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/channels/${options.channelID}/recipients/${options.userID}`, body: { access_token: options.options.accessToken, nick: options.options.nick } });
    }
    ;
    async deleteGroupDMRecipient(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/channels/${options.channelID}/recipients/${options.userID}` });
    }
    ;
    async getGuildEmojis(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/emojis` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Emoji({ client: this, data: object });
            if (subject.flake !== undefined && subject.flake !== null)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getGuildEmoji(options) {
        return new Emoji({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/emojis/${options.emojiID}` }) });
    }
    ;
    async createGuildEmoji(options) {
        return new Emoji({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/emojis`, body: { name: options.options.name, image: options.options.image, roles: options.options.roles, reason: options.reason } }) });
    }
    ;
    async updateGuildEmoji(options) {
        return new Emoji({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/emojis/${options.emojiID}`, body: { name: options.options.name, image: options.options.image, reason: options.reason } }) });
    }
    ;
    async deleteGuildEmoji(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/emojis/${options.emojiID}`, body: { reason: options.reason } });
    }
    ;
    async createGuild(options) {
        return new Guild({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds`, body: { name: options.options.name, region: options.options.region, icon: options.options.icon, verification_level: options.options.verificationLevel, default_message_notifications: options.options.defaultMessageNotifications, explicit_content_filter: options.options.explicitContentFilter, roles: options.options.roles, channels: options.options.channels, afk_channel_id: options.options.afkChannelID, afk_timeout: options.options.afkTimeout, system_channel_id: options.options.systemChannelID } }) });
    }
    ;
    async getGuild(options) {
        return new Guild({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}`, body: { with_counts: options.options.withCounts } }) });
    }
    ;
    async getGuildPreview(options) {
        return new GuildPreview({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/preview` }) });
    }
    ;
    async updateGuild(options) {
        return new Guild({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}`, body: { name: options.options.name, region: options.options.region, verification_level: options.options.verificationLevel, default_message_notifications: options.options.defaultMessageNotifications, explicit_content_filter: options.options.explicitContentFilter, afk_channel_id: options.options.afkChannelID, afk_timeout: options.options.afkTimeout, icon: options.options.icon, owner_id: options.options.ownerID, splash: options.options.splash, banner: options.options.banner, system_channel_id: options.options.systemChannelID, rules_channel_id: options.options.rulesChannelID, public_updates_channel_id: options.options.publicUpdatesChannelID, preferred_locale: options.options.preferredLocale, reason: options.reason } }) });
    }
    ;
    async deleteGuild(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}` });
    }
    ;
    async getGuildChannels(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/channels` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ client: this, data: object });
            if (subject.flake !== undefined)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createGuildChannel(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/channels`, body: { name: options.options.name, type: options.options.type, topic: options.options.topic, bitrate: options.options.bitrate, user_limit: options.options.userLimit, rate_limit_per_user: options.options.rateLimitPerUser, position: options.options.position, permission_overwrites: options.options.permissionOverwrites, parent_id: options.options.parentID, nsfw: options.options.nsfw, reason: options.reason } }) });
    }
    ;
    async updateGuildChannelPositions(options) {
        await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/channels`, body: { id: options.options.id, position: options.options.position } });
    }
    ;
    async getGuildMember(options) {
        return new GuildMember({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}` }) });
    }
    ;
    async getGuildMembers(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/members`, body: { after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new GuildMember({ client: this, data: object });
            if (subject.user !== undefined)
                collection.set(subject.user.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createGuildMember(options) {
        return new GuildMember({ client: this, data: await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}`, body: { access_token: options.options.accessToken, nick: options.options.nick, roles: options.options.roles, mute: options.options.mute, deaf: options.options.deaf } }) });
    }
    ;
    async updateGuildMember(options) {
        await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}`, body: { nick: options.options.nick, roles: options.options.roles, mute: options.options.mute, deaf: options.options.deaf, channel_id: options.options.channelID, reason: options.reason } });
    }
    ;
    async updateUserNick(options) {
        await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID === undefined ? '@me' : options.userID}/nick`, body: { nick: options.options.nick } });
    }
    ;
    async createGuildMemberRole(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async deleteGuildMemberRole(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async deleteGuildMember(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/members/${options.userID}`, body: { reason: options.reason } });
    }
    ;
    async getGuildBans(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/bans` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Ban({ client: this, data: object });
            collection.set(subject.user.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getGuildBan(options) {
        return new Ban({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/bans/${options.userID}` }) });
    }
    ;
    async createGuildBan(options) {
        await this.handler.request({ method: 'PUT', url: `${this.handler.baseURL}/guilds/${options.guildID}/bans/${options.userID}`, body: { delete_message_days: options.options.deleteMessageDays, reason: options.options.reason } });
    }
    ;
    async deleteGuildBan(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/bans/${options.userID}`, body: { reason: options.reason } });
    }
    ;
    async getGuildRoles(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/roles` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Role({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createGuildRole(options) {
        return new Role({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/roles`, body: { name: options.options.name, permissions: options.options.permissions, color: options.options.color, hoist: options.options.hoist, mentionable: options.options.mentionable, reason: options.reason } }) });
    }
    ;
    async updateGuildRolePositions(options) {
        const data = await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/roles`, body: { id: options.options.id, position: options.options.position } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Role({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async updateGuildRole(options) {
        return new Role({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/roles/${options.roleID}`, body: { name: options.options.name, permissions: options.options.permissions, color: options.options.color, hoist: options.options.hoist, mentionable: options.options.mentionable, reason: options.reason } }) });
    }
    ;
    async deleteGuildRole(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/roles/${options.roleID}`, body: { reason: options.reason } });
    }
    ;
    async getGuildPruneCount(options) {
        return await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/prune`, body: { days: options.options.days, include_roles: options.options.includeRoles } });
    }
    ;
    async beginGuildPrune(options) {
        return await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/prune`, body: { days: options.options.days, compute_prune_count: options.options.computePruneCount, include_roles: options.options.includeRoles, reason: options.reason } });
    }
    ;
    async getGuildVoiceRegions(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/regions` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getGuildInvites(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/invites` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new InviteMetadata({ client: this, data: object });
            collection.set(subject.code, subject);
        }
        ;
        return collection;
    }
    ;
    async getGuildIntegrations(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/integrations`, body: { include_applications: options.options.includeApplications } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createGuildIntegration(options) {
        await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/integrations`, body: { type: options.options.type, id: options.options.id, reason: options.reason } });
    }
    ;
    async updateGuildIntegration(options) {
        await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/integrations/${options.integrationID}`, body: { expire_behavior: options.options.expireBehavior, expire_grace_period: options.options.expireGracePeriod, enable_emoticons: options.options.enableEmoticons, reason: options.reason } });
    }
    ;
    async deleteGuildIntegration(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/guilds/${options.guildID}/integrations/${options.integrationID}`, body: { reason: options.reason } });
    }
    ;
    async syncGuildIntegration(options) {
        return await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/guilds/${options.guildID}/integrations/${options.integrationID}/sync` });
    }
    ;
    async getGuildWidgetSettings(options) {
        return new GuildWidget({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/widget` }) });
    }
    ;
    async updateGuildWidget(options) {
        return new GuildWidget({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/guilds/${options.guildID}/widget`, body: options }) });
    }
    ;
    async getGuildWidget(options) {
        return await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/widget.json` });
    }
    ;
    async getGuildVanityURL(options) {
        return new Invite_1.default({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/vanity-url` }) });
    }
    ;
    async getGuildWidgetImage(options) {
        return await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guilds/${options.guildID}/widget.png`, body: { style: options.options.style } });
    }
    ;
    async getInvite(options) {
        return new Invite_1.default({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/invites/${options.inviteCode}`, body: { with_counts: options.options.withCounts } }) });
    }
    ;
    async deleteInvite(options) {
        return new Invite_1.default({ client: this, data: await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/invites/${options.inviteCode}`, body: { reason: options.reason } }) });
    }
    ;
    async getTemplate(options) {
        return new Server_1.Template({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}guilds/templates/${options.templateCode}` }) });
    }
    ;
    async createGuildFromTemplate(options) {
        return new Guild({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}guilds/templates/${options.templateCode}`, body: { name: options.options.name, icon: options.options.icon } }) });
    }
    ;
    async getVoiceRegions() {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/voice/regions` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getUser(options) {
        return new User_1.default({ client: this, data: await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}` }) });
    }
    ;
    async updateUser(options) {
        return new User_1.default({ client: this, data: await this.handler.request({ method: 'PATCH', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}`, body: { username: options.options.username, avatar: options.options.avatar } }) });
    }
    ;
    async getGuilds(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/guilds`, body: { before: options.options.before, after: options.options.after, limit: options.options.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Guild({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async leaveGuild(options) {
        await this.handler.request({ method: 'DELETE', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/guilds/${options.guildID}` });
    }
    ;
    async getDMs(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/channels` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ client: this, data: object });
            if (subject.flake !== undefined)
                collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createDM(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/channels`, body: { recipient_id: options.options.recipientID } }) });
    }
    ;
    async createGroupDM(options) {
        return new Channel_1.default({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/channels`, body: { access_tokens: options.options.accessTokens, nicks: options.options.nicks } }) });
    }
    ;
    async getConnections(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/users/${options.userID === undefined ? '@me' : options.userID}/connections` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration_1.Connection({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async createChannelWebhook(options) {
        return new Webhook_1.default({ client: this, data: await this.handler.request({ method: 'POST', url: `${this.handler.baseURL}/channels/${options.channelID}/webhooks`, body: { name: options.options.name, avatar: options.options.avatar, reason: options.reason } }) });
    }
    ;
    async getChannelWebhooks(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/channels/${options.channelID}/webhooks` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getGuildWebhooks(options) {
        const data = await this.handler.request({ method: 'GET', url: `${this.handler.baseURL}/guild/${options.guildID}/webhooks` });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ client: this, data: object });
            collection.set(subject.flake.id, subject);
        }
        ;
        return collection;
    }
    ;
    async getWebhook(options) {
        return new Webhook_1.default({ client: this, data: await this.handler.request({ method: 'GET', url: (options.webhookToken === undefined ? `${this.handler.baseURL}/webhooks/${options.webhookID}` : `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}`) }) });
    }
    ;
    async updateWebhook(options) {
        return new Webhook_1.default({ client: this, data: await this.handler.request({ method: 'PATCH', url: (options.webhookToken === undefined ? `${this.handler.baseURL}/webhooks/${options.webhookID}` : `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { name: options.options.name, avatar: options.options.avatar, channel_id: options.options.channelID, reason: options.reason } }) });
    }
    ;
    async deleteWebhook(options) {
        return await this.handler.request({ method: 'DELETE', url: (options.webhookToken === undefined ? `${this.handler.baseURL}/webhooks/${options.webhookID}` : `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { reason: options.reason } });
    }
    ;
    async executeWebhook(options) {
        return await this.handler.request({ method: 'POST', url: (options.slack ? `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}/slack` : options.github ? `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}/github` : `${this.handler.baseURL}/webhooks/${options.webhookID}/${options.webhookToken}`), body: { content: options.options.content, username: options.options.username, avatar_url: options.options.avatarURL, tts: options.options.tts, embeds: options.options.embeds, payload_JSON: options.options.payloadJSON, allowed_mentions: options.options.allowedMentions, wait: options.options.wait }, file: options.options.file });
    }
    ;
}
exports.default = Client;
;
