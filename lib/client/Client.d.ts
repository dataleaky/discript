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
import Server, { Ban, Emoji, MembershipScreening, Role, ServerMember, ServerPreview, ServerWidget, ServerWidgetParams, Template, WidgetStyle } from '../structures/Server';
import type { ExplicitContentFilterLevel, JSONMembershipScreeningField, JSONRole, MessageNotificationLevel, VerificationLevel } from '../structures/Server';
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
    AppAsset: (cdn: string, appID: id, assetID: id, format: ImageFormat) => `${string}/app-assets/${string}/${string}.jpg` | `${string}/app-assets/${string}/${string}.jpeg` | `${string}/app-assets/${string}/${string}.png` | `${string}/app-assets/${string}/${string}.webp` | `${string}/app-assets/${string}/${string}.gif` | `${string}/app-assets/${string}/${string}.auto` | `${string}/app-assets/${string}/${number}.jpg` | `${string}/app-assets/${string}/${number}.jpeg` | `${string}/app-assets/${string}/${number}.png` | `${string}/app-assets/${string}/${number}.webp` | `${string}/app-assets/${string}/${number}.gif` | `${string}/app-assets/${string}/${number}.auto` | `${string}/app-assets/${string}/${bigint}.jpg` | `${string}/app-assets/${string}/${bigint}.jpeg` | `${string}/app-assets/${string}/${bigint}.png` | `${string}/app-assets/${string}/${bigint}.webp` | `${string}/app-assets/${string}/${bigint}.gif` | `${string}/app-assets/${string}/${bigint}.auto` | `${string}/app-assets/${number}/${string}.jpg` | `${string}/app-assets/${number}/${string}.jpeg` | `${string}/app-assets/${number}/${string}.png` | `${string}/app-assets/${number}/${string}.webp` | `${string}/app-assets/${number}/${string}.gif` | `${string}/app-assets/${number}/${string}.auto` | `${string}/app-assets/${number}/${number}.jpg` | `${string}/app-assets/${number}/${number}.jpeg` | `${string}/app-assets/${number}/${number}.png` | `${string}/app-assets/${number}/${number}.webp` | `${string}/app-assets/${number}/${number}.gif` | `${string}/app-assets/${number}/${number}.auto` | `${string}/app-assets/${number}/${bigint}.jpg` | `${string}/app-assets/${number}/${bigint}.jpeg` | `${string}/app-assets/${number}/${bigint}.png` | `${string}/app-assets/${number}/${bigint}.webp` | `${string}/app-assets/${number}/${bigint}.gif` | `${string}/app-assets/${number}/${bigint}.auto` | `${string}/app-assets/${bigint}/${string}.jpg` | `${string}/app-assets/${bigint}/${string}.jpeg` | `${string}/app-assets/${bigint}/${string}.png` | `${string}/app-assets/${bigint}/${string}.webp` | `${string}/app-assets/${bigint}/${string}.gif` | `${string}/app-assets/${bigint}/${string}.auto` | `${string}/app-assets/${bigint}/${number}.jpg` | `${string}/app-assets/${bigint}/${number}.jpeg` | `${string}/app-assets/${bigint}/${number}.png` | `${string}/app-assets/${bigint}/${number}.webp` | `${string}/app-assets/${bigint}/${number}.gif` | `${string}/app-assets/${bigint}/${number}.auto` | `${string}/app-assets/${bigint}/${bigint}.jpg` | `${string}/app-assets/${bigint}/${bigint}.jpeg` | `${string}/app-assets/${bigint}/${bigint}.png` | `${string}/app-assets/${bigint}/${bigint}.webp` | `${string}/app-assets/${bigint}/${bigint}.gif` | `${string}/app-assets/${bigint}/${bigint}.auto`;
    AppAchievementIcon: (cdn: string, appID: id, achievementID: id, icon: string, format: ImageFormat) => `${string}/app-assets/${string}/achievements/${string}/icons/${string}.jpg` | `${string}/app-assets/${string}/achievements/${string}/icons/${string}.jpeg` | `${string}/app-assets/${string}/achievements/${string}/icons/${string}.png` | `${string}/app-assets/${string}/achievements/${string}/icons/${string}.webp` | `${string}/app-assets/${string}/achievements/${string}/icons/${string}.gif` | `${string}/app-assets/${string}/achievements/${string}/icons/${string}.auto` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.jpg` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.jpeg` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.png` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.webp` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.gif` | `${string}/app-assets/${string}/achievements/${number}/icons/${string}.auto` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.jpg` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.jpeg` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.png` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.webp` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.gif` | `${string}/app-assets/${string}/achievements/${bigint}/icons/${string}.auto` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.jpg` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.jpeg` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.png` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.webp` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.gif` | `${string}/app-assets/${number}/achievements/${string}/icons/${string}.auto` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.jpg` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.jpeg` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.png` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.webp` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.gif` | `${string}/app-assets/${number}/achievements/${number}/icons/${string}.auto` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.jpg` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.jpeg` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.png` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.webp` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.gif` | `${string}/app-assets/${number}/achievements/${bigint}/icons/${string}.auto` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.jpg` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.jpeg` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.png` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.webp` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.gif` | `${string}/app-assets/${bigint}/achievements/${string}/icons/${string}.auto` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.jpg` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.jpeg` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.png` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.webp` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.gif` | `${string}/app-assets/${bigint}/achievements/${number}/icons/${string}.auto` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.jpg` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.jpeg` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.png` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.webp` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.gif` | `${string}/app-assets/${bigint}/achievements/${bigint}/icons/${string}.auto`;
    AppIcon: (cdn: string, appID: id, icon: string, format: ImageFormat) => `${string}/app-icons/${string}/${string}.jpg` | `${string}/app-icons/${string}/${string}.jpeg` | `${string}/app-icons/${string}/${string}.png` | `${string}/app-icons/${string}/${string}.webp` | `${string}/app-icons/${string}/${string}.gif` | `${string}/app-icons/${string}/${string}.auto` | `${string}/app-icons/${number}/${string}.jpg` | `${string}/app-icons/${number}/${string}.jpeg` | `${string}/app-icons/${number}/${string}.png` | `${string}/app-icons/${number}/${string}.webp` | `${string}/app-icons/${number}/${string}.gif` | `${string}/app-icons/${number}/${string}.auto` | `${string}/app-icons/${bigint}/${string}.jpg` | `${string}/app-icons/${bigint}/${string}.jpeg` | `${string}/app-icons/${bigint}/${string}.png` | `${string}/app-icons/${bigint}/${string}.webp` | `${string}/app-icons/${bigint}/${string}.gif` | `${string}/app-icons/${bigint}/${string}.auto`;
    UserAvatar: (cdn: string, userID: id, avatar: string, format: ImageFormat) => `${string}/avatars/${string}/${string}.jpg` | `${string}/avatars/${string}/${string}.jpeg` | `${string}/avatars/${string}/${string}.png` | `${string}/avatars/${string}/${string}.webp` | `${string}/avatars/${string}/${string}.gif` | `${string}/avatars/${string}/${string}.auto` | `${string}/avatars/${number}/${string}.jpg` | `${string}/avatars/${number}/${string}.jpeg` | `${string}/avatars/${number}/${string}.png` | `${string}/avatars/${number}/${string}.webp` | `${string}/avatars/${number}/${string}.gif` | `${string}/avatars/${number}/${string}.auto` | `${string}/avatars/${bigint}/${string}.jpg` | `${string}/avatars/${bigint}/${string}.jpeg` | `${string}/avatars/${bigint}/${string}.png` | `${string}/avatars/${bigint}/${string}.webp` | `${string}/avatars/${bigint}/${string}.gif` | `${string}/avatars/${bigint}/${string}.auto`;
    ServerBanner: (cdn: string, serverID: id, banner: string, format: ImageFormat) => `${string}/banners/${string}/${string}.jpg` | `${string}/banners/${string}/${string}.jpeg` | `${string}/banners/${string}/${string}.png` | `${string}/banners/${string}/${string}.webp` | `${string}/banners/${string}/${string}.gif` | `${string}/banners/${string}/${string}.auto` | `${string}/banners/${number}/${string}.jpg` | `${string}/banners/${number}/${string}.jpeg` | `${string}/banners/${number}/${string}.png` | `${string}/banners/${number}/${string}.webp` | `${string}/banners/${number}/${string}.gif` | `${string}/banners/${number}/${string}.auto` | `${string}/banners/${bigint}/${string}.jpg` | `${string}/banners/${bigint}/${string}.jpeg` | `${string}/banners/${bigint}/${string}.png` | `${string}/banners/${bigint}/${string}.webp` | `${string}/banners/${bigint}/${string}.gif` | `${string}/banners/${bigint}/${string}.auto`;
    ServerDiscoverySplash: (cdn: string, serverID: id, discoverySplash: string, format: ImageFormat) => `${string}/discovery-splashes/${string}/${string}.jpg` | `${string}/discovery-splashes/${string}/${string}.jpeg` | `${string}/discovery-splashes/${string}/${string}.png` | `${string}/discovery-splashes/${string}/${string}.webp` | `${string}/discovery-splashes/${string}/${string}.gif` | `${string}/discovery-splashes/${string}/${string}.auto` | `${string}/discovery-splashes/${number}/${string}.jpg` | `${string}/discovery-splashes/${number}/${string}.jpeg` | `${string}/discovery-splashes/${number}/${string}.png` | `${string}/discovery-splashes/${number}/${string}.webp` | `${string}/discovery-splashes/${number}/${string}.gif` | `${string}/discovery-splashes/${number}/${string}.auto` | `${string}/discovery-splashes/${bigint}/${string}.jpg` | `${string}/discovery-splashes/${bigint}/${string}.jpeg` | `${string}/discovery-splashes/${bigint}/${string}.png` | `${string}/discovery-splashes/${bigint}/${string}.webp` | `${string}/discovery-splashes/${bigint}/${string}.gif` | `${string}/discovery-splashes/${bigint}/${string}.auto`;
    DefaultUserAvatar: (cdn: string, tag: string) => `${string}/embed/avatars/${string}.png`;
    Emoji: (cdn: string, emojiID: id, format: ImageFormat) => `${string}/emojis/${string}.jpg` | `${string}/emojis/${string}.jpeg` | `${string}/emojis/${string}.png` | `${string}/emojis/${string}.webp` | `${string}/emojis/${string}.gif` | `${string}/emojis/${string}.auto` | `${string}/emojis/${number}.jpg` | `${string}/emojis/${number}.jpeg` | `${string}/emojis/${number}.png` | `${string}/emojis/${number}.webp` | `${string}/emojis/${number}.gif` | `${string}/emojis/${number}.auto` | `${string}/emojis/${bigint}.jpg` | `${string}/emojis/${bigint}.jpeg` | `${string}/emojis/${bigint}.png` | `${string}/emojis/${bigint}.webp` | `${string}/emojis/${bigint}.gif` | `${string}/emojis/${bigint}.auto`;
    ServerIcon: (cdn: string, serverID: id, icon: string, format: ImageFormat) => `${string}/icons/${string}/${string}.jpg` | `${string}/icons/${string}/${string}.jpeg` | `${string}/icons/${string}/${string}.png` | `${string}/icons/${string}/${string}.webp` | `${string}/icons/${string}/${string}.gif` | `${string}/icons/${string}/${string}.auto` | `${string}/icons/${number}/${string}.jpg` | `${string}/icons/${number}/${string}.jpeg` | `${string}/icons/${number}/${string}.png` | `${string}/icons/${number}/${string}.webp` | `${string}/icons/${number}/${string}.gif` | `${string}/icons/${number}/${string}.auto` | `${string}/icons/${bigint}/${string}.jpg` | `${string}/icons/${bigint}/${string}.jpeg` | `${string}/icons/${bigint}/${string}.png` | `${string}/icons/${bigint}/${string}.webp` | `${string}/icons/${bigint}/${string}.gif` | `${string}/icons/${bigint}/${string}.auto`;
    ServerSplash: (cdn: string, serverID: id, splash: string, format: ImageFormat) => `${string}/splashes/${string}/${string}.jpg` | `${string}/splashes/${string}/${string}.jpeg` | `${string}/splashes/${string}/${string}.png` | `${string}/splashes/${string}/${string}.webp` | `${string}/splashes/${string}/${string}.gif` | `${string}/splashes/${string}/${string}.auto` | `${string}/splashes/${number}/${string}.jpg` | `${string}/splashes/${number}/${string}.jpeg` | `${string}/splashes/${number}/${string}.png` | `${string}/splashes/${number}/${string}.webp` | `${string}/splashes/${number}/${string}.gif` | `${string}/splashes/${number}/${string}.auto` | `${string}/splashes/${bigint}/${string}.jpg` | `${string}/splashes/${bigint}/${string}.jpeg` | `${string}/splashes/${bigint}/${string}.png` | `${string}/splashes/${bigint}/${string}.webp` | `${string}/splashes/${bigint}/${string}.gif` | `${string}/splashes/${bigint}/${string}.auto`;
    TeamIcon: (cdn: string, teamID: id, icon: string, format: ImageFormat) => `${string}/team-icons/${string}/${string}.jpg` | `${string}/team-icons/${string}/${string}.jpeg` | `${string}/team-icons/${string}/${string}.png` | `${string}/team-icons/${string}/${string}.webp` | `${string}/team-icons/${string}/${string}.gif` | `${string}/team-icons/${string}/${string}.auto` | `${string}/team-icons/${number}/${string}.jpg` | `${string}/team-icons/${number}/${string}.jpeg` | `${string}/team-icons/${number}/${string}.png` | `${string}/team-icons/${number}/${string}.webp` | `${string}/team-icons/${number}/${string}.gif` | `${string}/team-icons/${number}/${string}.auto` | `${string}/team-icons/${bigint}/${string}.jpg` | `${string}/team-icons/${bigint}/${string}.jpeg` | `${string}/team-icons/${bigint}/${string}.png` | `${string}/team-icons/${bigint}/${string}.webp` | `${string}/team-icons/${bigint}/${string}.gif` | `${string}/team-icons/${bigint}/${string}.auto`;
    Channel: (base: string, channelID: id) => `${string}/channels/${string}` | `${string}/channels/${number}` | `${string}/channels/${bigint}`;
    ChannelMessages: (base: string, channelID: id) => `${string}/channels/${string}/messages` | `${string}/channels/${number}/messages` | `${string}/channels/${bigint}/messages`;
    ChannelMessage: (base: string, channelID: id, messageID: id) => `${string}/channels/${string}/messages/${string}` | `${string}/channels/${string}/messages/${number}` | `${string}/channels/${string}/messages/${bigint}` | `${string}/channels/${number}/messages/${string}` | `${string}/channels/${number}/messages/${number}` | `${string}/channels/${number}/messages/${bigint}` | `${string}/channels/${bigint}/messages/${string}` | `${string}/channels/${bigint}/messages/${number}` | `${string}/channels/${bigint}/messages/${bigint}`;
    ChannelMessagePublish: (base: string, channelID: id, messageID: id) => `${string}/channels/${string}/messages/${string}/crosspost` | `${string}/channels/${string}/messages/${number}/crosspost` | `${string}/channels/${string}/messages/${bigint}/crosspost` | `${string}/channels/${number}/messages/${string}/crosspost` | `${string}/channels/${number}/messages/${number}/crosspost` | `${string}/channels/${number}/messages/${bigint}/crosspost` | `${string}/channels/${bigint}/messages/${string}/crosspost` | `${string}/channels/${bigint}/messages/${number}/crosspost` | `${string}/channels/${bigint}/messages/${bigint}/crosspost`;
    ChannelMessageReactions: (base: string, channelID: id, messageID: id) => `${string}/channels/${string}/messages/${string}/reactions` | `${string}/channels/${string}/messages/${number}/reactions` | `${string}/channels/${string}/messages/${bigint}/reactions` | `${string}/channels/${number}/messages/${string}/reactions` | `${string}/channels/${number}/messages/${number}/reactions` | `${string}/channels/${number}/messages/${bigint}/reactions` | `${string}/channels/${bigint}/messages/${string}/reactions` | `${string}/channels/${bigint}/messages/${number}/reactions` | `${string}/channels/${bigint}/messages/${bigint}/reactions`;
    ChannelMessageReaction: (base: string, channelID: id, messageID: id, emoji: string) => `${string}/channels/${string}/messages/${string}/reactions/${string}` | `${string}/channels/${string}/messages/${number}/reactions/${string}` | `${string}/channels/${string}/messages/${bigint}/reactions/${string}` | `${string}/channels/${number}/messages/${string}/reactions/${string}` | `${string}/channels/${number}/messages/${number}/reactions/${string}` | `${string}/channels/${number}/messages/${bigint}/reactions/${string}` | `${string}/channels/${bigint}/messages/${string}/reactions/${string}` | `${string}/channels/${bigint}/messages/${number}/reactions/${string}` | `${string}/channels/${bigint}/messages/${bigint}/reactions/${string}`;
    ChannelMessageReactionUser: (base: string, channelID: id, messageID: id, emoji: string, userID: id) => `${string}/channels/${string}/messages/${string}/reactions/${string}/${string}` | `${string}/channels/${string}/messages/${string}/reactions/${string}/${number}` | `${string}/channels/${string}/messages/${string}/reactions/${string}/${bigint}` | `${string}/channels/${string}/messages/${number}/reactions/${string}/${string}` | `${string}/channels/${string}/messages/${number}/reactions/${string}/${number}` | `${string}/channels/${string}/messages/${number}/reactions/${string}/${bigint}` | `${string}/channels/${string}/messages/${bigint}/reactions/${string}/${string}` | `${string}/channels/${string}/messages/${bigint}/reactions/${string}/${number}` | `${string}/channels/${string}/messages/${bigint}/reactions/${string}/${bigint}` | `${string}/channels/${number}/messages/${string}/reactions/${string}/${string}` | `${string}/channels/${number}/messages/${string}/reactions/${string}/${number}` | `${string}/channels/${number}/messages/${string}/reactions/${string}/${bigint}` | `${string}/channels/${number}/messages/${number}/reactions/${string}/${string}` | `${string}/channels/${number}/messages/${number}/reactions/${string}/${number}` | `${string}/channels/${number}/messages/${number}/reactions/${string}/${bigint}` | `${string}/channels/${number}/messages/${bigint}/reactions/${string}/${string}` | `${string}/channels/${number}/messages/${bigint}/reactions/${string}/${number}` | `${string}/channels/${number}/messages/${bigint}/reactions/${string}/${bigint}` | `${string}/channels/${bigint}/messages/${string}/reactions/${string}/${string}` | `${string}/channels/${bigint}/messages/${string}/reactions/${string}/${number}` | `${string}/channels/${bigint}/messages/${string}/reactions/${string}/${bigint}` | `${string}/channels/${bigint}/messages/${number}/reactions/${string}/${string}` | `${string}/channels/${bigint}/messages/${number}/reactions/${string}/${number}` | `${string}/channels/${bigint}/messages/${number}/reactions/${string}/${bigint}` | `${string}/channels/${bigint}/messages/${bigint}/reactions/${string}/${string}` | `${string}/channels/${bigint}/messages/${bigint}/reactions/${string}/${number}` | `${string}/channels/${bigint}/messages/${bigint}/reactions/${string}/${bigint}`;
    ChannelMessagesBulk: (base: string, channelID: id) => `${string}/channels/${string}/messages/bulk-delete` | `${string}/channels/${number}/messages/bulk-delete` | `${string}/channels/${bigint}/messages/bulk-delete`;
    ChannelInvites: (base: string, channelID: id) => `${string}/channels/${string}/invites` | `${string}/channels/${number}/invites` | `${string}/channels/${bigint}/invites`;
    ChannelFollowers: (base: string, channelID: id) => `${string}/channels/${string}/followers` | `${string}/channels/${number}/followers` | `${string}/channels/${bigint}/followers`;
    ChannelPermission: (base: string, channelID: id, overwriteID: id) => `${string}/channels/${string}/permissions/${string}` | `${string}/channels/${string}/permissions/${number}` | `${string}/channels/${string}/permissions/${bigint}` | `${string}/channels/${number}/permissions/${string}` | `${string}/channels/${number}/permissions/${number}` | `${string}/channels/${number}/permissions/${bigint}` | `${string}/channels/${bigint}/permissions/${string}` | `${string}/channels/${bigint}/permissions/${number}` | `${string}/channels/${bigint}/permissions/${bigint}`;
    ChannelPins: (base: string, channelID: id) => `${string}/channels/${string}/pins` | `${string}/channels/${number}/pins` | `${string}/channels/${bigint}/pins`;
    ChannelPin: (base: string, channelID: id, messageID: id) => `${string}/channels/${string}/pins/${string}` | `${string}/channels/${string}/pins/${number}` | `${string}/channels/${string}/pins/${bigint}` | `${string}/channels/${number}/pins/${string}` | `${string}/channels/${number}/pins/${number}` | `${string}/channels/${number}/pins/${bigint}` | `${string}/channels/${bigint}/pins/${string}` | `${string}/channels/${bigint}/pins/${number}` | `${string}/channels/${bigint}/pins/${bigint}`;
    ChannelRecipient: (base: string, channelID: id, userID: id) => `${string}/channels/${string}/recipients/${string}` | `${string}/channels/${string}/recipients/${number}` | `${string}/channels/${string}/recipients/${bigint}` | `${string}/channels/${number}/recipients/${string}` | `${string}/channels/${number}/recipients/${number}` | `${string}/channels/${number}/recipients/${bigint}` | `${string}/channels/${bigint}/recipients/${string}` | `${string}/channels/${bigint}/recipients/${number}` | `${string}/channels/${bigint}/recipients/${bigint}`;
    ChannelTyping: (base: string, channelID: id) => `${string}/channels/${string}/typing` | `${string}/channels/${number}/typing` | `${string}/channels/${bigint}/typing`;
    ChannelWebhooks: (base: string, channelID: id) => `${string}/channels/${string}/webhooks` | `${string}/channels/${number}/webhooks` | `${string}/channels/${bigint}/webhooks`;
    Gateway: (base: string) => `${string}/gateway`;
    GatewayBot: (base: string) => `${string}/gateway/bot`;
    Servers: (base: string) => `${string}/guilds`;
    Server: (base: string, serverID: id) => `${string}/guilds/${string}` | `${string}/guilds/${number}` | `${string}/guilds/${bigint}`;
    ServerAuditLog: (base: string, serverID: id) => `${string}/guilds/${string}/audit-logs` | `${string}/guilds/${number}/audit-logs` | `${string}/guilds/${bigint}/audit-logs`;
    ServerBans: (base: string, serverID: id) => `${string}/guilds/${string}/bans` | `${string}/guilds/${number}/bans` | `${string}/guilds/${bigint}/bans`;
    ServerBan: (base: string, serverID: id, userID: id) => `${string}/guilds/${string}/bans/${string}` | `${string}/guilds/${string}/bans/${number}` | `${string}/guilds/${string}/bans/${bigint}` | `${string}/guilds/${number}/bans/${string}` | `${string}/guilds/${number}/bans/${number}` | `${string}/guilds/${number}/bans/${bigint}` | `${string}/guilds/${bigint}/bans/${string}` | `${string}/guilds/${bigint}/bans/${number}` | `${string}/guilds/${bigint}/bans/${bigint}`;
    ServerChannels: (base: string, serverID: id) => `${string}/guilds/${string}/channels` | `${string}/guilds/${number}/channels` | `${string}/guilds/${bigint}/channels`;
    ServerEmojis: (base: string, serverID: id) => `${string}/guilds/${string}/emojis` | `${string}/guilds/${number}/emojis` | `${string}/guilds/${bigint}/emojis`;
    ServerEmoji: (base: string, serverID: id, emojiID: id) => `${string}/guilds/${string}/emojis/${string}` | `${string}/guilds/${string}/emojis/${number}` | `${string}/guilds/${string}/emojis/${bigint}` | `${string}/guilds/${number}/emojis/${string}` | `${string}/guilds/${number}/emojis/${number}` | `${string}/guilds/${number}/emojis/${bigint}` | `${string}/guilds/${bigint}/emojis/${string}` | `${string}/guilds/${bigint}/emojis/${number}` | `${string}/guilds/${bigint}/emojis/${bigint}`;
    ServerIntegrations: (base: string, serverID: id) => `${string}/guilds/${string}/integrations` | `${string}/guilds/${number}/integrations` | `${string}/guilds/${bigint}/integrations`;
    ServerIntegration: (base: string, serverID: id, integrationID: id) => `${string}/guilds/${string}/integrations/${string}` | `${string}/guilds/${string}/integrations/${number}` | `${string}/guilds/${string}/integrations/${bigint}` | `${string}/guilds/${number}/integrations/${string}` | `${string}/guilds/${number}/integrations/${number}` | `${string}/guilds/${number}/integrations/${bigint}` | `${string}/guilds/${bigint}/integrations/${string}` | `${string}/guilds/${bigint}/integrations/${number}` | `${string}/guilds/${bigint}/integrations/${bigint}`;
    ServerIntegrationSync: (base: string, serverID: id, integrationID: id) => `${string}/guilds/${string}/integrations/${string}/sync` | `${string}/guilds/${string}/integrations/${number}/sync` | `${string}/guilds/${string}/integrations/${bigint}/sync` | `${string}/guilds/${number}/integrations/${string}/sync` | `${string}/guilds/${number}/integrations/${number}/sync` | `${string}/guilds/${number}/integrations/${bigint}/sync` | `${string}/guilds/${bigint}/integrations/${string}/sync` | `${string}/guilds/${bigint}/integrations/${number}/sync` | `${string}/guilds/${bigint}/integrations/${bigint}/sync`;
    ServerInvites: (base: string, serverID: id) => `${string}/guilds/${string}/invites` | `${string}/guilds/${number}/invites` | `${string}/guilds/${bigint}/invites`;
    ServerMembers: (base: string, serverID: id) => `${string}/guilds/${string}/members` | `${string}/guilds/${number}/members` | `${string}/guilds/${bigint}/members`;
    ServerMember: (base: string, serverID: id, userID: id) => `${string}/guilds/${string}/members/${string}` | `${string}/guilds/${string}/members/${number}` | `${string}/guilds/${string}/members/${bigint}` | `${string}/guilds/${number}/members/${string}` | `${string}/guilds/${number}/members/${number}` | `${string}/guilds/${number}/members/${bigint}` | `${string}/guilds/${bigint}/members/${string}` | `${string}/guilds/${bigint}/members/${number}` | `${string}/guilds/${bigint}/members/${bigint}`;
    ServerMemberNick: (base: string, serverID: id, userID: id) => `${string}/guilds/${string}/members/${string}/nick` | `${string}/guilds/${string}/members/${number}/nick` | `${string}/guilds/${string}/members/${bigint}/nick` | `${string}/guilds/${number}/members/${string}/nick` | `${string}/guilds/${number}/members/${number}/nick` | `${string}/guilds/${number}/members/${bigint}/nick` | `${string}/guilds/${bigint}/members/${string}/nick` | `${string}/guilds/${bigint}/members/${number}/nick` | `${string}/guilds/${bigint}/members/${bigint}/nick`;
    ServerMemberRole: (base: string, serverID: id, userID: id, roleID: id) => `${string}/guilds/${string}/members/${string}/roles/${string}` | `${string}/guilds/${string}/members/${string}/roles/${number}` | `${string}/guilds/${string}/members/${string}/roles/${bigint}` | `${string}/guilds/${string}/members/${number}/roles/${string}` | `${string}/guilds/${string}/members/${number}/roles/${number}` | `${string}/guilds/${string}/members/${number}/roles/${bigint}` | `${string}/guilds/${string}/members/${bigint}/roles/${string}` | `${string}/guilds/${string}/members/${bigint}/roles/${number}` | `${string}/guilds/${string}/members/${bigint}/roles/${bigint}` | `${string}/guilds/${number}/members/${string}/roles/${string}` | `${string}/guilds/${number}/members/${string}/roles/${number}` | `${string}/guilds/${number}/members/${string}/roles/${bigint}` | `${string}/guilds/${number}/members/${number}/roles/${string}` | `${string}/guilds/${number}/members/${number}/roles/${number}` | `${string}/guilds/${number}/members/${number}/roles/${bigint}` | `${string}/guilds/${number}/members/${bigint}/roles/${string}` | `${string}/guilds/${number}/members/${bigint}/roles/${number}` | `${string}/guilds/${number}/members/${bigint}/roles/${bigint}` | `${string}/guilds/${bigint}/members/${string}/roles/${string}` | `${string}/guilds/${bigint}/members/${string}/roles/${number}` | `${string}/guilds/${bigint}/members/${string}/roles/${bigint}` | `${string}/guilds/${bigint}/members/${number}/roles/${string}` | `${string}/guilds/${bigint}/members/${number}/roles/${number}` | `${string}/guilds/${bigint}/members/${number}/roles/${bigint}` | `${string}/guilds/${bigint}/members/${bigint}/roles/${string}` | `${string}/guilds/${bigint}/members/${bigint}/roles/${number}` | `${string}/guilds/${bigint}/members/${bigint}/roles/${bigint}`;
    ServerMemberVerification: (base: string, serverID: id) => `${string}/guilds/${string}/member-verification` | `${string}/guilds/${number}/member-verification` | `${string}/guilds/${bigint}/member-verification`;
    ServerPreview: (base: string, serverID: id) => `${string}/guilds/${string}/preview` | `${string}/guilds/${number}/preview` | `${string}/guilds/${bigint}/preview`;
    ServerPrune: (base: string, serverID: id) => `${string}/guilds/${string}/prune` | `${string}/guilds/${number}/prune` | `${string}/guilds/${bigint}/prune`;
    ServerRegions: (base: string, serverID: id) => `${string}/guilds/${string}/regions` | `${string}/guilds/${number}/regions` | `${string}/guilds/${bigint}/regions`;
    ServerRoles: (base: string, serverID: id) => `${string}/guilds/${string}/roles` | `${string}/guilds/${number}/roles` | `${string}/guilds/${bigint}/roles`;
    ServerRole: (base: string, serverID: id, roleID: id) => `${string}/guilds/${string}/roles/${string}` | `${string}/guilds/${string}/roles/${number}` | `${string}/guilds/${string}/roles/${bigint}` | `${string}/guilds/${number}/roles/${string}` | `${string}/guilds/${number}/roles/${number}` | `${string}/guilds/${number}/roles/${bigint}` | `${string}/guilds/${bigint}/roles/${string}` | `${string}/guilds/${bigint}/roles/${number}` | `${string}/guilds/${bigint}/roles/${bigint}`;
    ServerTemplates: (base: string, serverID: id) => `${string}/guilds/${string}/templates` | `${string}/guilds/${number}/templates` | `${string}/guilds/${bigint}/templates`;
    ServerTemplate: (base: string, serverID: id, templateCode: string) => `${string}/guilds/${string}/templates/${string}` | `${string}/guilds/${number}/templates/${string}` | `${string}/guilds/${bigint}/templates/${string}`;
    ServerInvite: (base: string, serverID: id) => `${string}/guilds/${string}/vanity-url` | `${string}/guilds/${number}/vanity-url` | `${string}/guilds/${bigint}/vanity-url`;
    ServerWebhooks: (base: string, serverID: id) => `${string}/guilds/${string}/webhooks` | `${string}/guilds/${number}/webhooks` | `${string}/guilds/${bigint}/webhooks`;
    ServerWidget: (base: string, serverID: id) => `${string}/guilds/${string}/widget` | `${string}/guilds/${number}/widget` | `${string}/guilds/${bigint}/widget`;
    ServerWidgetParams: (base: string, serverID: id) => `${string}/guilds/${string}/widget.json` | `${string}/guilds/${number}/widget.json` | `${string}/guilds/${bigint}/widget.json`;
    ServerWidgetImage: (base: string, serverID: id) => `${string}/guilds/${string}/widget.png` | `${string}/guilds/${number}/widget.png` | `${string}/guilds/${bigint}/widget.png`;
    Invite: (base: string, inviteCode: string) => `${string}/invites/${string}`;
    OAuth2: (base: string, userID: id) => `${string}/oauth2/${string}` | `${string}/oauth2/${number}` | `${string}/oauth2/${bigint}`;
    OAuth2App: (base: string, userID: id) => `${string}/oauth2/applications/${string}` | `${string}/oauth2/applications/${number}` | `${string}/oauth2/applications/${bigint}`;
    Template: (base: string, templateCode: string) => `${string}/templates/${string}`;
    User: (base: string, userID: id) => `${string}/users/${string}` | `${string}/users/${number}` | `${string}/users/${bigint}`;
    UserChannels: (base: string, userID: id) => `${string}/users/${string}/channels` | `${string}/users/${number}/channels` | `${string}/users/${bigint}/channels`;
    UserConnections: (base: string, userID: id) => `${string}/users/${string}/connections` | `${string}/users/${number}/connections` | `${string}/users/${bigint}/connections`;
    UserServers: (base: string, userID: id) => `${string}/users/${string}/guilds` | `${string}/users/${number}/guilds` | `${string}/users/${bigint}/guilds`;
    UserServer: (base: string, userID: id, serverID: id) => `${string}/users/${string}/guilds/${string}` | `${string}/users/${string}/guilds/${number}` | `${string}/users/${string}/guilds/${bigint}` | `${string}/users/${number}/guilds/${string}` | `${string}/users/${number}/guilds/${number}` | `${string}/users/${number}/guilds/${bigint}` | `${string}/users/${bigint}/guilds/${string}` | `${string}/users/${bigint}/guilds/${number}` | `${string}/users/${bigint}/guilds/${bigint}`;
    VoiceRegions: (base: string) => `${string}/voice/regions`;
    Webhook: (base: string, webhookID: id) => `${string}/webhooks/${string}` | `${string}/webhooks/${number}` | `${string}/webhooks/${bigint}`;
    WebhookToken: (base: string, webhookID: id, webhookToken: string) => `${string}/webhooks/${string}/${string}` | `${string}/webhooks/${number}/${string}` | `${string}/webhooks/${bigint}/${string}`;
    WebhookTokenGitHub: (base: string, webhookID: id, webhookToken: string) => `${string}/webhooks/${string}/${string}/github` | `${string}/webhooks/${number}/${string}/github` | `${string}/webhooks/${bigint}/${string}/github`;
    WebhookTokenSlack: (base: string, webhookID: id, webhookToken: string) => `${string}/webhooks/${string}/${string}/slack` | `${string}/webhooks/${number}/${string}/slack` | `${string}/webhooks/${bigint}/${string}/slack`;
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
    }): `${string}/embed/avatars/${string}.png`;
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
    }): Promise<ServerMember>;
    removeMember(params: {
        serverID: id;
        userID: id;
        reason?: string;
    }): Promise<void>;
    getServerMembershipScreeningForm(params: {
        serverID: id;
    }): Promise<MembershipScreening>;
    editServerMembershipScreeningForm(params: {
        serverID: id;
        isEnabled?: boolean;
        formFields?: JSONMembershipScreeningField[];
        description?: string;
    }): Promise<MembershipScreening>;
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
    getApp(params: {
        userID?: id;
    }): Promise<App>;
    getAuthorization(params: {
        userID?: id;
    }): Promise<{
        app: App;
        expires: number;
        scopes: string[];
        user: User | undefined;
    }>;
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
