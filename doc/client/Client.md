# Gateway extends Base 

#### url: string;
#### shards?: number;
#### sessionStartLimit?: SessionStartLimit;
#### constructor(data: JSONGateway);

# SessionStartLimit extends Base 

#### total: number;
#### remaining: number;
#### resetAfter: number;
#### maxConcurrency: number;
#### constructor(data: JSONSessionStartLimit);

# Client extends Base 

#### options: ClientOptions;
#### handler: RequestHandler;
#### startTime: number;
#### ping: number;
#### user: User;
#### servers: Collection<bigint, Server>;
#### channels: Collection<bigint, Channel>;
#### users: Collection<bigint, User>;
#### webhooks: Collection<bigint, Webhook>;
#### roles: Collection<bigint, Role>;
#### apps: Collection<bigint, App>;
#### integration: Collection<bigint, Integration>;
#### emojis: Collection<bigint, Emoji>;
#### messages: Collection<bigint, Emoji>;
#### constructor(options: PartialObject<ClientOptions>);
#### getAppAssetURL(params: {
    appID: id;
    assetID: id;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getAppAchievementIconURL(params: {
    appID: id;
    achievementID: id;
    icon: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getAppIconURL(params: {
    appID: id;
    icon: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getUserAvatarURL(params: {
    avatar: string;
    userID: id;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getServerBannerURL(params: {
    serverID: id;
    banner: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getServerDiscoverySplashURL(params: {
    serverID: id;
    discoverySplash: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getDefaultUserAvatarURL(params: {
    tag: string;
}): `${string}/embed/avatars/${string}.png`;
#### getEmojiURL(params: {
    emojiID: id;
    animated: boolean;
    size?: ImageSize;
}): string;
#### getServerIconURL(params: {
    serverID: id;
    icon: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getServerSplashURL(params: {
    serverID: id;
    splash: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getTeamIconURL(params: {
    teamID: id;
    icon: string;
    format?: ImageFormat;
    size?: ImageSize;
}): string;
#### getChannel(params: {
    channelID: id;
}): Promise<Channel>;
#### editChannel(params: {
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
#### removeChannel(params: {
    channelID: id;
    reason?: string;
}): Promise<Channel>;
#### leaveDMChannel(params: {
    channelID: id;
}): Promise<Channel>;
#### getMessages(params: {
    channelID: id;
    aroundID?: id;
    beforeID?: id;
    afterID?: id;
    limit?: string;
}): Promise<Collection<unknown, unknown>>;
#### addMessage(params: {
    channelID: id;
    content?: string;
    nonce?: string | number;
    isTTS?: boolean;
    embed?: JSONEmbed;
    mentions?: JSONAllowedMentions;
    file?: FileContents | FileContents[];
}): Promise<Message>;
#### getMessage(params: {
    channelID: id;
    messageID: id;
}): Promise<Message>;
#### editMessage(params: {
    channelID: id;
    messageID: id;
    content?: string;
    embed?: JSONEmbed;
    flags?: number;
}): Promise<Message>;
#### removeMessage(params: {
    channelID: id;
    messageID: id;
    reason?: string;
}): Promise<void>;
#### publishMessage(params: {
    channelID: id;
    messageID: id;
}): Promise<Message>;
#### removeReactions(params: {
    channelID: id;
    messageID: id;
    emoji?: string;
    userID?: id;
    isAll?: boolean;
}): Promise<void>;
#### getReactionUsers(params: {
    channelID: id;
    messageID: id;
    emoji: string;
    beforeID: id;
    afterID: id;
    limit: number;
}): Promise<Collection<unknown, unknown>>;
#### addReaction(params: {
    channelID: id;
    messageID: id;
    emoji: string;
    userID?: id;
}): Promise<void>;
#### removeMessages(params: {
    channelID: id;
    messagesID: id[];
    reason?: string;
}): Promise<void>;
#### editChannelPermissions(params: {
    channelID: id;
    overwriteID: id;
    allow?: string;
    deny?: string;
    type?: PermissionType;
    reason?: string;
}): Promise<void>;
#### removeChannelPermission(params: {
    channelID: id;
    overwriteID: id;
    reason?: string;
}): Promise<void>;
#### getChannelInvites(params: {
    channelID: id;
}): Promise<Collection<unknown, unknown>>;
#### addChannelInvite(params: {
    channelID: id;
    maxAge?: number;
    maxUses?: number;
    isTemporary?: boolean;
    isUnique?: boolean;
    targetUserID?: id;
    targetUserType?: TargetUserType['key'];
    reason?: string;
}): Promise<Invite>;
#### followNewsChannel(params: {
    channelID: id;
    webhookChannelID: id;
}): Promise<FollowedChannel>;
#### startTypingIndicator(params: {
    channelID: id;
}): Promise<void>;
#### getPinnedMessages(params: {
    channelID: id;
}): Promise<Collection<unknown, unknown>>;
#### addPinnedMessage(params: {
    channelID: id;
    messageID: id;
    reason?: string;
}): Promise<void>;
#### removePinnedMessage(params: {
    channelID: id;
    messageID: id;
    reason?: string;
}): Promise<void>;
#### addGroupDMUser(params: {
    channelID: id;
    userID: id;
    accessToken: string;
    nick: string;
}): Promise<void>;
#### removeGroupDMUser(params: {
    channelID: id;
    userID: id;
}): Promise<void>;
#### getChannelWebhooks(params: {
    channelID: id;
}): Promise<Collection<unknown, unknown>>;
#### addChannelWebhook(params: {
    channelID: id;
    name: string;
    avatar?: ImageData | null;
    reason?: string;
}): Promise<Webhook>;
#### getGateway(): Promise<Gateway>;
#### getGatewayBot(): Promise<Gateway>;
#### addServer(params: {
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
#### getServer(params: {
    serverID: id;
    isWithCounts?: boolean;
}): Promise<Server>;
#### editServer(params: {
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
#### removeServer(params: {
    serverID: id;
}): Promise<void>;
#### getAuditLog(params: {
    serverID: id;
    userID?: id;
    actionType?: AuditLogEvent['key'];
    beforeID?: id;
    limit?: number;
}): Promise<AuditLog>;
#### getBans(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### getBan(params: {
    serverID: id;
    userID: id;
}): Promise<Ban>;
#### addBan(params: {
    serverID: id;
    userID: id;
    days?: number;
    reason?: string;
}): Promise<void>;
#### removeBan(params: {
    serverID: id;
    userID: id;
    reason?: string;
}): Promise<void>;
#### getServerChannels(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### addServerChannel(params: {
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
#### editServerChannelPositions(params: {
    serverID: id;
    channelID: id;
    position: number | null;
}): Promise<void>;
#### getEmojis(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### addEmoji(params: {
    serverID: id;
    name: string;
    image: ImageData;
    rolesID?: id[];
    reason?: string;
}): Promise<Emoji>;
#### getEmoji(params: {
    serverID: id;
    emojiID: id;
}): Promise<Emoji>;
#### editEmoji(params: {
    serverID: id;
    emojiID: id;
    name?: string;
    rolesID?: id[] | null;
    reason?: string;
}): Promise<Emoji>;
#### removeEmoji(params: {
    serverID: id;
    emojiID: id;
    reason?: string;
}): Promise<void>;
#### getIntegrations(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### addIntegration(params: {
    serverID: id;
    type: string;
    integrationID: id;
    reason?: string;
}): Promise<void>;
#### editIntegration(params: {
    serverID: id;
    integrationID: id;
    expireBehavior?: IntegrationExpireBehavior['key'] | null;
    expireGracePeriod?: number | null;
    isEmojis?: boolean | null;
    reason?: string;
}): Promise<void>;
#### removeIntegration(params: {
    serverID: id;
    integrationID: id;
    reason?: string;
}): Promise<void>;
#### syncIntegration(params: {
    serverID: id;
    integrationID: id;
}): Promise<void>;
#### getServerInvites(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### getMembers(params: {
    serverID: id;
    afterID?: id;
    limit?: number;
}): Promise<Collection<unknown, unknown>>;
#### getMember(params: {
    serverID: id;
    userID: id;
}): Promise<ServerMember>;
#### addMember(params: {
    serverID: id;
    userID: id;
    accessToken: string;
    nick?: number;
    rolesID?: id[];
    isMute?: boolean;
    isDeaf?: boolean;
}): Promise<ServerMember>;
#### editMember(params: {
    serverID: id;
    userID: id;
    nick?: string;
    rolesID?: id[];
    isMute?: boolean;
    isDeaf?: boolean;
    channelID?: id;
    reason?: string;
}): Promise<ServerMember>;
#### removeMember(params: {
    serverID: id;
    userID: id;
    reason?: string;
}): Promise<void>;
#### getServerMembershipScreeningForm(params: {
    serverID: id;
}): Promise<MembershipScreening>;
#### editServerMembershipScreeningForm(params: {
    serverID: id;
    isEnabled?: boolean;
    formFields?: JSONMembershipScreeningField[];
    description?: string;
}): Promise<MembershipScreening>;
#### editUserNick(params: {
    serverID: id;
    userID?: id;
    nick?: string | null;
}): Promise<void>;
#### addMemberRole(params: {
    serverID: id;
    userID: id;
    roleID: id;
    reason?: string;
}): Promise<void>;
#### removeMemberRole(params: {
    serverID: id;
    userID: id;
    roleID: id;
    reason?: string;
}): Promise<void>;
#### getServerPreview(params: {
    serverID: id;
}): Promise<ServerPreview>;
#### getServerPrune(params: {
    serverID: id;
    days?: number;
    includeRolesID?: id[];
}): Promise<void>;
#### startServerPrune(params: {
    serverID: id;
    days?: number;
    computeCount?: boolean;
    includeRolesID?: id[];
    reason?: string;
}): Promise<void>;
#### getServerVoiceRegions(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### getRoles(params: {
    serverID: id;
}): Promise<Collection<unknown, unknown>>;
#### addRole(params: {
    serverID: id;
    name?: string;
    bitPermission?: string;
    colorDec?: number;
    isHoist?: boolean;
    isMentionable?: boolean;
    reason?: string;
}): Promise<Role>;
#### editRolePositions(params: {
    serverID: id;
    roleID: id;
    position?: number | null;
}): Promise<Collection<unknown, unknown>>;
#### editRole(params: {
    serverID: id;
    roleID: id;
    name?: string;
    bitPermission?: string;
    colorDec?: number;
    isHoist?: boolean;
    isMentionable?: boolean;
    reason?: string;
}): Promise<Role>;
#### removeRole(params: {
    serverID: id;
    roleID: id;
    reason?: string;
}): Promise<void>;
#### getServerTemplates(params: {
    serverID: id;
}): Promise<Collection<string, Template>>;
#### addServerTemplate(params: {
    serverID: id;
    name: string;
    description?: string | null;
}): Promise<Template>;
#### editServerTemplate(params: {
    serverID: id;
    templateCode: string;
    name?: string;
    description?: string | null;
}): Promise<Template>;
#### removeServerTemplate(params: {
    serverID: id;
    templateCode: string;
}): Promise<Template>;
#### syncServerTemplate(params: {
    serverID: id;
    templateCode: string;
}): Promise<Template>;
#### getServerInvite(params: {
    serverID: id;
}): Promise<PartialObject<Invite>>;
#### getServerWebhooks(params: {
    serverID: id;
}): Promise<Collection<bigint, Webhook>>;
#### getServerWidget(params: {
    serverID: id;
}): Promise<ServerWidget>;
#### editServerWidget(params: {
    serverID: id;
    options?: string;
}): Promise<ServerWidget>;
#### getServerWidgetParams(params: {
    serverID: id;
}): Promise<ServerWidgetParams>;
#### getServerWidgetImage(params: {
    serverID: id;
    style?: WidgetStyle;
}): Promise<unknown>;
#### getInvite(params: {
    inviteCode: string;
    isWithCounts?: boolean;
}): Promise<Invite>;
#### removeInvite(params: {
    inviteCode: string;
    reason?: string;
}): Promise<Invite>;
#### getApp(params: {
    userID?: id;
}): Promise<App>;
#### getAuthorization(params: {
    userID?: id;
}): Promise<{
    app: App;
    expires: number;
    scopes: string[];
    user: User | undefined;
}>;
#### getTemplate(params: {
    templateCode: string;
}): Promise<Template>;
#### addServerFromTemplate(params: {
    templateCode: string;
    name: string;
    icon?: ImageData;
}): Promise<Server>;
#### getUser(params: {
    userID?: id;
}): Promise<User>;
#### editUser(params: {
    userID?: id;
    username?: string;
    avatar?: ImageData;
}): Promise<User>;
#### getDMs(params: {
    userID?: id;
}): Promise<Collection<bigint, Channel>>;
#### addDM(params: {
    userID?: id;
    recipientID: id;
}): Promise<Channel>;
#### addGroupDM(params: {
    userID?: id;
    accessTokens: string[];
    nicks: [[id, string]];
}): Promise<Channel>;
#### getConnections(params: {
    userID?: id;
}): Promise<Collection<unknown, unknown>>;
#### getServers(params: {
    userID?: id;
    beforeID?: id;
    afterID?: id;
    limit?: number;
}): Promise<Collection<bigint, PartialObject<Server>>>;
#### leaveServer(params: {
    serverID: id;
    userID?: id;
}): Promise<void>;
#### getVoiceRegions(): Promise<Collection<unknown, unknown>>;
#### getWebhook(params: {
    webhookID: id;
    webhookToken?: string;
}): Promise<Webhook>;
#### editWebhook(params: {
    webhookID: id;
    webhookToken?: string;
    name: string;
    avatar?: ImageData | null;
    channelID?: id;
    reason?: string;
}): Promise<Webhook>;
#### removeWebhook(params: {
    webhookID: id;
    webhookToken?: string;
    reason?: string;
}): Promise<void>;
#### executeWebhook(params: {
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

