import Base from '../dev/Base';
import Collection from '../dev/Collection';
import type { DiscordLocales, ImageFormat, ImageSize, PartialObject } from '../dev/Types';
import Application from '../dev/structures/Application';
import AuditLog from '../dev/structures/AuditLog';
import type { AuditLogEvent } from '../dev/structures/AuditLog';
import Channel, { FollowedChannel } from '../dev/structures/Channel';
import Invite from '../dev/structures/Invite';
import Message, { AllowedMentions, JSONEmbed } from '../dev/structures/Message';
import type Permission from '../dev/structures/Permission';
import type { Activity, StatusTypes } from '../dev/structures/Presence';
import Server, { Ban, Emoji, Role, ServerMember, ServerPreview, ServerWidget, Template, WidgetStyle } from '../dev/structures/Server';
import User from '../dev/structures/User';
import Webhook from '../dev/structures/Webhook';
import RequestHandler from './RequestHandler';
interface FileContents {
}
interface JSONGateway {
  url: string;
}
interface JSONGatewayBot {
  url: string;
  shards: number;
  sessionStartLimit: JSONSessionStartLimit;
}
interface JSONSessionStartLimit {
  total: number;
  remaining: number;
  reset_after: number;
  max_concurrency: number;
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
interface StatusUpdate {
  since: number | null;
  activities: Activity[] | null;
  status: StatusTypes;
  afk: boolean;
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
  GuildAuditLog(serverID: string): string;
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
  getGateway(): Promise<JSONGateway>;
  getGatewayBot(): Promise<JSONGatewayBot>;
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
    guildID: string;
    emojiID: string;
  }): Promise<Emoji>;
  createServerEmoji(options: {
    guildID: string;
    options: {
      name: string;
      image: string;
      roles?: string[];
    };
    reason?: string;
  }): Promise<Emoji>;
  updateServerEmoji(options: {
    guildID: string;
    emojiID: string;
    options: {
      name?: string;
      image?: string;
    };
    reason?: string;
  }): Promise<Emoji>;
  deleteServerEmoji(options: {
    guildID: string;
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
    guildID: string;
    options: {
      withCounts?: boolean;
    };
  }): Promise<Server>;
  getServerPreview(options: {
    guildID: string;
  }): Promise<ServerPreview>;
  updateServer(options: {
    guildID: string;
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
    guildID: string;
  }): Promise<void>;
  getServerChannels(options: {
    guildID: string;
  }): Promise<Collection<unknown, unknown>>;
  createServerChannel(options: {
    guildID: string;
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
    guildID: string;
    options: {
      id: string;
      position: number | null;
    };
  }): Promise<void>;
  getServerMember(options: {
    guildID: string;
    userID: string;
  }): Promise<ServerMember>;
  getServerMembers(options: {
    guildID: string;
    options: {
      after?: string;
      limit?: number;
    };
  }): Promise<Collection<unknown, unknown>>;
  createServerMember(options: {
    guildID: string;
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
    guildID: string;
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
    guildID: string;
    userID?: string;
    options: {
      nick?: string | null;
    };
  }): Promise<void>;
  createServerMemberRole(options: {
    guildID: string;
    userID: string;
    roleID: string;
    reason?: string;
  }): Promise<void>;
  deleteServerMemberRole(options: {
    guildID: string;
    userID: string;
    roleID: string;
    reason?: string;
  }): Promise<void>;
  deleteServerMember(options: {
    guildID: string;
    userID: string;
    reason?: string;
  }): Promise<void>;
  getServerBans(options: {
    guildID: string;
  }): Promise<Collection<unknown, unknown>>;
  getServerBan(options: {
    guildID: string;
    userID: string;
  }): Promise<Ban>;
  createServerBan(options: {
    guildID: string;
    userID: string;
    options: {
      deleteMessageDays?: number;
      reason?: string;
    };
  }): Promise<void>;
  deleteServerBan(options: {
    guildID: string;
    userID: string;
    reason?: string;
  }): Promise<void>;
  getServerRoles(options: {
    guildID: string;
  }): Promise<Collection<unknown, unknown>>;
  createServerRole(options: {
    guildID: string;
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
    guildID: string;
    options: {
      id: string;
      position?: number | null;
    };
  }): Promise<Collection<unknown, unknown>>;
  updateServerRole(options: {
    guildID: string;
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
    guildID: string;
    roleID: string;
    reason?: string;
  }): Promise<void>;
  getServerPruneCount(options: {
    guildID: string;
    options: {
      days?: number;
      includeRoles?: string[];
    };
  }): Promise<void>;
  beginServerPrune(options: {
    guildID: string;
    options: {
      days?: number;
      computePruneCount?: boolean;
      includeRoles?: string[];
    };
    reason?: string;
  }): Promise<void>;
  getServerVoiceRegions(options: {
    guildID: string;
  }): Promise<Collection<unknown, unknown>>;
  getServerInvites(options: {
    guildID: string;
  }): Promise<Collection<unknown, unknown>>;
  getServerIntegrations(options: {
    guildID: string;
    options: {
      includeApplications?: boolean;
    };
  }): Promise<Collection<unknown, unknown>>;
  createServerIntegration(options: {
    guildID: string;
    options: {
      type: string;
      id: string;
    };
    reason?: string;
  }): Promise<void>;
  updateServerIntegration(options: {
    guildID: string;
    integrationID: string;
    options: {
      expireBehavior?: number;
      expireGracePeriod?: number;
      enableEmoticons?: boolean;
    };
    reason?: string;
  }): Promise<void>;
  deleteServerIntegration(options: {
    guildID: string;
    integrationID: string;
    reason?: string;
  }): Promise<void>;
  syncServerIntegration(options: {
    guildID: string;
    integrationID: string;
  }): Promise<void>;
  getServerWidgetSettings(options: {
    guildID: string;
  }): Promise<ServerWidget>;
  updateServerWidget(options: {
    guildID: string;
    options?: string;
  }): Promise<ServerWidget>;
  getServerWidget(options: {
    guildID: string;
  }): Promise<void>;
  getServerVanityURL(options: {
    guildID: string;
  }): Promise<PartialObject<Invite>>;
  getServerWidgetImage(options: {
    guildID: string;
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
    guildID: string;
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
export type { FileContents, JSONGateway, JSONGatewayBot };
