import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, DiscordLocales, ImageParams, KeyValueParse, PartialObject } from '../Types';
import Channel from './Channel';
import type { JSONChannel } from './Channel';
import Flake from './Flake';
import { BitSet } from './Permission';
import Presence from './Presence';
import type { JSONPresence } from './Presence';
import User from './User';
import type { JSONUser } from './User';
declare const DefaultMessageNotificationLevels: {
    readonly 0: "All Messages";
    readonly 1: "Only Mentions";
};
declare const ExplicitContentFilterLevels: {
    readonly 0: "Disabled";
    readonly 1: "Members Without Roles";
    readonly 2: "All Members";
};
declare const MFALevels: {
    readonly 0: "None";
    readonly 1: "Elevated";
};
declare const VerificationLevels: {
    readonly 0: "None";
    readonly 1: "Low";
    readonly 2: "Medium";
    readonly 3: "High";
    readonly 4: "Very High";
};
declare const PremiumTiers: {
    readonly 0: "None";
    readonly 1: "Tier 1";
    readonly 2: "Tier 2";
    readonly 3: "Tier 3";
};
declare const SystemChannelFlags: {
    readonly 1: "Suppress Join Notifications";
    readonly 2: "Suppress Premium Subscriptions";
};
declare type MessageNotificationLevel = KeyValueParse<(typeof DefaultMessageNotificationLevels)>;
declare type ExplicitContentFilterLevel = KeyValueParse<(typeof ExplicitContentFilterLevels)>;
declare type MFALevel = KeyValueParse<(typeof MFALevels)>;
declare type VerificationLevel = KeyValueParse<(typeof VerificationLevels)>;
declare type PremiumTier = KeyValueParse<(typeof PremiumTiers)>;
declare type SystemChannelFlag = KeyValueParse<(typeof SystemChannelFlags)>;
declare type ServerFeature = 'INVITE_SPLASH' | 'VIP_REGIONS' | 'VANITY_URL' | 'VERIFIED' | 'PARTNERED' | 'COMMUNITY' | 'COMMERCE' | 'NEWS' | 'DISCOVERABLE' | 'FEATURABLE' | 'ANIMATED_ICON' | 'BANNER' | 'WELCOME_SCREEN_ENABLED';
declare type WidgetStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4';
interface JSONServer {
    id: string;
    name: string;
    icon: string | null;
    icon_hash?: string | null;
    splash: string | null;
    discovery_splash: string | null;
    owner?: boolean;
    owner_id: string;
    permissions?: string;
    region: string;
    afk_channel_id: string | null;
    afk_timeout: number;
    widget_enabled?: boolean;
    widget_channel_id?: string | null;
    verification_level: VerificationLevel['key'];
    default_message_notifications: MessageNotificationLevel['key'];
    explicit_content_filter: ExplicitContentFilterLevel['key'];
    roles: JSONRole[];
    emojis: JSONEmoji[];
    features: ServerFeature[];
    mfa_level: MFALevel['key'];
    application_id: string | null;
    system_channel_id: string | null;
    system_channel_flags: number;
    rules_channel_id: number | null;
    joined_at?: string;
    large?: boolean;
    unavailable?: boolean;
    member_count?: number;
    voice_states?: PartialObject<VoiceState>[];
    members?: JSONServerMember[];
    channels?: JSONChannel[];
    presences?: PartialObject<JSONPresence>[];
    max_presences?: number;
    max_members?: number;
    vanity_url_code: string | null;
    description: string | null;
    banner: string | null;
    premium_tier: PremiumTier['key'];
    premium_subscription_count?: number;
    preferred_locale: DiscordLocales;
    public_updates_channel_id: string | null;
    max_video_channel_users?: number;
    approximate_member_count?: number;
    approximate_presence_count?: number;
}
interface Server {
    flake: Flake;
    name: string;
    icon: string | null;
    iconTemplate?: string | null;
    splash: string | null;
    discoverySplash: string | null;
    isOwned?: boolean;
    ownerFlake: Flake;
    bitPermission?: BitSet;
    region: string;
    afkChannelFlake: Flake | null;
    afkTimeout: number;
    isWidget?: boolean;
    widgetChannelFlake?: Flake | null;
    verificationLevel: VerificationLevel['key'];
    messageNotifications: MessageNotificationLevel['key'];
    explicitFilter: ExplicitContentFilterLevel['key'];
    roles: Collection<bigint, Role>;
    emojis: Collection<bigint, Emoji>;
    features: ServerFeature[];
    mfaLevel: MFALevel['key'];
    appFlake: Flake | null;
    systemChannelFlake: Flake | null;
    systemChannelFlags: number;
    rulesChannelFlake: Flake | null;
    joinedTime?: number;
    isLarge?: boolean;
    isUnavailable?: boolean;
    memberCount?: number;
    voiceStates?: Collection<bigint, VoiceState>;
    members?: Collection<bigint, ServerMember>;
    channels?: Collection<bigint, Channel>;
    presences?: Collection<bigint, PartialObject<Presence>>;
    maxPresences?: number | null;
    maxMembers?: number;
    vanityCode: string | null;
    description: string | null;
    banner: string | null;
    premiumTier: PremiumTier['key'];
    premiumSubscriptionCount?: number;
    preferredLocale: DiscordLocales;
    publicUpdatesChannelFlake: Flake | null;
    maxVideoChannelUsers?: number;
    roughMemberCount?: number;
    roughPresenceCount?: number;
}
declare class Server extends Base {
    protected _client: ClientObject['_client'];
    get joinedDate(): Date | undefined;
    get owner(): User;
    get afkChannel(): Channel | null;
    get widgetChannel(): Channel | null | undefined;
    get app(): import("./App").default | null;
    get systemChannel(): Channel | null;
    get rulesChannel(): Channel | null;
    get publicUpdatesChannel(): Channel | null;
    constructor(data: ClientObject & JSONServer);
    getDefaultMessageNotifications(): MessageNotificationLevel['value'] | null;
    getExplicitContentFilter(): ExplicitContentFilterLevel['value'] | null;
    getMFALevel(): MFALevel['value'] | null;
    getVerificationLevel(): VerificationLevel['value'] | null;
    getPremiumTier(): PremiumTier['value'] | null;
    getSystemChannelFlags(): SystemChannelFlag['value'][] | null;
    getIconURL(params: ImageParams): string | null;
    getSplashURL(params: ImageParams): string | null;
    getDiscoverySplashURL(params: ImageParams): string | null;
    getBannerURL(params: ImageParams): string | null;
}
interface JSONServerPreview {
    id: string;
    name: string;
    icon: string | null;
    splash: string | null;
    discovery_splash: string | null;
    emojis: JSONEmoji[];
    features: ServerFeature[];
    approximate_member_count: number;
    approximate_presence_count: number;
    description: string | null;
}
interface ServerPreview {
    flake: Flake;
    name: string;
    icon: string | null;
    splash: string | null;
    discoverySplash: string | null;
    emojis: Collection<bigint, Emoji>;
    features: ServerFeature[];
    roughMemberCount: number;
    roughPresenceCount: number;
    description: string | null;
}
declare class ServerPreview extends Base {
    protected _client: ClientObject['_client'];
    constructor(data: ClientObject & JSONServerPreview);
    getIconURL(params: ImageParams): string | null;
    getSplashURL(params: ImageParams): string | null;
    getDiscoverySplashURL(params: ImageParams): string | null;
}
interface JSONRole {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    position: number;
    permissions: string;
    managed: boolean;
    mentionable: boolean;
    tags?: JSONRoleTags;
}
interface Role {
    flake: Flake;
    name: string;
    colorDec?: number;
    isHoist?: boolean;
    position: number;
    bitPermission: BitSet;
    isManaged: boolean;
    isMentionable: boolean;
    tags?: RoleTags;
}
declare class Role extends Base {
    protected _client: ClientObject['_client'];
    get mention(): string;
    constructor(data: ClientObject & JSONRole);
}
interface JSONRoleTags {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
}
interface RoleTags {
    botFlake?: Flake;
    integrationFlake?: Flake;
    isPremiumSubscriber?: null;
}
declare class RoleTags extends Base {
    protected _client: ClientObject['_client'];
    get bot(): import("./App").default | undefined;
    get integration(): import("./Integration").default | undefined;
    constructor(data: ClientObject & JSONRoleTags);
}
interface JSONEmoji {
    id: string | null;
    name: string | null;
    roles?: string[];
    user?: JSONUser;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}
interface Emoji {
    flake: Flake | null;
    name: string | null;
    rolesFlake?: Flake[];
    user?: User;
    isWrapped?: boolean;
    isManaged?: boolean;
    isAnimated?: boolean;
    isAvailable?: boolean;
}
declare class Emoji extends Base {
    protected _client: ClientObject['_client'];
    get emojiName(): string | null;
    get roles(): Collection<bigint, Role> | undefined;
    constructor(data: ClientObject & JSONEmoji);
    getEmojiURL(params: ImageParams): string | null;
}
interface JSONServerMember {
    user?: JSONUser;
    nick: string | null;
    roles: string[];
    joined_at: string;
    premium_since?: string | null;
    deaf: boolean;
    mute: boolean;
    pending?: boolean;
    permissions?: string;
}
interface ServerMember {
    user?: User;
    nick: string | null;
    joinedTime: number;
    rolesFlake: Flake[];
    premiumTime?: number | null;
    isDeaf: boolean;
    isMute: boolean;
    isPending?: boolean;
    bitPermission?: BitSet;
}
declare class ServerMember extends Base {
    protected _client: ClientObject['_client'];
    get mention(): string | undefined;
    get joinedDate(): Date;
    get premiumDate(): Date | null | undefined;
    get roles(): Collection<bigint, Role>;
    constructor(data: ClientObject & JSONServerMember);
}
interface JSONBan {
    reason: string | null;
    user: JSONUser;
}
interface Ban {
    reason: string | null;
    user: User;
}
declare class Ban extends Base {
    protected _client: ClientObject['_client'];
    constructor(data: ClientObject & JSONBan);
}
interface JSONVoiceState {
    guild_id?: string;
    channel_id: string | null;
    user_id: string;
    member?: JSONServerMember;
    session_id: string;
    deaf: boolean;
    mute: boolean;
    self_deaf: boolean;
    self_mute: boolean;
    self_stream?: boolean;
    self_video: boolean;
    suppress: boolean;
}
interface VoiceState {
    serverFlake?: Flake;
    channelFlake: Flake | null;
    userFlake: Flake;
    member?: ServerMember;
    sessionID: string;
    isDeaf: boolean;
    isMute: boolean;
    isSelfDeaf: boolean;
    isSelfMute: boolean;
    isSelfStream?: boolean;
    isSelfVideo: boolean;
    isSuppress: boolean;
}
declare class VoiceState extends Base {
    protected _client: ClientObject['_client'];
    get server(): Server | undefined;
    get channel(): Channel | null;
    get user(): User;
    constructor(data: ClientObject & JSONVoiceState);
}
interface JSONVoiceRegion {
    id: string;
    name: string;
    vip: boolean;
    optimal: boolean;
    deprecated: boolean;
    custom: boolean;
}
interface VoiceRegion {
    id: string;
    name: string;
    isVIP: boolean;
    isOptimal: boolean;
    isDeprecated: boolean;
    isCustom: boolean;
}
declare class VoiceRegion extends Base {
    constructor(data: JSONVoiceRegion);
}
interface JSONServerWidget {
    enabled: boolean;
    channel_id: string | null;
}
interface ServerWidget {
    isEnabled: boolean;
    channelFlake: Flake | null;
}
declare class ServerWidget extends Base {
    protected _client: ClientObject['_client'];
    get channel(): Channel | null;
    constructor(data: ClientObject & JSONServerWidget);
}
interface JSONServerWidgetParams {
    [key: string]: unknown;
}
interface ServerWidgetParams {
    [key: string]: unknown;
}
declare class ServerWidgetParams extends Base {
    protected _client: ClientObject['_client'];
    constructor(data: ClientObject & JSONServerWidgetParams);
}
interface JSONTemplate {
    code: string;
    name: string;
    description: string | null;
    usage_count: number;
    creator_id: string;
    creator: JSONUser;
    created_at: string;
    updated_at: string;
    source_guild_id: string;
    serialized_source_guild: PartialObject<JSONServer>;
    is_dirty: boolean | null;
}
interface Template {
    code: string;
    name: string;
    description: string | null;
    usageCount: number;
    creatorFlake: Flake;
    creatorUser: User;
    createdTime: number;
    updatedTime: number;
    serverFlake: Flake;
    snapshotServer: PartialObject<Server>;
    isDirty: boolean | null;
}
declare class Template extends Base {
    protected _client: ClientObject['_client'];
    get createdDate(): Date;
    get updatedDate(): Date;
    get creator(): User;
    get server(): Server;
    constructor(data: ClientObject & JSONTemplate);
}
export default Server;
export { Ban, Emoji, Role, ServerMember, ServerPreview, ServerWidget, ServerWidgetParams, Template, VoiceRegion, VoiceState };
export type { ExplicitContentFilterLevel, JSONBan, JSONEmoji, JSONRole, JSONServer, JSONServerMember, JSONServerPreview, JSONServerWidget, JSONServerWidgetParams, JSONTemplate, JSONVoiceRegion, JSONVoiceState, MessageNotificationLevel, MFALevel, VerificationLevel, WidgetStyle };
