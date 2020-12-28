import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, ImageParams, KeyValueParse, PartialObject } from '../Types';
import type { ChannelType } from './Channel';
import Flake from './Flake';
import { Emoji, Role, ServerMember } from './Server';
import type { JSONEmoji, JSONServerMember } from './Server';
import User from './User';
import type { JSONUser } from './User';
import Webhook from './Webhook';
import type { JSONWebhook } from './Webhook';
declare const MessageTypes: {
    readonly 0: "Default";
    readonly 1: "Recipient Add";
    readonly 2: "Recipient Remove";
    readonly 3: "Call";
    readonly 4: "Channel Name Change";
    readonly 5: "Channel Icon Change";
    readonly 6: "Channel Pinned Message";
    readonly 7: "Server Member Join";
    readonly 8: "User Premium Server Subscription";
    readonly 9: "User Premium Server Subscription Tier 1";
    readonly 10: "User Premium Server Subscription Tier 2";
    readonly 11: "User Premium Server Subscription Tier 3";
    readonly 12: "Channel Follow Add";
    readonly 14: "Server Discovery Disqualified";
    readonly 15: "Server Discovery Requalified";
    readonly 19: "Reply";
    readonly 20: "App Command";
};
declare const MessageFlags: {
    readonly 1: "Crossposted";
    readonly 2: "Is Crosspost";
    readonly 4: "Suppress Embeds";
    readonly 8: "Source Message Deleted";
    readonly 16: "Urgent";
};
declare const MessageActivityTypes: {
    readonly 1: "Join";
    readonly 2: "Spectate";
    readonly 3: "Listen";
    readonly 5: "Join Request";
};
declare const MessageStickerFormatTypes: {
    readonly 1: "png";
    readonly 2: "apng";
    readonly 3: "lottie";
};
declare type MessageType = KeyValueParse<(typeof MessageTypes)>;
declare type MessageFlag = KeyValueParse<(typeof MessageFlags)>;
declare type MessageActivityType = KeyValueParse<(typeof MessageActivityTypes)>;
declare type MessageStickerFormatType = KeyValueParse<(typeof MessageStickerFormatTypes)>;
declare type EmbedType = 'rich' | 'image' | 'video' | 'gifv' | 'article' | 'link';
declare type AllowedMentionType = 'roles' | 'users' | 'everyone';
interface JSONMemberObject {
    member: PartialObject<JSONServerMember>;
}
interface MemberObject {
    member: PartialObject<ServerMember>;
}
interface JSONMessage {
    id: string;
    channel_id: string;
    guild_id?: string;
    author: JSONUser | PartialObject<JSONWebhook>;
    member?: PartialObject<JSONServerMember>;
    content: string;
    timestamp: string;
    edited_timestamp: string | null;
    tts: boolean;
    mention_everyone: boolean;
    mentions: (JSONUser & JSONMemberObject)[];
    mention_roles: string[];
    mention_channels?: JSONChannelMention[];
    attachments: JSONAttachment[];
    embeds: JSONEmbed[];
    reactions?: JSONReaction[];
    nonce?: number | string;
    pinned: boolean;
    webhook_id?: string;
    type: MessageType['key'];
    activity?: JSONMessageActivity;
    application?: JSONMessageApp;
    message_reference?: JSONMessageReference;
    flags?: number;
    stickers?: JSONMessageSticker[];
    referenced_message?: JSONMessage | null;
}
interface Message extends Base {
    flake: Flake;
    channelFlake: Flake;
    serverFlake?: Flake;
    author: User | PartialObject<Webhook>;
    member?: PartialObject<ServerMember>;
    content: string;
    timestamp: number;
    editedTime: number | null;
    isTTS: boolean;
    isMentionEveryone: boolean;
    mentionUsers: Collection<bigint, User & MemberObject>;
    mentionRolesFlake: Flake[];
    mentionChannels?: Collection<bigint, ChannelMention>;
    attachments: Collection<bigint, Attachment>;
    embeds: Embed[];
    reactions?: Reaction[];
    nonce?: string | number;
    isPinned: boolean;
    webhookFlake?: Flake;
    type: MessageType['key'];
    activity?: MessageActivity;
    app?: MessageApp;
    reference?: MessageReference;
    flags?: number;
    stickers?: Collection<bigint, MessageSticker>;
    replyMessage?: Message | null;
}
declare class Message extends Base {
    protected _client: ClientObject['client'];
    get date(): Date;
    get editedDate(): number | Date;
    get channel(): import("./Channel").default;
    get server(): import("./Server").default | undefined;
    get webhook(): Webhook | undefined;
    get mentionRoles(): Collection<bigint, Role>;
    constructor(data: ClientObject & JSONMessage);
    getType(): MessageType['value'] | null;
    getFlags(): MessageFlag['value'][] | null;
}
interface JSONMessageActivity {
    type: MessageActivityType['key'];
    party_id?: string;
}
interface MessageActivity {
    type: MessageActivityType['key'];
    partyFlake?: Flake;
}
declare class MessageActivity extends Base {
    protected _client: ClientObject['client'];
    get party(): import("./App").default | undefined;
    constructor(data: ClientObject & JSONMessageActivity);
    getType(): MessageActivityType['value'] | null;
}
interface JSONMessageApp {
    id: string;
    cover_image?: string;
    description: string;
    icon: string | null;
    name: string;
}
interface MessageApp extends Base {
    flake: Flake;
    coverImage?: string;
    description: string;
    icon: string | null;
    name: string;
}
declare class MessageApp extends Base {
    protected _client: ClientObject['client'];
    constructor(data: ClientObject & JSONMessageApp);
    getIconURL(params: ImageParams): string | null;
    getAssetURL(params: ImageParams): string | null;
}
interface JSONMessageReference {
    message_id?: string;
    channel_id?: string;
    guild_id?: string;
}
interface MessageReference {
    messageFlake?: Flake;
    channelFlake?: Flake;
    serverFlake?: Flake;
}
declare class MessageReference extends Base {
    constructor(data: JSONMessageReference);
}
interface JSONMessageSticker {
    id: string;
    pack_id: string;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    preview_asset: string | null;
    format_type: MessageStickerFormatType['key'];
}
interface MessageSticker {
    flake: Flake;
    packFlake: Flake;
    name: string;
    description: string;
    tags?: string;
    asset: string;
    previewAsset: string | null;
    formatType: MessageStickerFormatType['key'];
}
declare class MessageSticker extends Base {
    constructor(data: JSONMessageSticker);
    getFormatType(): MessageStickerFormatType['value'] | null;
}
interface JSONReaction {
    count: number;
    me: boolean;
    emoji: PartialObject<JSONEmoji>;
}
interface Reaction {
    count: number;
    isMe: boolean;
    emoji: PartialObject<Emoji>;
}
declare class Reaction extends Base {
    protected _client: ClientObject['client'];
    constructor(data: ClientObject & JSONReaction);
}
interface JSONEmbed {
    title?: string;
    type?: EmbedType;
    description?: string;
    url?: string;
    timestamp?: string;
    color?: number;
    footer?: JSONEmbedFooter;
    image?: JSONEmbedImage;
    thumbnail?: JSONEmbedThumbnail;
    video?: JSONEmbedVideo;
    provider?: JSONEmbedProvider;
    author?: JSONEmbedAuthor;
    fields?: JSONEmbedField[];
}
interface Embed {
    title?: string;
    type?: string;
    description?: string;
    url?: string;
    time?: number;
    colorDec?: number;
    footer?: EmbedFooter;
    image?: EmbedImage;
    thumbnail?: EmbedThumbnail;
    video?: EmbedVideo;
    provider?: EmbedProvider;
    author?: EmbedAuthor;
    fields?: EmbedField[];
}
declare class Embed extends Base {
    get date(): Date | undefined;
    constructor(data: JSONEmbed);
}
interface JSONEmbedThumbnail {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
interface EmbedThumbnail {
    url?: string;
    proxyURL?: string;
    height?: number;
    width?: number;
}
declare class EmbedThumbnail extends Base {
    constructor(data: JSONEmbedThumbnail);
}
interface JSONEmbedVideo {
    url?: string;
    height?: number;
    width?: number;
}
interface EmbedVideo {
    url?: string;
    height?: number;
    width?: number;
}
declare class EmbedVideo extends Base {
    constructor(data: JSONEmbedVideo);
}
interface JSONEmbedImage {
    url?: string;
    proxy_url?: string;
    height?: number;
    width?: number;
}
interface EmbedImage {
    url?: string;
    proxyURL?: string;
    height?: number;
    width?: number;
}
declare class EmbedImage extends Base {
    constructor(data: JSONEmbedImage);
}
interface JSONEmbedProvider {
    name?: string;
    url?: string;
}
interface EmbedProvider {
    name?: string;
    url?: string;
}
declare class EmbedProvider extends Base {
    constructor(data: JSONEmbedProvider);
}
interface JSONEmbedAuthor {
    name?: string;
    url?: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
interface EmbedAuthor {
    name?: string;
    url?: string;
    iconURL?: string;
    proxyIconURL?: string;
}
declare class EmbedAuthor extends Base {
    constructor(data: JSONEmbedAuthor);
}
interface JSONEmbedFooter {
    text: string;
    icon_url?: string;
    proxy_icon_url?: string;
}
interface EmbedFooter {
    text: string;
    iconURL?: string;
    proxyIconURL?: string;
}
declare class EmbedFooter extends Base {
    constructor(data: JSONEmbedFooter);
}
interface JSONEmbedField {
    name: string;
    value: string;
    inline?: boolean;
}
interface EmbedField {
    name: string;
    value: string;
    isInline?: boolean;
}
declare class EmbedField extends Base {
    constructor(data: JSONEmbedField);
}
interface JSONAttachment {
    id: string;
    filename: string;
    size: number;
    url: string;
    proxy_url: string;
    height: number | null;
    width: number | null;
}
interface Attachment {
    flake: Flake;
    filename: string;
    size: number;
    url: string;
    proxyURL: string;
    height: number | null;
    width: number | null;
}
declare class Attachment extends Base {
    constructor(data: JSONAttachment);
}
interface JSONChannelMention {
    id: string;
    guild_id: string;
    type: ChannelType['key'];
    name: string;
}
interface ChannelMention {
    flake: Flake;
    serverFlake: Flake;
    type: number;
    name: string;
}
declare class ChannelMention extends Base {
    protected _client: ClientObject['client'];
    get channel(): import("./Channel").default;
    get server(): import("./Server").default;
    constructor(data: ClientObject & JSONChannelMention);
    getType(): ChannelType['value'] | null;
}
interface JSONAllowedMentions {
    parse: AllowedMentionType[];
    roles: string[];
    users: string[];
    replied_user: boolean;
}
interface AllowedMentions {
    parse: AllowedMentionType[];
    roles: Flake[];
    users: Flake[];
    isRepliedUser: boolean;
}
declare class AllowedMentions extends Base {
    constructor(data: JSONAllowedMentions);
}
export default Message;
export { AllowedMentions };
export type { JSONEmbed, JSONMessage };
