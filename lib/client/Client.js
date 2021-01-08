"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const App_1 = require("../structures/App");
const AuditLog_1 = require("../structures/AuditLog");
const Channel_1 = require("../structures/Channel");
const Integration_1 = require("../structures/Integration");
const Invite_1 = require("../structures/Invite");
const Message_1 = require("../structures/Message");
const Server_1 = require("../structures/Server");
const User_1 = require("../structures/User");
const Webhook_1 = require("../structures/Webhook");
const RequestHandler_1 = require("./RequestHandler");
class Gateway extends Base_1.default {
    constructor(data) {
        super();
        this.url = data.url;
        this.shards = data.shards;
        this.sessionStartLimit = data.session_start_limit === undefined ? data.session_start_limit : new SessionStartLimit(data.session_start_limit);
    }
}
class SessionStartLimit extends Base_1.default {
    constructor(data) {
        super();
        this.total = data.total;
        this.remaining = data.remaining;
        this.resetAfter = data.reset_after;
        this.maxConcurrency = data.max_concurrency;
    }
}
const DefaultURLs = {
    base: 'https://discord.com/api',
    cdn: 'https://cdn.discordapp.com',
    invite: 'https://discord.gg',
    template: 'https://discord.com/template'
};
const DefaultEndpoints = {
    AppAsset: (cdn, appID, assetID, format) => `${cdn}/app-assets/${appID}/${assetID}.${format}`,
    AppAchievementIcon: (cdn, appID, achievementID, icon, format) => `${cdn}/app-assets/${appID}/achievements/${achievementID}/icons/${icon}.${format}`,
    AppIcon: (cdn, appID, icon, format) => `${cdn}/app-icons/${appID}/${icon}.${format}`,
    UserAvatar: (cdn, userID, avatar, format) => `${cdn}/avatars/${userID}/${avatar}.${format}`,
    ServerBanner: (cdn, serverID, banner, format) => `${cdn}/banners/${serverID}/${banner}.${format}`,
    ServerDiscoverySplash: (cdn, serverID, discoverySplash, format) => `${cdn}/discovery-splashes/${serverID}/${discoverySplash}.${format}`,
    DefaultUserAvatar: (cdn, tag) => `${cdn}/embed/avatars/${tag}.png`,
    Emoji: (cdn, emojiID, format) => `${cdn}/emojis/${emojiID}.${format}`,
    ServerIcon: (cdn, serverID, icon, format) => `${cdn}/icons/${serverID}/${icon}.${format}`,
    ServerSplash: (cdn, serverID, splash, format) => `${cdn}/splashes/${serverID}/${splash}.${format}`,
    TeamIcon: (cdn, teamID, icon, format) => `${cdn}/team-icons/${teamID}/${icon}.${format}`,
    Channel: (base, channelID) => `${base}/channels/${channelID}`,
    ChannelMessages: (base, channelID) => `${base}/channels/${channelID}/messages`,
    ChannelMessage: (base, channelID, messageID) => `${base}/channels/${channelID}/messages/${messageID}`,
    ChannelMessagePublish: (base, channelID, messageID) => `${base}/channels/${channelID}/messages/${messageID}/crosspost`,
    ChannelMessageReactions: (base, channelID, messageID) => `${base}/channels/${channelID}/messages/${messageID}/reactions`,
    ChannelMessageReaction: (base, channelID, messageID, emoji) => `${base}/channels/${channelID}/messages/${messageID}/reactions/${emoji}`,
    ChannelMessageReactionUser: (base, channelID, messageID, emoji, userID) => `${base}/channels/${channelID}/messages/${messageID}/reactions/${emoji}/${userID}`,
    ChannelMessagesBulk: (base, channelID) => `${base}/channels/${channelID}/messages/bulk-delete`,
    ChannelInvites: (base, channelID) => `${base}/channels/${channelID}/invites`,
    ChannelFollowers: (base, channelID) => `${base}/channels/${channelID}/followers`,
    ChannelPermission: (base, channelID, overwriteID) => `${base}/channels/${channelID}/permissions/${overwriteID}`,
    ChannelPins: (base, channelID) => `${base}/channels/${channelID}/pins`,
    ChannelPin: (base, channelID, messageID) => `${base}/channels/${channelID}/pins/${messageID}`,
    ChannelRecipient: (base, channelID, userID) => `${base}/channels/${channelID}/recipients/${userID}`,
    ChannelTyping: (base, channelID) => `${base}/channels/${channelID}/typing`,
    ChannelWebhooks: (base, channelID) => `${base}/channels/${channelID}/webhooks`,
    Gateway: (base) => `${base}/gateway`,
    GatewayBot: (base) => `${base}/gateway/bot`,
    Servers: (base) => `${base}/guilds`,
    Server: (base, serverID) => `${base}/guilds/${serverID}`,
    ServerAuditLog: (base, serverID) => `${base}/guilds/${serverID}/audit-logs`,
    ServerBans: (base, serverID) => `${base}/guilds/${serverID}/bans`,
    ServerBan: (base, serverID, userID) => `${base}/guilds/${serverID}/bans/${userID}`,
    ServerChannels: (base, serverID) => `${base}/guilds/${serverID}/channels`,
    ServerEmojis: (base, serverID) => `${base}/guilds/${serverID}/emojis`,
    ServerEmoji: (base, serverID, emojiID) => `${base}/guilds/${serverID}/emojis/${emojiID}`,
    ServerIntegrations: (base, serverID) => `${base}/guilds/${serverID}/integrations`,
    ServerIntegration: (base, serverID, integrationID) => `${base}/guilds/${serverID}/integrations/${integrationID}`,
    ServerIntegrationSync: (base, serverID, integrationID) => `${base}/guilds/${serverID}/integrations/${integrationID}/sync`,
    ServerInvites: (base, serverID) => `${base}/guilds/${serverID}/invites`,
    ServerMembers: (base, serverID) => `${base}/guilds/${serverID}/members`,
    ServerMember: (base, serverID, userID) => `${base}/guilds/${serverID}/members/${userID}`,
    ServerMemberNick: (base, serverID, userID) => `${base}/guilds/${serverID}/members/${userID}/nick`,
    ServerMemberRole: (base, serverID, userID, roleID) => `${base}/guilds/${serverID}/members/${userID}/roles/${roleID}`,
    ServerPreview: (base, serverID) => `${base}/guilds/${serverID}/preview`,
    ServerPrune: (base, serverID) => `${base}/guilds/${serverID}/prune`,
    ServerRegions: (base, serverID) => `${base}/guilds/${serverID}/regions`,
    ServerRoles: (base, serverID) => `${base}/guilds/${serverID}/roles`,
    ServerRole: (base, serverID, roleID) => `${base}/guilds/${serverID}/roles/${roleID}`,
    ServerTemplates: (base, serverID) => `${base}/guilds/${serverID}/templates`,
    ServerTemplate: (base, serverID, templateCode) => `${base}/guilds/${serverID}/templates/${templateCode}`,
    ServerInvite: (base, serverID) => `${base}/guilds/${serverID}/vanity-url`,
    ServerWebhooks: (base, serverID) => `${base}/guilds/${serverID}/webhooks`,
    ServerWidget: (base, serverID) => `${base}/guilds/${serverID}/widget`,
    ServerWidgetParams: (base, serverID) => `${base}/guilds/${serverID}/widget.json`,
    ServerWidgetImage: (base, serverID) => `${base}/guilds/${serverID}/widget.png`,
    Invite: (base, inviteCode) => `${base}/invites/${inviteCode}`,
    OAuth2App: (base, userID) => `${base}/oauth2/applications/${userID}`,
    Template: (base, templateCode) => `${base}/templates/${templateCode}`,
    User: (base, userID) => `${base}/users/${userID}`,
    UserChannels: (base, userID) => `${base}/users/${userID}/channels`,
    UserConnections: (base, userID) => `${base}/users/${userID}/connections`,
    UserServers: (base, userID) => `${base}/users/${userID}/guilds`,
    UserServer: (base, userID, serverID) => `${base}/users/${userID}/guilds/${serverID}`,
    VoiceRegions: (base) => `${base}/voice/regions`,
    Webhook: (base, webhookID) => `${base}/webhooks/${webhookID}`,
    WebhookToken: (base, webhookID, webhookToken) => `${base}/webhooks/${webhookID}/${webhookToken}`,
    WebhookTokenGitHub: (base, webhookID, webhookToken) => `${base}/webhooks/${webhookID}/${webhookToken}/github`,
    WebhookTokenSlack: (base, webhookID, webhookToken) => `${base}/webhooks/${webhookID}/${webhookToken}/slack`
};
class Client extends Base_1.default {
    constructor(options) {
        super();
        this.options = {
            token: options.token,
            properties: options.properties === undefined ? {
                $os: process.platform,
                $browser: RequestHandler_1.PackageData.name,
                $device: RequestHandler_1.PackageData.name
            } : options.properties,
            isCompress: options.isCompress,
            largeThreshold: options.largeThreshold,
            numShards: options.numShards === undefined ? 'auto' : options.numShards,
            presence: options.presence,
            isServerSubscriptions: options.isServerSubscriptions,
            intents: options.intents === undefined ? 513 : options.intents,
            defaultImageSize: options.defaultImageSize === undefined ? 1024 : options.defaultImageSize,
            defaultImageFormat: options.defaultImageFormat === undefined ? 'webp' : options.defaultImageFormat,
            defaultURLs: { ...DefaultURLs, ...options.defaultURLs },
            defaultEndpoints: { ...DefaultEndpoints, ...options.defaultEndpoints },
            userAgent: options.userAgent === undefined ? `DiscordBot (${RequestHandler_1.PackageData.homepage}, ${RequestHandler_1.PackageData.version})` : options.userAgent,
            isDisableStrict: options.isDisableStrict === undefined ? false : options.isDisableStrict
        };
        if (this.options.numShards === 'auto' && !this.options.token.startsWith('Bot ') && !this.options.isDisableStrict)
            this.options.token = `Bot ${this.options.token}`;
        this.user = User_1.default.prototype;
        this.handler = new RequestHandler_1.default(this);
        this.servers = new Collection_1.default();
        this.channels = new Collection_1.default();
        this.users = new Collection_1.default();
        this.webhooks = new Collection_1.default();
        this.apps = new Collection_1.default();
        this.integration = new Collection_1.default();
        this.emojis = new Collection_1.default();
        this.messages = new Collection_1.default();
    }
    getAppAssetURL(params) {
        return this.options.defaultEndpoints.AppAsset(this.options.defaultURLs.cdn, params.appID, params.assetID, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getAppAchievementIconURL(params) {
        return this.options.defaultEndpoints.AppAchievementIcon(this.options.defaultURLs.cdn, params.appID, params.achievementID, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getAppIconURL(params) {
        return this.options.defaultEndpoints.AppIcon(this.options.defaultURLs.cdn, params.appID, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getUserAvatarURL(params) {
        return this.options.defaultEndpoints.UserAvatar(this.options.defaultURLs.cdn, params.userID, params.avatar, params.format === undefined || params.format === 'auto' || params.format === 'gif' && !params.avatar.startsWith('a_') ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getServerBannerURL(params) {
        return this.options.defaultEndpoints.ServerBanner(this.options.defaultURLs.cdn, params.serverID, params.banner, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getServerDiscoverySplashURL(params) {
        return this.options.defaultEndpoints.ServerDiscoverySplash(this.options.defaultURLs.cdn, params.serverID, params.discoverySplash, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getDefaultUserAvatarURL(params) {
        return this.options.defaultEndpoints.DefaultUserAvatar(this.options.defaultURLs.cdn, params.tag);
    }
    getEmojiURL(params) {
        return this.options.defaultEndpoints.Emoji(this.options.defaultURLs.cdn, params.emojiID, params.animated ? 'gif' : 'png') + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getServerIconURL(params) {
        return this.options.defaultEndpoints.ServerIcon(this.options.defaultURLs.cdn, params.serverID, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' && !params.icon.startsWith('a_') ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getServerSplashURL(params) {
        return this.options.defaultEndpoints.ServerSplash(this.options.defaultURLs.cdn, params.serverID, params.splash, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    getTeamIconURL(params) {
        return this.options.defaultEndpoints.TeamIcon(this.options.defaultURLs.cdn, params.teamID, params.icon, params.format === undefined || params.format === 'auto' || params.format === 'gif' ? this.options.defaultImageFormat : params.format) + (params.size === undefined ? `?size=${params.size === 'auto' ? this.options.defaultImageSize : params.size}` : '');
    }
    async getChannel(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Channel(this.options.defaultURLs.base, params.channelID) }) });
    }
    async editChannel(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.Channel(this.options.defaultURLs.base, params.channelID), body: { name: params.name, type: params.type, position: params.position, topic: params.topic, nsfw: params.isNSFW, rate_limit_per_user: params.slowmode, bitrate: params.bitrate, user_limit: params.userLimit, permission_overwrites: params.permissions, parent_id: String(params.parentID), reason: params.reason } }) });
    }
    async removeChannel(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.Channel(this.options.defaultURLs.base, params.channelID), body: { reason: params.reason } }) });
    }
    async leaveDMChannel(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.Channel(this.options.defaultURLs.base, params.channelID) }) });
    }
    async getMessages(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelMessages(this.options.defaultURLs.base, params.channelID), body: { around: String(params.aroundID), before: String(params.beforeID), after: String(params.afterID), limit: params.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addMessage(params) {
        return new Message_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelMessages(this.options.defaultURLs.base, params.channelID), body: { content: params.content, nonce: params.nonce, tts: params.isTTS, embed: params.embed, allowed_mentions: params.mentions }, file: params.file }) });
    }
    async getMessage(params) {
        return new Message_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelMessage(this.options.defaultURLs.base, params.channelID, params.messageID) }) });
    }
    async editMessage(params) {
        return new Message_1.default({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ChannelMessage(this.options.defaultURLs.base, params.channelID, params.messageID), body: { content: params.content, embed: params.embed, flags: params.flags } }) });
    }
    async removeMessage(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ChannelMessage(this.options.defaultURLs.base, params.channelID, params.messageID), body: { reason: params.reason } });
    }
    async publishMessage(params) {
        return new Message_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelMessagePublish(this.options.defaultURLs.base, params.channelID, params.messageID) }) });
    }
    async removeReactions(params) {
        this.handler.request({ method: 'DELETE', url: params.emoji === undefined ? this.options.defaultEndpoints.ChannelMessageReactions(this.options.defaultURLs.base, params.channelID, params.messageID) : params.userID === undefined && params.isAll ? this.options.defaultEndpoints.ChannelMessageReaction(this.options.defaultURLs.base, params.channelID, params.messageID, params.emoji) : this.options.defaultEndpoints.ChannelMessageReactionUser(this.options.defaultURLs.base, params.channelID, params.messageID, params.emoji, params.userID === undefined ? '@me' : params.userID) });
    }
    async getReactionUsers(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelMessageReaction(this.options.defaultURLs.base, params.channelID, params.messageID, params.emoji), body: { before: String(params.beforeID), after: String(params.afterID), limit: params.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new User_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addReaction(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ChannelMessageReactionUser(this.options.defaultURLs.base, params.channelID, params.messageID, params.emoji, params.userID === undefined ? '@me' : params.userID) });
    }
    async removeMessages(params) {
        this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelMessagesBulk(this.options.defaultURLs.base, params.channelID), body: { messages: params.messagesID.map(element => element.toString()), reason: params.reason } });
    }
    async editChannelPermissions(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ChannelPermission(this.options.defaultURLs.base, params.channelID, params.overwriteID), body: { allow: params.allow, deny: params.deny, type: params.type, reason: params.reason } });
    }
    async removeChannelPermission(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ChannelPermission(this.options.defaultURLs.base, params.channelID, params.overwriteID), body: { reason: params.reason } });
    }
    async getChannelInvites(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelInvites(this.options.defaultURLs.base, params.channelID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Invite_1.InviteMetadata({ _client: this, ...object });
            collection.set(subject.code, subject);
        }
        return collection;
    }
    async addChannelInvite(params) {
        return new Invite_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelInvites(this.options.defaultURLs.base, params.channelID), body: { max_age: params.maxAge, max_uses: params.maxUses, temporary: params.isTemporary, unique: params.isUnique, target_user: String(params.targetUserID), target_user_type: params.targetUserType, reason: params.reason } }) });
    }
    async followNewsChannel(params) {
        return new Channel_1.FollowedChannel({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelFollowers(this.options.defaultURLs.base, params.channelID), body: { webhook_channel_id: params.webhookChannelID } }) });
    }
    async startTypingIndicator(params) {
        this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelTyping(this.options.defaultURLs.base, params.channelID) });
    }
    async getPinnedMessages(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelPins(this.options.defaultURLs.base, params.channelID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Message_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addPinnedMessage(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ChannelPin(this.options.defaultURLs.base, params.channelID, params.messageID), body: { reason: params.reason } });
    }
    async removePinnedMessage(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ChannelPin(this.options.defaultURLs.base, params.channelID, params.messageID), body: { reason: params.reason } });
    }
    async addGroupDMUser(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ChannelRecipient(this.options.defaultURLs.base, params.channelID, params.userID), body: { access_token: params.accessToken, nick: params.nick } });
    }
    async removeGroupDMUser(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ChannelRecipient(this.options.defaultURLs.base, params.channelID, params.userID) });
    }
    async getChannelWebhooks(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ChannelWebhooks(this.options.defaultURLs.base, params.channelID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addChannelWebhook(params) {
        return new Webhook_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ChannelWebhooks(this.options.defaultURLs.base, params.channelID), body: { name: params.name, avatar: params.avatar, reason: params.reason } }) });
    }
    async getGateway() {
        return new Gateway(await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Gateway(this.options.defaultURLs.base) }));
    }
    async getGatewayBot() {
        return new Gateway(await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.GatewayBot(this.options.defaultURLs.base) }));
    }
    async addServer(params) {
        return new Server_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.Servers(this.options.defaultURLs.base), body: { name: params.name, region: params.region, icon: params.icon, verification_level: params.verificationLevel, default_message_notifications: params.messageNotifications, explicit_content_filter: params.explicitFilter, roles: params.roles, channels: params.channels, afk_channel_id: String(params.afkChannelID), afk_timeout: params.afkTimeout, system_channel_id: String(params.systemChannelID) } }) });
    }
    async getServer(params) {
        return new Server_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Server(this.options.defaultURLs.base, params.serverID), body: { with_counts: params.isWithCounts } }) });
    }
    async editServer(params) {
        return new Server_1.default({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.Server(this.options.defaultURLs.base, params.serverID), body: { name: params.name, region: params.region, verification_level: params.verificationLevel, default_message_notifications: params.messageNotifications, explicit_content_filter: params.explicitFilter, afk_channel_id: String(params.afkChannelID), afk_timeout: params.afkTimeout, icon: params.icon, owner_id: String(params.ownerID), splash: params.splash, banner: params.banner, system_channel_id: String(params.systemChannelID), rules_channel_id: String(params.rulesChannelID), public_updates_channel_id: String(params.publicUpdatesChannelID), preferred_locale: params.preferredLocale, reason: params.reason } }) });
    }
    async removeServer(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.Server(this.options.defaultURLs.base, params.serverID) });
    }
    async getAuditLog(params) {
        return new AuditLog_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerAuditLog(this.options.defaultURLs.base, params.serverID), body: { user_id: params.userID, action_type: params.actionType, before: String(params.beforeID), limit: params.limit } }) });
    }
    async getBans(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerBans(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Ban({ _client: this, ...object });
            collection.set(subject.user.flake.id, subject);
        }
        return collection;
    }
    async getBan(params) {
        return new Server_1.Ban({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerBan(this.options.defaultURLs.base, params.serverID, params.userID) }) });
    }
    async addBan(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ServerBan(this.options.defaultURLs.base, params.serverID, params.userID), body: { remove_message_days: params.days, reason: params.reason } });
    }
    async removeBan(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerBan(this.options.defaultURLs.base, params.serverID, params.userID), body: { reason: params.reason } });
    }
    async getServerChannels(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerChannels(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addServerChannel(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerChannels(this.options.defaultURLs.base, params.serverID), body: { name: params.name, type: params.type, topic: params.topic, bitrate: params.bitrate, user_limit: params.userLimit, rate_limit_per_user: params.slowmode, position: params.position, permission_overwrites: params.permissions, parent_id: String(params.parentID), nsfw: params.isNSFW, reason: params.reason } }) });
    }
    async editServerChannelPositions(params) {
        this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerChannels(this.options.defaultURLs.base, params.serverID), body: { id: params.channelID, position: params.position } });
    }
    async getEmojis(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerEmojis(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Emoji({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addEmoji(params) {
        return new Server_1.Emoji({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerEmojis(this.options.defaultURLs.base, params.serverID), body: { name: params.name, image: params.image, roles: params.rolesID === undefined ? params.rolesID : params.rolesID.map(element => element.toString()), reason: params.reason } }) });
    }
    async getEmoji(params) {
        return new Server_1.Emoji({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerEmoji(this.options.defaultURLs.base, params.serverID, params.emojiID) }) });
    }
    async editEmoji(params) {
        return new Server_1.Emoji({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerEmoji(this.options.defaultURLs.base, params.serverID, params.emojiID), body: { name: params.name, roles: params.rolesID === undefined || params.rolesID === null ? params.rolesID : params.rolesID.map(element => element.toString()), reason: params.reason } }) });
    }
    async removeEmoji(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerEmoji(this.options.defaultURLs.base, params.serverID, params.emojiID), body: { reason: params.reason } });
    }
    async getIntegrations(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerIntegrations(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addIntegration(params) {
        this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerIntegrations(this.options.defaultURLs.base, params.serverID), body: { type: params.type, id: String(params.integrationID), reason: params.reason } });
    }
    async editIntegration(params) {
        this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerIntegration(this.options.defaultURLs.base, params.serverID, params.integrationID), body: { expire_behavior: params.expireBehavior, expire_grace_period: params.expireGracePeriod, enable_emoticons: params.isEmojis, reason: params.reason } });
    }
    async removeIntegration(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerIntegration(this.options.defaultURLs.base, params.serverID, params.integrationID), body: { reason: params.reason } });
    }
    async syncIntegration(params) {
        this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerIntegrationSync(this.options.defaultURLs.base, params.serverID, params.integrationID) });
    }
    async getServerInvites(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerInvites(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Invite_1.InviteMetadata({ _client: this, ...object });
            collection.set(subject.code, subject);
        }
        return collection;
    }
    async getMembers(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerMembers(this.options.defaultURLs.base, params.serverID), body: { after: String(params.afterID), limit: params.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.ServerMember({ _client: this, ...object });
            collection.set(subject.user.flake.id, subject);
        }
        return collection;
    }
    async getMember(params) {
        return new Server_1.ServerMember({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerMember(this.options.defaultURLs.base, params.serverID, params.userID) }) });
    }
    async addMember(params) {
        return new Server_1.ServerMember({ _client: this, ...await this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ServerMember(this.options.defaultURLs.base, params.serverID, params.userID), body: { access_token: params.accessToken, nick: params.nick, roles: params.rolesID === undefined ? params.rolesID : params.rolesID.map(element => element.toString()), mute: params.isMute, deaf: params.isDeaf } }) });
    }
    async editMember(params) {
        this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerMember(this.options.defaultURLs.base, params.serverID, params.userID), body: { nick: params.nick, roles: params.rolesID === undefined ? params.rolesID : params.rolesID.map(element => element.toString()), mute: params.isMute, deaf: params.isDeaf, channel_id: String(params.channelID), reason: params.reason } });
    }
    async removeMember(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerMember(this.options.defaultURLs.base, params.serverID, params.userID), body: { reason: params.reason } });
    }
    async editUserNick(params) {
        this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerMemberNick(this.options.defaultURLs.base, params.serverID, params.userID === undefined ? '@me' : params.userID), body: { nick: params.nick } });
    }
    async addMemberRole(params) {
        this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ServerMemberRole(this.options.defaultURLs.base, params.serverID, params.userID, params.roleID), body: { reason: params.reason } });
    }
    async removeMemberRole(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerMemberRole(this.options.defaultURLs.base, params.serverID, params.userID, params.roleID), body: { reason: params.reason } });
    }
    async getServerPreview(params) {
        return new Server_1.ServerPreview({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerPreview(this.options.defaultURLs.base, params.serverID) }) });
    }
    async getServerPrune(params) {
        this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerPrune(this.options.defaultURLs.base, params.serverID), body: { days: params.days, include_roles: params.includeRolesID === undefined ? params.includeRolesID : params.includeRolesID.map(element => element.toString()) } });
    }
    async startServerPrune(params) {
        this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerPrune(this.options.defaultURLs.base, params.serverID), body: { days: params.days, compute_prune_count: params.computeCount, include_roles: params.includeRolesID === undefined ? params.includeRolesID : params.includeRolesID.map(element => element.toString()), reason: params.reason } });
    }
    async getServerVoiceRegions(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerRegions(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion(object);
            collection.set(subject.id, subject);
        }
        return collection;
    }
    async getRoles(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerRoles(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Role({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addRole(params) {
        return new Server_1.Role({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerRoles(this.options.defaultURLs.base, params.serverID), body: { name: params.name, permissions: params.bitPermission, color: params.colorDec, hoist: params.isHoist, mentionable: params.isMentionable, reason: params.reason } }) });
    }
    async editRolePositions(params) {
        const data = await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerRoles(this.options.defaultURLs.base, params.serverID), body: { id: params.roleID, position: params.position } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Role({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async editRole(params) {
        return new Server_1.Role({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerRole(this.options.defaultURLs.base, params.serverID, params.roleID), body: { name: params.name, permissions: params.bitPermission, color: params.colorDec, hoist: params.isHoist, mentionable: params.isMentionable, reason: params.reason } }) });
    }
    async removeRole(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerRole(this.options.defaultURLs.base, params.serverID, params.roleID), body: { reason: params.reason } });
    }
    async getServerTemplates(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerTemplates(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.Template({ _client: this, ...object });
            collection.set(subject.code, subject);
        }
        return collection;
    }
    async addServerTemplate(params) {
        return new Server_1.Template({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.ServerTemplates(this.options.defaultURLs.base, params.serverID), body: { name: params.name, description: params.description } }) });
    }
    async editServerTemplate(params) {
        return new Server_1.Template({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerTemplate(this.options.defaultURLs.base, params.serverID, params.templateCode), body: { name: params.name, description: params.description } }) });
    }
    async removeServerTemplate(params) {
        return new Server_1.Template({ _client: this, ...await this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.ServerTemplate(this.options.defaultURLs.base, params.serverID, params.templateCode) }) });
    }
    async syncServerTemplate(params) {
        return new Server_1.Template({ _client: this, ...await this.handler.request({ method: 'PUT', url: this.options.defaultEndpoints.ServerTemplate(this.options.defaultURLs.base, params.serverID, params.templateCode) }) });
    }
    async getServerInvite(params) {
        return new Invite_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerInvite(this.options.defaultURLs.base, params.serverID) }) });
    }
    async getServerWebhooks(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerWebhooks(this.options.defaultURLs.base, params.serverID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Webhook_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async getServerWidget(params) {
        return new Server_1.ServerWidget({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerWidget(this.options.defaultURLs.base, params.serverID) }) });
    }
    async editServerWidget(params) {
        return new Server_1.ServerWidget({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.ServerWidget(this.options.defaultURLs.base, params.serverID), body: params }) });
    }
    async getServerWidgetParams(params) {
        return new Server_1.ServerWidgetParams({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerWidgetParams(this.options.defaultURLs.base, params.serverID) }) });
    }
    async getServerWidgetImage(params) {
        return await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.ServerWidgetImage(this.options.defaultURLs.base, params.serverID), body: { style: params.style } });
    }
    async getInvite(params) {
        return new Invite_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Invite(this.options.defaultURLs.base, params.inviteCode), body: { with_counts: params.isWithCounts } }) });
    }
    async removeInvite(params) {
        return new Invite_1.default({ _client: this, ...await this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.Invite(this.options.defaultURLs.base, params.inviteCode), body: { reason: params.reason } }) });
    }
    async getOAuth2App(params) {
        return new App_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.OAuth2App(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID) }) });
    }
    async getTemplate(params) {
        return new Server_1.Template({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.Template(this.options.defaultURLs.base, params.templateCode) }) });
    }
    async addServerFromTemplate(params) {
        return new Server_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.Template(this.options.defaultURLs.base, params.templateCode), body: { name: params.name, icon: params.icon } }) });
    }
    async getUser(params) {
        return new User_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.User(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID) }) });
    }
    async editUser(params) {
        return new User_1.default({ _client: this, ...await this.handler.request({ method: 'PATCH', url: this.options.defaultEndpoints.User(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID), body: { username: params.username, avatar: params.avatar } }) });
    }
    async getDMs(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.UserChannels(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Channel_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async addDM(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.UserChannels(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID), body: { recipient_id: String(params.recipientID) } }) });
    }
    async addGroupDM(params) {
        return new Channel_1.default({ _client: this, ...await this.handler.request({ method: 'POST', url: this.options.defaultEndpoints.UserChannels(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID), body: { access_tokens: params.accessTokens, nicks: params.nicks } }) });
    }
    async getConnections(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.UserConnections(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Integration_1.Connection({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async getServers(params) {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.UserServers(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID), body: { before: String(params.beforeID), after: String(params.afterID), limit: params.limit } });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.default({ _client: this, ...object });
            collection.set(subject.flake.id, subject);
        }
        return collection;
    }
    async leaveServer(params) {
        this.handler.request({ method: 'DELETE', url: this.options.defaultEndpoints.UserServer(this.options.defaultURLs.base, params.userID === undefined ? '@me' : params.userID, params.serverID) });
    }
    async getVoiceRegions() {
        const data = await this.handler.request({ method: 'GET', url: this.options.defaultEndpoints.VoiceRegions(this.options.defaultURLs.base) });
        const collection = new Collection_1.default();
        for (const object of data) {
            const subject = new Server_1.VoiceRegion(object);
            collection.set(subject.id, subject);
        }
        return collection;
    }
    async getWebhook(params) {
        return new Webhook_1.default({ _client: this, ...await this.handler.request({ method: 'GET', url: params.webhookToken === undefined ? this.options.defaultEndpoints.Webhook(this.options.defaultURLs.base, params.webhookID) : this.options.defaultEndpoints.WebhookToken(this.options.defaultURLs.base, params.webhookID, params.webhookToken) }) });
    }
    async editWebhook(params) {
        return new Webhook_1.default({ _client: this, ...await this.handler.request({ method: 'PATCH', url: params.webhookToken === undefined ? this.options.defaultEndpoints.Webhook(this.options.defaultURLs.base, params.webhookID) : this.options.defaultEndpoints.WebhookToken(this.options.defaultURLs.base, params.webhookID, params.webhookToken), body: { name: params.name, avatar: params.avatar, channel_id: String(params.channelID), reason: params.reason } }) });
    }
    async removeWebhook(params) {
        this.handler.request({ method: 'DELETE', url: params.webhookToken === undefined ? this.options.defaultEndpoints.Webhook(this.options.defaultURLs.base, params.webhookID) : this.options.defaultEndpoints.WebhookToken(this.options.defaultURLs.base, params.webhookID, params.webhookToken), body: { reason: params.reason } });
    }
    async executeWebhook(params) {
        this.handler.request({ method: 'POST', url: params.isSlack ? this.options.defaultEndpoints.WebhookTokenSlack(this.options.defaultURLs.base, params.webhookID, params.webhookToken) : params.isGitHub ? this.options.defaultEndpoints.WebhookTokenGitHub(this.options.defaultURLs.base, params.webhookID, params.webhookToken) : this.options.defaultEndpoints.WebhookToken(this.options.defaultURLs.base, params.webhookID, params.webhookToken), body: { content: params.content, username: params.username, avatar_url: params.avatarURL, tts: params.isTTS, embeds: params.embeds, allowed_mentions: params.mentions, wait: params.isWait }, file: params.file });
    }
}
exports.default = Client;
