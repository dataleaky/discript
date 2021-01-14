# Server extends Base 

#### flake: Flake;
#### name: string;
#### icon: string | null;
#### iconTemplate?: string | null;
#### splash: string | null;
#### discoverySplash: string | null;
#### isOwned?: boolean;
#### ownerFlake: Flake;
#### bitPermission?: BitSet;
#### region: string;
#### afkChannelFlake: Flake | null;
#### afkTimeout: number;
#### isWidget?: boolean;
#### widgetChannelFlake?: Flake | null;
#### verificationLevel: VerificationLevel['key'];
#### messageNotifications: MessageNotificationLevel['key'];
#### explicitFilter: ExplicitContentFilterLevel['key'];
#### roles: Collection<bigint, Role>;
#### emojis: Collection<bigint, Emoji>;
#### features: ServerFeature[];
#### mfaLevel: MFALevel['key'];
#### appFlake: Flake | null;
#### systemChannelFlake: Flake | null;
#### systemChannelFlags: number;
#### rulesChannelFlake: Flake | null;
#### joinedTime?: number;
#### isLarge?: boolean;
#### isUnavailable?: boolean;
#### memberCount?: number;
#### voiceStates?: Collection<bigint, VoiceState>;
#### members?: Collection<bigint, ServerMember>;
#### channels?: Collection<bigint, Channel>;
#### presences?: Collection<bigint, PartialObject<Presence>>;
#### maxPresences?: number | null;
#### maxMembers?: number;
#### vanityCode: string | null;
#### description: string | null;
#### banner: string | null;
#### premiumTier: PremiumTier['key'];
#### premiumSubscriptionCount?: number;
#### preferredLocale: DiscordLocales;
#### publicUpdatesChannelFlake: Flake | null;
#### maxVideoChannelUsers?: number;
#### roughMemberCount?: number;
#### roughPresenceCount?: number;
#### welcomeScreen?: WelcomeScreen;
#### joinedDate: Date | undefined;
#### owner: User;
#### afkChannel: Channel | null;
#### widgetChannel: Channel | null | undefined;
#### app: import("./App").default | null;
#### systemChannel: Channel | null;
#### rulesChannel: Channel | null;
#### publicUpdatesChannel: Channel | null;
#### constructor(data: ClientObject & JSONServer);
#### getDefaultMessageNotifications(): MessageNotificationLevel['value'] | null;
#### getExplicitContentFilter(): ExplicitContentFilterLevel['value'] | null;
#### getMFALevel(): MFALevel['value'] | null;
#### getVerificationLevel(): VerificationLevel['value'] | null;
#### getPremiumTier(): PremiumTier['value'] | null;
#### getSystemChannelFlags(): SystemChannelFlag['value'][] | null;
#### getIconURL(params: ImageParams): string | null;
#### getSplashURL(params: ImageParams): string | null;
#### getDiscoverySplashURL(params: ImageParams): string | null;
#### getBannerURL(params: ImageParams): string | null;

# ServerPreview extends Base 

#### flake: Flake;
#### name: string;
#### icon: string | null;
#### splash: string | null;
#### discoverySplash: string | null;
#### emojis: Collection<bigint, Emoji>;
#### features: ServerFeature[];
#### roughMemberCount: number;
#### roughPresenceCount: number;
#### description: string | null;
#### constructor(data: ClientObject & JSONServerPreview);
#### getIconURL(params: ImageParams): string | null;
#### getSplashURL(params: ImageParams): string | null;
#### getDiscoverySplashURL(params: ImageParams): string | null;

# Role extends Base 

#### flake: Flake;
#### name: string;
#### colorDec?: number;
#### isHoist?: boolean;
#### position: number;
#### bitPermission: BitSet;
#### isManaged: boolean;
#### isMentionable: boolean;
#### tags?: RoleTags;
#### mention: string;
#### constructor(data: ClientObject & JSONRole);

# RoleTags extends Base 

#### botFlake?: Flake;
#### integrationFlake?: Flake;
#### isPremiumSubscriber?: null;
#### bot: import("./App").default | undefined;
#### integration: import("./Integration").default | undefined;
#### constructor(data: ClientObject & JSONRoleTags);

# Emoji extends Base 

#### flake: Flake | null;
#### name: string | null;
#### rolesFlake?: Flake[];
#### user?: User;
#### isWrapped?: boolean;
#### isManaged?: boolean;
#### isAnimated?: boolean;
#### isAvailable?: boolean;
#### emojiName: string | null;
#### roles: Collection<bigint, Role> | undefined;
#### constructor(data: ClientObject & JSONEmoji);
#### getEmojiURL(params: ImageParams): string | null;

# ServerMember extends Base 

#### user?: User;
#### nick: string | null;
#### joinedTime: number;
#### rolesFlake: Flake[];
#### premiumTime?: number | null;
#### isDeaf: boolean;
#### isMute: boolean;
#### isPending?: boolean;
#### bitPermission?: BitSet;
#### mention: string | undefined;
#### joinedDate: Date;
#### premiumDate: Date | null | undefined;
#### roles: Collection<bigint, Role>;
#### constructor(data: ClientObject & JSONServerMember);

# Ban extends Base 

#### reason: string | null;
#### user: User;
#### constructor(data: ClientObject & JSONBan);

# VoiceState extends Base 

#### serverFlake?: Flake;
#### channelFlake: Flake | null;
#### userFlake: Flake;
#### member?: ServerMember;
#### sessionID: string;
#### isDeaf: boolean;
#### isMute: boolean;
#### isSelfDeaf: boolean;
#### isSelfMute: boolean;
#### isSelfStream?: boolean;
#### isSelfVideo: boolean;
#### isSuppress: boolean;
#### server: Server | undefined;
#### channel: Channel | null;
#### user: User;
#### constructor(data: ClientObject & JSONVoiceState);

# VoiceRegion extends Base 

#### id: string;
#### name: string;
#### isVIP: boolean;
#### isOptimal: boolean;
#### isDeprecated: boolean;
#### isCustom: boolean;
#### constructor(data: JSONVoiceRegion);

# ServerWidget extends Base 

#### isEnabled: boolean;
#### channelFlake: Flake | null;
#### channel: Channel | null;
#### constructor(data: ClientObject & JSONServerWidget);

# ServerWidgetParams extends Base 

#### [key: string]: unknown;
#### constructor(data: ClientObject & JSONServerWidgetParams);

# WelcomeScreen extends Base 

#### description: string | null;
#### channels: Collection<bigint, WelcomeChannel>;
#### constructor(data: ClientObject & JSONWelcomeScreen);

# WelcomeChannel extends Base 

#### flake: Flake;
#### description: string;
#### emojiFlake: Flake | null;
#### emojiName: string | null;
#### channel: Channel;
#### emoji: Emoji | null;
#### constructor(data: ClientObject & JSONWelcomeChannel);

# MembershipScreening 

#### editTime: number;
#### formFields: MembershipScreeningField[];
#### description: string | null;
#### constructor(data: JSONMembershipScreening);

# MembershipScreeningField 

#### fieldType: MembershipScreeningFieldType;
#### label: string;
#### values?: string[];
#### isRequired: boolean;
#### constructor(data: JSONMembershipScreeningField);

# Template extends Base 

#### code: string;
#### name: string;
#### description: string | null;
#### usageCount: number;
#### creatorFlake: Flake;
#### creatorUser: User;
#### createdTime: number;
#### updatedTime: number;
#### serverFlake: Flake;
#### snapshotServer: PartialObject<Server>;
#### isDirty: boolean | null;
#### createdDate: Date;
#### updatedDate: Date;
#### creator: User;
#### server: Server;
#### constructor(data: ClientObject & JSONTemplate);

