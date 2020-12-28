import Base from '../Base';
import Collection from '../Collection';
import type { DiscordLocales, ImageFormat, ImageSize, PartialObject } from '../Types';
import Application from '../structures/Application';
import AuditLog from '../structures/AuditLog';
import type { AuditLogEvent } from '../structures/AuditLog';
import Channel, { FollowedChannel } from '../structures/Channel';
import Invite from '../structures/Invite';
import Message, { AllowedMentions, JSONEmbed } from '../structures/Message';
import type Permission from '../structures/Permission';
import Server, { Ban, Emoji, Role, ServerMember, ServerPreview, ServerWidget, Template, WidgetStyle } from '../structures/Server';
import User from '../structures/User';
import Webhook from '../structures/Webhook';
import RequestHandler from './RequestHandler';
import type { StatusUpdate } from './EventHandler';
import type { FileContents } from './RequestHandler';
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
    shard: number | 'auto';
    presence?: StatusUpdate;
    isServerSubscriptions?: boolean;
    intents: number;
    defaultImageSize: ImageSize;
    defaultImageFormat: ImageFormat;
    defaultURLs: DefaultURLs;
    defaultEndpoints: DefaultEndpoints;
    userAgent: string;
    isDisableStrict: boolean;
}
interface ConnectionProperties {
    $os: string;
    $browser: string;
    $device: string;
}
interface DefaultURLs {
    base: string;
    cdn: string;
    invite: string;
    template: string;
}
interface DefaultEndpoints {
    CDNCustomEmoji(id: string, format: ImageFormat): string;
    CDNServerIcon(id: string, icon: string, format: ImageFormat): string;
    CDNServerSplash(id: string, splash: string, format: ImageFormat): string;
    CDNServerDiscoverySplash(id: string, discoverySplash: string, format: ImageFormat): string;
    CDNServerBanner(id: string, banner: string, format: ImageFormat): string;
    CDNUserAvatarDefault(tag: string): string;
    CDNUserAvatar(id: string, avatar: string, format: ImageFormat): string;
    CDNApplicationIcon(appID: string, icon: string, format: ImageFormat): string;
    CDNApplicationAsset(appID: string, id: string, format: ImageFormat): string;
    CDNAchievementIcon(appID: string, id: string, icon: string, format: ImageFormat): string;
    CDNTeamIcon(id: string, icon: string, format: ImageFormat): string;
    Gateway(): string;
    GatewayBot(): string;
    ServerAuditLog(serverID: string): string;
}
interface Client {
    options: ClientOptions;
    handler: RequestHandler;
    startTime: number;
    ping: number;
    user: User;
    servers: Collection<bigint, Server>;
    channels: Collection<bigint, Channel>;
}
declare class Client extends Base {
    constructor(options: PartialObject<ClientOptions>);
    getCustomEmojiURL(params: {
        id: string;
        animated: boolean;
        size?: ImageSize;
    }): string;
    getServerIconURL(params: {
        id: string;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerSplashURL(params: {
        id: string;
        splash: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerDiscoverySplashURL(params: {
        id: string;
        discoverySplash: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getServerBannerURL(params: {
        id: string;
        banner: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getUserAvatarDefaultURL(params: {
        tag: string;
    }): string;
    getUserAvatarURL(params: {
        avatar: string;
        id: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getApplicationIconURL(params: {
        appID: string;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getApplicationAssetURL(params: {
        appID: string;
        id: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getAchievementIconURL(params: {
        appID: string;
        id: string;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getTeamIconURL(params: {
        id: string;
        icon: string;
        format?: ImageFormat;
        size?: ImageSize;
    }): string;
    getGateway(): Promise<Gateway>;
    getGatewayBot(): Promise<Gateway>;
    getApplicationInformation(options: {
        userID?: string;
    }): Promise<Application>;
    getAuditLog(params: {
        serverID: string;
        userID?: string;
        actionType?: AuditLogEvent['key'];
        before?: string;
        limit?: number;
    }): Promise<AuditLog>;
    getChannel(params: {
        channelID: string;
    }): Promise<Channel>;
    updateChannel(options: {
        channelID: string;
        options: {
            name?: string;
            type?: number;
            position?: number | null;
            topic?: string | null;
            nsfw?: boolean | null;
            rateLimitPerUser?: number | null;
            bitrate?: number | null;
            userLimit?: number | null;
            permissionOverwrites?: Permission[];
            parentID?: string;
        };
        reason?: string;
    }): Promise<Channel>;
    deleteServerChannel(options: {
        channelID: string;
        reason?: string;
    }): Promise<Channel>;
    closeDMChannel(options: {
        channelID: string;
    }): Promise<Channel>;
    getMessages(options: {
        channelID: string;
        options: {
            around?: string;
            before?: string;
            after?: string;
            limit?: string;
        };
    }): Promise<Collection<unknown, unknown>>;
    getMessage(options: {
        channelID: string;
        messageID: string;
    }): Promise<Message>;
    createMessage(options: {
        channelID: string;
        options: {
            content?: string;
            nonce?: string | number;
            tts?: boolean;
            embed?: JSONEmbed;
            payloadJSON?: string;
            allowedMentions?: AllowedMentions;
            file?: FileContents | FileContents[];
        };
    }): Promise<Message>;
    crosspostMessage(options: {
        channelID: string;
        messageID: string;
    }): Promise<Message>;
    createReaction(options: {
        channelID: string;
        messageID: string;
        userID?: string;
        emoji: string;
    }): Promise<void>;
    deleteReaction(options: {
        channelID: string;
        messageID: string;
        emoji?: string;
        userID?: string;
        all?: boolean;
    }): Promise<void>;
    getReactions(options: {
        channelID: string;
        messageID: string;
        emoji: string;
        options: {
            before: string;
            after: string;
            limit: number;
        };
    }): Promise<Collection<unknown, unknown>>;
    updateMessage(options: {
        channelID: string;
        messageID: string;
        options: {
            content?: string;
            embed?: JSONEmbed;
            flags?: number;
        };
    }): Promise<Message>;
    deleteMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    deleteBulkMessages(options: {
        channelID: string;
        options: {
            messages: string[];
        };
        reason?: string;
    }): Promise<void>;
    updateChannelPermissions(options: {
        channelID: string;
        overwriteID: string;
        options: {
            allow?: string;
            deny?: string;
            type?: number;
        };
        reason?: string;
    }): Promise<void>;
    getChannelInvites(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    createChannelInvite(options: {
        channelID: string;
        options: {
            maxAge?: number;
            maxUses?: number;
            temporary?: boolean;
            unique?: boolean;
            targetUser?: string;
            targetUserType?: number;
        };
        reason?: string;
    }): Promise<Invite>;
    deleteChannelPermission(options: {
        channelID: string;
        overwriteID: string;
        reason?: string;
    }): Promise<void>;
    followNewsChannel(options: {
        channelID: string;
        options: {
            webhookChannelID: string;
        };
    }): Promise<FollowedChannel>;
    triggerTypingIndicator(options: {
        channelID: string;
    }): Promise<void>;
    getPinnedMessages(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    createPinnedChannelMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    deletePinnedChannelMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    createGroupDMRecipient(options: {
        channelID: string;
        userID: string;
        options: {
            accessToken: string;
            nick: string;
        };
    }): Promise<void>;
    deleteGroupDMRecipient(options: {
        channelID: string;
        userID: string;
    }): Promise<void>;
    getServerEmojis(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    getServerEmoji(options: {
        serverID: string;
        emojiID: string;
    }): Promise<Emoji>;
    createServerEmoji(options: {
        serverID: string;
        options: {
            name: string;
            image: string;
            roles?: string[];
        };
        reason?: string;
    }): Promise<Emoji>;
    updateServerEmoji(options: {
        serverID: string;
        emojiID: string;
        options: {
            name?: string;
            image?: string;
        };
        reason?: string;
    }): Promise<Emoji>;
    deleteServerEmoji(options: {
        serverID: string;
        emojiID: string;
        reason?: string;
    }): Promise<void>;
    createServer(options: {
        options: {
            name: string;
            region?: string;
            icon?: string;
            verificationLevel?: number;
            defaultMessageNotifications?: number;
            explicitContentFilter?: number;
            roles?: Role[];
            channels?: PartialObject<Channel>[];
            afkChannelID?: string;
            afkTimeout?: number;
            systemChannelID?: string;
        };
    }): Promise<Server>;
    getServer(options: {
        serverID: string;
        options: {
            withCounts?: boolean;
        };
    }): Promise<Server>;
    getServerPreview(options: {
        serverID: string;
    }): Promise<ServerPreview>;
    updateServer(options: {
        serverID: string;
        options: {
            name?: string;
            region?: string | null;
            icon?: string | null;
            verificationLevel?: number | null;
            defaultMessageNotifications?: number | null;
            explicitContentFilter?: number | null;
            afkChannelID?: string | null;
            afkTimeout?: number;
            ownerID?: string;
            splash?: string | null;
            banner?: string | null;
            systemChannelID?: string | null;
            rulesChannelID?: string | null;
            publicUpdatesChannelID?: string | null;
            preferredLocale?: DiscordLocales | null;
        };
        reason?: string;
    }): Promise<Server>;
    deleteServer(options: {
        serverID: string;
    }): Promise<void>;
    getServerChannels(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    createServerChannel(options: {
        serverID: string;
        options: {
            name: string;
            type?: number;
            position?: number | null;
            topic?: string | null;
            nsfw?: boolean | null;
            rateLimitPerUser?: number | null;
            bitrate?: number | null;
            userLimit?: number | null;
            permissionOverwrites?: Permission[];
            parentID?: string;
        };
        reason: string;
    }): Promise<Channel>;
    updateServerChannelPositions(options: {
        serverID: string;
        options: {
            id: string;
            position: number | null;
        };
    }): Promise<void>;
    getServerMember(options: {
        serverID: string;
        userID: string;
    }): Promise<ServerMember>;
    getServerMembers(options: {
        serverID: string;
        options: {
            after?: string;
            limit?: number;
        };
    }): Promise<Collection<unknown, unknown>>;
    createServerMember(options: {
        serverID: string;
        userID: string;
        options: {
            accessToken: string;
            nick?: number;
            roles?: string[];
            mute?: boolean;
            deaf?: boolean;
        };
    }): Promise<ServerMember>;
    updateServerMember(options: {
        serverID: string;
        userID: string;
        options: {
            nick?: number;
            roles?: string[];
            mute?: boolean;
            deaf?: boolean;
            channelID?: string;
        };
        reason?: string;
    }): Promise<void>;
    updateUserNick(options: {
        serverID: string;
        userID?: string;
        options: {
            nick?: string | null;
        };
    }): Promise<void>;
    createServerMemberRole(options: {
        serverID: string;
        userID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    deleteServerMemberRole(options: {
        serverID: string;
        userID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    deleteServerMember(options: {
        serverID: string;
        userID: string;
        reason?: string;
    }): Promise<void>;
    getServerBans(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    getServerBan(options: {
        serverID: string;
        userID: string;
    }): Promise<Ban>;
    createServerBan(options: {
        serverID: string;
        userID: string;
        options: {
            deleteMessageDays?: number;
            reason?: string;
        };
    }): Promise<void>;
    deleteServerBan(options: {
        serverID: string;
        userID: string;
        reason?: string;
    }): Promise<void>;
    getServerRoles(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    createServerRole(options: {
        serverID: string;
        options: {
            name?: string;
            permissions?: string;
            color?: number;
            hoist?: boolean;
            mentionable?: boolean;
        };
        reason?: string;
    }): Promise<Role>;
    updateServerRolePositions(options: {
        serverID: string;
        options: {
            id: string;
            position?: number | null;
        };
    }): Promise<Collection<unknown, unknown>>;
    updateServerRole(options: {
        serverID: string;
        roleID: string;
        options: {
            name?: string;
            permissions?: string;
            color?: number;
            hoist?: boolean;
            mentionable?: boolean;
        };
        reason?: string;
    }): Promise<Role>;
    deleteServerRole(options: {
        serverID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    getServerPruneCount(options: {
        serverID: string;
        options: {
            days?: number;
            includeRoles?: string[];
        };
    }): Promise<void>;
    beginServerPrune(options: {
        serverID: string;
        options: {
            days?: number;
            computePruneCount?: boolean;
            includeRoles?: string[];
        };
        reason?: string;
    }): Promise<void>;
    getServerVoiceRegions(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    getServerInvites(options: {
        serverID: string;
    }): Promise<Collection<unknown, unknown>>;
    getServerIntegrations(options: {
        serverID: string;
        options: {
            includeApplications?: boolean;
        };
    }): Promise<Collection<unknown, unknown>>;
    createServerIntegration(options: {
        serverID: string;
        options: {
            type: string;
            id: string;
        };
        reason?: string;
    }): Promise<void>;
    updateServerIntegration(options: {
        serverID: string;
        integrationID: string;
        options: {
            expireBehavior?: number;
            expireGracePeriod?: number;
            enableEmoticons?: boolean;
        };
        reason?: string;
    }): Promise<void>;
    deleteServerIntegration(options: {
        serverID: string;
        integrationID: string;
        reason?: string;
    }): Promise<void>;
    syncServerIntegration(options: {
        serverID: string;
        integrationID: string;
    }): Promise<void>;
    getServerWidgetSettings(options: {
        serverID: string;
    }): Promise<ServerWidget>;
    updateServerWidget(options: {
        serverID: string;
        options?: string;
    }): Promise<ServerWidget>;
    getServerWidget(options: {
        serverID: string;
    }): Promise<void>;
    getServerVanityURL(options: {
        serverID: string;
    }): Promise<PartialObject<Invite>>;
    getServerWidgetImage(options: {
        serverID: string;
        options: {
            style?: WidgetStyle;
        };
    }): Promise<unknown>;
    getInvite(options: {
        inviteCode: string;
        options: {
            withCounts?: boolean;
        };
    }): Promise<Invite>;
    deleteInvite(options: {
        inviteCode: string;
        reason?: string;
    }): Promise<Invite>;
    getTemplate(options: {
        templateCode: string;
    }): Promise<Template>;
    createServerFromTemplate(options: {
        templateCode: string;
        options: {
            name: string;
            icon?: string;
        };
    }): Promise<Server>;
    getVoiceRegions(): Promise<Collection<unknown, unknown>>;
    getUser(options: {
        userID?: string;
    }): Promise<User>;
    updateUser(options: {
        userID?: bigint;
        options: {
            username?: string;
            avatar?: string;
        };
    }): Promise<User>;
    getServers(options: {
        userID?: string;
        options: {
            before?: string;
            after?: string;
            limit?: number;
        };
    }): Promise<Collection<bigint, PartialObject<Server>>>;
    leaveServer(options: {
        serverID: string;
        userID?: string;
    }): Promise<void>;
    getDMs(options: {
        userID?: string;
    }): Promise<Collection<bigint, Channel>>;
    createDM(options: {
        userID?: string;
        options: {
            recipientID: string;
        };
    }): Promise<Channel>;
    createGroupDM(options: {
        userID?: string;
        options: {
            accessTokens: string[];
            nicks: [[string, string]];
        };
    }): Promise<Channel>;
    getConnections(options: {
        userID?: string;
    }): Promise<Collection<unknown, unknown>>;
    createChannelWebhook(options: {
        channelID: string;
        options: {
            name: string;
            avatar?: string | null;
        };
        reason?: string;
    }): Promise<Webhook>;
    getChannelWebhooks(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    getServerWebhooks(options: {
        serverID: string;
    }): Promise<Collection<bigint, Webhook>>;
    getWebhook(options: {
        webhookID: string;
        webhookToken?: string;
    }): Promise<Webhook>;
    updateWebhook(options: {
        webhookID: string;
        webhookToken?: string;
        options: {
            name: string;
            avatar?: string | null;
            channelID?: string;
        };
        reason?: string;
    }): Promise<Webhook>;
    deleteWebhook(options: {
        webhookID: string;
        webhookToken?: string;
        reason?: string;
    }): Promise<void>;
    executeWebhook(options: {
        webhookID: string;
        webhookToken: string;
        slack?: string;
        github?: string;
        options: {
            wait?: boolean;
            content?: string;
            username?: string;
            avatarURL?: string;
            tts?: boolean;
            embeds?: JSONEmbed[];
            payloadJSON?: string;
            allowedMentions?: AllowedMentions;
            file?: FileContents | FileContents[];
        };
    }): Promise<void>;
}
export default Client;
export type { Gateway };
