import Base from '../Base';
import Collection from '../Collection';
import type { DiscordLocales, ImageFormat, ImageSize, PartialObject } from '../Types';
import App from '../structures/App';
import AuditLog from '../structures/AuditLog';
import type { AuditLogEvent } from '../structures/AuditLog';
import Channel, { FollowedChannel } from '../structures/Channel';
import type { ChannelType, JSONChannel } from '../structures/Channel';
import Integration from '../structures/Integration';
import type { IntegrationExpireBehavior } from '../structures/Integration';
import Invite from '../structures/Invite';
import type { TargetUserType } from '../structures/Invite';
import Message from '../structures/Message';
import type { JSONEmbed } from '../structures/Message';
import type { JSONAllowedMentions } from '../structures/Message';
import type { JSONPermission, PermissionType } from '../structures/Permission';
import Server, { Ban, Emoji, Role, ServerMember, ServerPreview, ServerWidget, ServerWidgetParams, Template, WidgetStyle } from '../structures/Server';
import type { ExplicitContentFilterLevel, JSONRole, MessageNotificationLevel, VerificationLevel } from '../structures/Server';
import User from '../structures/User';
import Webhook from '../structures/Webhook';
import type { EditPresence } from './EventHandler';
import RequestHandler from './RequestHandler';
import type { FileContents, ImageData } from './RequestHandler';
declare type id = bigint | string | number;
interface JSONGateway {
    url: string;
    shards: number;
    session_start_limit: JSONSessionStartLimit;
}
interface Gateway {
    url: string;
    shards?: number;
    sessionStartLimit?: SessionStartLimit;
}
declare class Gateway extends Base {
    constructor(data: JSONGateway);
}
interface JSONSessionStartLimit {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
}
interface SessionStartLimit {
    total: number;
    remaining: number;
    resetAfter: number;
    maxConcurrency: number;
}
declare class SessionStartLimit extends Base {
    constructor(data: JSONSessionStartLimit);
}
interface ClientOptions {
    token: string;
    properties: ConnectionProperties;
    isCompress?: boolean;
    largeThreshold?: number;
    numShards: number | 'auto';
    presence?: EditPresence;
    isServerSubscriptions?: boolean;
    intents: number;
    defaultImageSize: ImageSize;
    defaultImageFormat: ImageFormat;
    defaultURLs: typeof DefaultURLs;
    defaultEndpoints: typeof DefaultEndpoints;
    userAgent: string;
    isDisableStrict: boolean;
}
interface ConnectionProperties {
    $os: string;
    $browser: string;
    $device: string;
}
interface Client {
    options: ClientOptions;
    handler: RequestHandler;
    startTime: number;
    ping: number;
    user: User;
    servers: Collection<bigint, Server>;
    channels: Collection<bigint, Channel>;
    users: Collection<bigint, User>;
    webhooks: Collection<bigint, Webhook>;
    roles: Collection<bigint, Role>;
    apps: Collection<bigint, App>;
    integration: Collection<bigint, Integration>;
    emojis: Collection<bigint, Emoji>;
    messages: Collection<bigint, Emoji>;
}
declare const DefaultURLs: {
    base: string;
    cdn: string;
    invite: string;
    template: string;
};
declare const DefaultEndpoints: {
    AppAsset: (cdn: string, appID: id, assetID: id, format: ImageFormat) => string;
    AppAchievementIcon: (cdn: string, appID: id, achievementID: id, icon: string, format: ImageFormat) => string;
    AppIcon: (cdn: string, appID: id, icon: string, format: ImageFormat) => string;
    UserAvatar: (cdn: string, userID: id, avatar: string, format: ImageFormat) => string;
    ServerBanner: (cdn: string, serverID: id, banner: string, format: ImageFormat) => string;
    ServerDiscoverySplash: (cdn: string, serverID: id, discoverySplash: string, format: ImageFormat) => string;
    DefaultUserAvatar: (cdn: string, tag: string) => string;
    Emoji: (cdn: string, emojiID: id, format: ImageFormat) => string;
    ServerIcon: (cdn: string, serverID: id, icon: string, format: ImageFormat) => string;
    ServerSplash: (cdn: string, serverID: id, splash: string, format: ImageFormat) => string;
    TeamIcon: (cdn: string, teamID: id, icon: string, format: ImageFormat) => string;
    Channel: (base: string, channelID: id) => string;
    ChannelMessages: (base: string, channelID: id) => string;
    ChannelMessage: (base: string, channelID: id, messageID: id) => string;
    ChannelMessagePublish: (base: string, channelID: id, messageID: id) => string;
    ChannelMessageReactions: (base: string, channelID: id, messageID: id) => string;
    ChannelMessageReaction: (base: string, channelID: id, messageID: id, emoji: string) => string;
    ChannelMessageReactionUser: (base: string, channelID: id, messageID: id, emoji: string, userID: id) => string;
    ChannelMessagesBulk: (base: string, channelID: id) => string;
    ChannelInvites: (base: string, channelID: id) => string;
    ChannelFollowers: (base: string, channelID: id) => string;
    ChannelPermission: (base: string, channelID: id, overwriteID: id) => string;
    ChannelPins: (base: string, channelID: id) => string;
    ChannelPin: (base: string, channelID: id, messageID: id) => string;
    ChannelRecipient: (base: string, channelID: id, userID: id) => string;
    ChannelTyping: (base: string, channelID: id) => string;
    ChannelWebhooks: (base: string, channelID: id) => string;
    Gateway: (base: string) => string;
    GatewayBot: (base: string) => string;
    Servers: (base: string) => string;
    Server: (base: string, serverID: id) => string;
    ServerAuditLog: (base: string, serverID: id) => string;
    ServerBans: (base: string, serverID: id) => string;
    ServerBan: (base: string, serverID: id, userID: id) => string;
    ServerChannels: (base: string, serverID: id) => string;
    ServerEmojis: (base: string, serverID: id) => string;
    ServerEmoji: (base: string, serverID: id, emojiID: id) => string;
    ServerIntegrations: (base: string, serverID: id) => string;
    ServerIntegration: (base: string, serverID: id, integrationID: id) => string;
    ServerIntegrationSync: (base: string, serverID: id, integrationID: id) => string;
    ServerInvites: (base: string, serverID: id) => string;
    ServerMembers: (base: string, serverID: id) => string;
    ServerMember: (base: string, serverID: id, userID: id) => string;
    ServerMemberNick: (base: string, serverID: id, userID: id) => string;
    ServerMemberRole: (base: string, serverID: id, userID: id, roleID: id) => string;
    ServerPreview: (base: string, serverID: id) => string;
    ServerPrune: (base: string, serverID: id) => string;
    ServerRegions: (base: string, serverID: id) => string;
    ServerRoles: (base: string, serverID: id) => string;
    ServerRole: (base: string, serverID: id, roleID: id) => string;
    ServerTemplates: (base: string, serverID: id) => string;
    ServerTemplate: (base: string, serverID: id, templateCode: string) => string;
    ServerInvite: (base: string, serverID: id) => string;
    ServerWebhooks: (base: string, serverID: id) => string;
    ServerWidget: (base: string, serverID: id) => string;
    ServerWidgetParams: (base: string, serverID: id) => string;
    ServerWidgetImage: (base: string, serverID: id) => string;
    Invite: (base: string, inviteCode: string) => string;
    OAuth2App: (base: string, userID: id) => string;
    Template: (base: string, templateCode: string) => string;
    User: (base: string, userID: id) => string;
    UserChannels: (base: string, userID: id) => string;
    UserConnections: (base: string, userID: id) => string;
    UserServers: (base: string, userID: id) => string;
    UserServer: (base: string, userID: id, serverID: id) => string;
    VoiceRegions: (base: string) => string;
    Webhook: (base: string, webhookID: id) => string;
    WebhookToken: (base: string, webhookID: id, webhookToken: string) => string;
    WebhookTokenGitHub: (base: string, webhookID: id, webhookToken: string) => string;
    WebhookTokenSlack: (base: string, webhookID: id, webhookToken: string) => string;
};
declare class Client extends Base {
    constructor(options: PartialObject<ClientOptions>);
    getAppAssetURL(params: {
        appID: id;
        assetID: id;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getAppAchievementIconURL(params: {
        appID: id;
        achievementID: id;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getAppIconURL(params: {
        appID: id;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getUserAvatarURL(params: {
        avatar: string;
        userID: id;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerBannerURL(params: {
        serverID: id;
        banner: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerDiscoverySplashURL(params: {
        serverID: id;
        discoverySplash: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getDefaultUserAvatarURL(params: {
        tag: string;
    }): string;
    getEmojiURL(params: {
        emojiID: id;
        animated: boolean;
        size?: ImageSize;
    }): string;
    getServerIconURL(params: {
        serverID: id;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerSplashURL(params: {
        serverID: id;
        splash: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getTeamIconURL(params: {
        teamID: id;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getChannel(params: {
        channelID: id;
    }): Promise<Channel>;
    editChannel(params: {
        channelID: id;
        name?: string;
        type?: ChannelType['key'];
        position?: number | null;
        topic?: string | null;
        isNSFW?: boolean | null;
        slowmode?: number | null;
        bitrate?: number | null;
        userLimit?: number | null;
        permissions?: JSONPermission[];
        parentID?: id;
        reason?: string;
    }): Promise<Channel>;
    removeChannel(params: {
        channelID: id;
        reason?: string;
    }): Promise<Channel>;
    leaveDMChannel(params: {
        channelID: id;
    }): Promise<Channel>;
    getMessages(params: {
        channelID: id;
        aroundID?: id;
        beforeID?: id;
        afterID?: id;
        limit?: string;
    }): Promise<Collection<unknown, unknown>>;
    addMessage(params: {
        channelID: id;
        content?: string;
        nonce?: string | number;
        isTTS?: boolean;
        embed?: JSONEmbed;
        mentions?: JSONAllowedMentions;
        file?: FileContents | FileContents[];
    }): Promise<Message>;
    getMessage(params: {
        channelID: id;
        messageID: id;
    }): Promise<Message>;
    editMessage(params: {
        channelID: id;
        messageID: id;
        content?: string;
        embed?: JSONEmbed;
        flags?: number;
    }): Promise<Message>;
    removeMessage(params: {
        channelID: id;
        messageID: id;
        reason?: string;
    }): Promise<void>;
    publishMessage(params: {
        channelID: id;
        messageID: id;
    }): Promise<Message>;
    removeReactions(params: {
        channelID: id;
        messageID: id;
        emoji?: string;
        userID?: id;
        isAll?: boolean;
    }): Promise<void>;
    getReactionUsers(params: {
        channelID: id;
        messageID: id;
        emoji: string;
        beforeID: id;
        afterID: id;
        limit: number;
    }): Promise<Collection<unknown, unknown>>;
    addReaction(params: {
        channelID: id;
        messageID: id;
        emoji: string;
        userID?: id;
    }): Promise<void>;
    removeMessages(params: {
        channelID: id;
        messagesID: id[];
        reason?: string;
    }): Promise<void>;
    editChannelPermissions(params: {
        channelID: id;
        overwriteID: id;
        allow?: string;
        deny?: string;
        type?: PermissionType;
        reason?: string;
    }): Promise<void>;
    removeChannelPermission(params: {
        channelID: id;
        overwriteID: id;
        reason?: string;
    }): Promise<void>;
    getChannelInvites(params: {
        channelID: id;
    }): Promise<Collection<unknown, unknown>>;
    addChannelInvite(params: {
        channelID: id;
        maxAge?: number;
        maxUses?: number;
        isTemporary?: boolean;
        isUnique?: boolean;
        targetUserID?: id;
        targetUserType?: TargetUserType['key'];
        reason?: string;
    }): Promise<Invite>;
    followNewsChannel(params: {
        channelID: id;
        webhookChannelID: id;
    }): Promise<FollowedChannel>;
    startTypingIndicator(params: {
        channelID: id;
    }): Promise<void>;
    getPinnedMessages(params: {
        channelID: id;
    }): Promise<Collection<unknown, unknown>>;
    addPinnedMessage(params: {
        channelID: id;
        messageID: id;
        reason?: string;
    }): Promise<void>;
    removePinnedMessage(params: {
        channelID: id;
        messageID: id;
        reason?: string;
    }): Promise<void>;
    addGroupDMUser(params: {
        channelID: id;
        userID: id;
        accessToken: string;
        nick: string;
    }): Promise<void>;
    removeGroupDMUser(params: {
        channelID: id;
        userID: id;
    }): Promise<void>;
    getChannelWebhooks(params: {
        channelID: id;
    }): Promise<Collection<unknown, unknown>>;
    addChannelWebhook(params: {
        channelID: id;
        name: string;
        avatar?: ImageData | null;
        reason?: string;
    }): Promise<Webhook>;
    getGateway(): Promise<Gateway>;
    getGatewayBot(): Promise<Gateway>;
    addServer(params: {
        name: string;
        region?: string;
        icon?: ImageData;
        verificationLevel?: VerificationLevel['key'];
        messageNotifications?: MessageNotificationLevel['key'];
        explicitFilter?: ExplicitContentFilterLevel['key'];
        roles?: JSONRole[];
        channels?: PartialObject<JSONChannel>[];
        afkChannelID?: id;
        afkTimeout?: number;
        systemChannelID?: id;
    }): Promise<Server>;
    getServer(params: {
        serverID: id;
        isWithCounts?: boolean;
    }): Promise<Server>;
    editServer(params: {
        serverID: id;
        name?: string;
        region?: string | null;
        icon?: ImageData | null;
        verificationLevel?: VerificationLevel['key'] | null;
        messageNotifications?: MessageNotificationLevel['key'] | null;
        explicitFilter?: ExplicitContentFilterLevel['key'] | null;
        afkChannelID?: id | null;
        afkTimeout?: number;
        ownerID?: id;
        splash?: ImageData | null;
        banner?: ImageData | null;
        systemChannelID?: id | null;
        rulesChannelID?: id | null;
        publicUpdatesChannelID?: id | null;
        preferredLocale?: DiscordLocales | null;
        reason?: string;
    }): Promise<Server>;
    removeServer(params: {
        serverID: id;
    }): Promise<void>;
    getAuditLog(params: {
        serverID: id;
        userID?: id;
        actionType?: AuditLogEvent['key'];
        beforeID?: id;
        limit?: number;
    }): Promise<AuditLog>;
    getBans(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    getBan(params: {
        serverID: id;
        userID: id;
    }): Promise<Ban>;
    addBan(params: {
        serverID: id;
        userID: id;
        days?: number;
        reason?: string;
    }): Promise<void>;
    removeBan(params: {
        serverID: id;
        userID: id;
        reason?: string;
    }): Promise<void>;
    getServerChannels(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    addServerChannel(params: {
        serverID: id;
        name: string;
        type?: ChannelType['key'];
        topic?: string | null;
        bitrate?: number | null;
        userLimit?: number | null;
        slowmode?: number | null;
        position?: number | null;
        permissions?: JSONPermission[];
        parentID?: id;
        isNSFW?: boolean | null;
        reason: string;
    }): Promise<Channel>;
    editServerChannelPositions(params: {
        serverID: id;
        channelID: id;
        position: number | null;
    }): Promise<void>;
    getEmojis(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    addEmoji(params: {
        serverID: id;
        name: string;
        image: ImageData;
        rolesID?: id[];
        reason?: string;
    }): Promise<Emoji>;
    getEmoji(params: {
        serverID: id;
        emojiID: id;
    }): Promise<Emoji>;
    editEmoji(params: {
        serverID: id;
        emojiID: id;
        name?: string;
        rolesID?: id[] | null;
        reason?: string;
    }): Promise<Emoji>;
    removeEmoji(params: {
        serverID: id;
        emojiID: id;
        reason?: string;
    }): Promise<void>;
    getIntegrations(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    addIntegration(params: {
        serverID: id;
        type: string;
        integrationID: id;
        reason?: string;
    }): Promise<void>;
    editIntegration(params: {
        serverID: id;
        integrationID: id;
        expireBehavior?: IntegrationExpireBehavior['key'] | null;
        expireGracePeriod?: number | null;
        isEmojis?: boolean | null;
        reason?: string;
    }): Promise<void>;
    removeIntegration(params: {
        serverID: id;
        integrationID: id;
        reason?: string;
    }): Promise<void>;
    syncIntegration(params: {
        serverID: id;
        integrationID: id;
    }): Promise<void>;
    getServerInvites(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    getMembers(params: {
        serverID: id;
        afterID?: id;
        limit?: number;
    }): Promise<Collection<unknown, unknown>>;
    getMember(params: {
        serverID: id;
        userID: id;
    }): Promise<ServerMember>;
    addMember(params: {
        serverID: id;
        userID: id;
        accessToken: string;
        nick?: number;
        rolesID?: id[];
        isMute?: boolean;
        isDeaf?: boolean;
    }): Promise<ServerMember>;
    editMember(params: {
        serverID: id;
        userID: id;
        nick?: string;
        rolesID?: id[];
        isMute?: boolean;
        isDeaf?: boolean;
        channelID?: id;
        reason?: string;
    }): Promise<void>;
    removeMember(params: {
        serverID: id;
        userID: id;
        reason?: string;
    }): Promise<void>;
    editUserNick(params: {
        serverID: id;
        userID?: id;
        nick?: string | null;
    }): Promise<void>;
    addMemberRole(params: {
        serverID: id;
        userID: id;
        roleID: id;
        reason?: string;
    }): Promise<void>;
    removeMemberRole(params: {
        serverID: id;
        userID: id;
        roleID: id;
        reason?: string;
    }): Promise<void>;
    getServerPreview(params: {
        serverID: id;
    }): Promise<ServerPreview>;
    getServerPrune(params: {
        serverID: id;
        days?: number;
        includeRolesID?: id[];
    }): Promise<void>;
    startServerPrune(params: {
        serverID: id;
        days?: number;
        computeCount?: boolean;
        includeRolesID?: id[];
        reason?: string;
    }): Promise<void>;
    getServerVoiceRegions(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    getRoles(params: {
        serverID: id;
    }): Promise<Collection<unknown, unknown>>;
    addRole(params: {
        serverID: id;
        name?: string;
        bitPermission?: string;
        colorDec?: number;
        isHoist?: boolean;
        isMentionable?: boolean;
        reason?: string;
    }): Promise<Role>;
    editRolePositions(params: {
        serverID: id;
        roleID: id;
        position?: number | null;
    }): Promise<Collection<unknown, unknown>>;
    editRole(params: {
        serverID: id;
        roleID: id;
        name?: string;
        bitPermission?: string;
        colorDec?: number;
        isHoist?: boolean;
        isMentionable?: boolean;
        reason?: string;
    }): Promise<Role>;
    removeRole(params: {
        serverID: id;
        roleID: id;
        reason?: string;
    }): Promise<void>;
    getServerTemplates(params: {
        serverID: id;
    }): Promise<Collection<string, Template>>;
    addServerTemplate(params: {
        serverID: id;
        name: string;
        description?: string | null;
    }): Promise<Template>;
    editServerTemplate(params: {
        serverID: id;
        templateCode: string;
        name?: string;
        description?: string | null;
    }): Promise<Template>;
    removeServerTemplate(params: {
        serverID: id;
        templateCode: string;
    }): Promise<Template>;
    syncServerTemplate(params: {
        serverID: id;
        templateCode: string;
    }): Promise<Template>;
    getServerInvite(params: {
        serverID: id;
    }): Promise<PartialObject<Invite>>;
    getServerWebhooks(params: {
        serverID: id;
    }): Promise<Collection<bigint, Webhook>>;
    getServerWidget(params: {
        serverID: id;
    }): Promise<ServerWidget>;
    editServerWidget(params: {
        serverID: id;
        options?: string;
    }): Promise<ServerWidget>;
    getServerWidgetParams(params: {
        serverID: id;
    }): Promise<ServerWidgetParams>;
    getServerWidgetImage(params: {
        serverID: id;
        style?: WidgetStyle;
    }): Promise<unknown>;
    getInvite(params: {
        inviteCode: string;
        isWithCounts?: boolean;
    }): Promise<Invite>;
    removeInvite(params: {
        inviteCode: string;
        reason?: string;
    }): Promise<Invite>;
    getOAuth2App(params: {
        userID?: id;
    }): Promise<App>;
    getTemplate(params: {
        templateCode: string;
    }): Promise<Template>;
    addServerFromTemplate(params: {
        templateCode: string;
        name: string;
        icon?: ImageData;
    }): Promise<Server>;
    getUser(params: {
        userID?: id;
    }): Promise<User>;
    editUser(params: {
        userID?: id;
        username?: string;
        avatar?: ImageData;
    }): Promise<User>;
    getDMs(params: {
        userID?: id;
    }): Promise<Collection<bigint, Channel>>;
    addDM(params: {
        userID?: id;
        recipientID: id;
    }): Promise<Channel>;
    addGroupDM(params: {
        userID?: id;
        accessTokens: string[];
        nicks: [[id, string]];
    }): Promise<Channel>;
    getConnections(params: {
        userID?: id;
    }): Promise<Collection<unknown, unknown>>;
    getServers(params: {
        userID?: id;
        beforeID?: id;
        afterID?: id;
        limit?: number;
    }): Promise<Collection<bigint, PartialObject<Server>>>;
    leaveServer(params: {
        serverID: id;
        userID?: id;
    }): Promise<void>;
    getVoiceRegions(): Promise<Collection<unknown, unknown>>;
    getWebhook(params: {
        webhookID: id;
        webhookToken?: string;
    }): Promise<Webhook>;
    editWebhook(params: {
        webhookID: id;
        webhookToken?: string;
        name: string;
        avatar?: ImageData | null;
        channelID?: id;
        reason?: string;
    }): Promise<Webhook>;
    removeWebhook(params: {
        webhookID: id;
        webhookToken?: string;
        reason?: string;
    }): Promise<void>;
    executeWebhook(params: {
        webhookID: id;
        webhookToken: string;
        isSlack?: boolean;
        isGitHub?: boolean;
        isWait?: boolean;
        content?: string;
        username?: string;
        avatarURL?: string;
        isTTS?: boolean;
        embeds?: JSONEmbed[];
        mentions?: JSONAllowedMentions;
        file?: FileContents | FileContents[];
    }): Promise<void>;
}
export default Client;
export type { Gateway };
