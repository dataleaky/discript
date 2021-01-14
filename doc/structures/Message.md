# Message extends Base 

#### flake: Flake;
#### channelFlake: Flake;
#### serverFlake?: Flake;
#### author: User;
#### member?: PartialObject<ServerMember>;
#### content: string;
#### timestamp: number;
#### editedTime: number | null;
#### isTTS: boolean;
#### isMentionEveryone: boolean;
#### mentionUsers: Collection<bigint, User & MemberObject>;
#### mentionRolesFlake: Flake[];
#### mentionChannels?: Collection<bigint, ChannelMention>;
#### attachments: Collection<bigint, Attachment>;
#### embeds: Embed[];
#### reactions?: Reaction[];
#### nonce?: string | number;
#### isPinned: boolean;
#### webhookFlake?: Flake;
#### type: MessageType['key'];
#### activity?: MessageActivity;
#### app?: MessageApp;
#### reference?: MessageReference;
#### flags?: number;
#### stickers?: Collection<bigint, MessageSticker>;
#### replyMessage?: Message | null;
#### date: Date;
#### editedDate: number | Date;
#### channel: import("./Channel").default;
#### server: import("./Server").default | undefined;
#### webhook: import("./Webhook").default | undefined;
#### mentionRoles: Collection<bigint, Role>;
#### constructor(data: ClientObject & JSONMessage);
#### getType(): MessageType['value'] | null;
#### getFlags(): MessageFlag['value'][] | null;

# MessageActivity extends Base 

#### type: MessageActivityType['key'];
#### partyFlake?: Flake;
#### party: import("./App").default | undefined;
#### constructor(data: ClientObject & JSONMessageActivity);
#### getType(): MessageActivityType['value'] | null;

# MessageApp extends Base 

#### flake: Flake;
#### coverImage?: string;
#### description: string;
#### icon: string | null;
#### name: string;
#### constructor(data: ClientObject & JSONMessageApp);
#### getIconURL(params: ImageParams): string | null;
#### getAssetURL(params: ImageParams): string | null;

# MessageReference extends Base 

#### messageFlake?: Flake;
#### channelFlake?: Flake;
#### serverFlake?: Flake;
#### constructor(data: JSONMessageReference);

# MessageSticker extends Base 

#### flake: Flake;
#### packFlake: Flake;
#### name: string;
#### description: string;
#### tags?: string;
#### asset: string;
#### previewAsset: string | null;
#### formatType: MessageStickerFormatType['key'];
#### constructor(data: JSONMessageSticker);
#### getFormatType(): MessageStickerFormatType['value'] | null;

# Reaction extends Base 

#### count: number;
#### isMe: boolean;
#### emoji: PartialObject<Emoji>;
#### constructor(data: ClientObject & JSONReaction);

# Embed extends Base 

#### title?: string;
#### type?: string;
#### description?: string;
#### url?: string;
#### time?: number;
#### colorDec?: number;
#### footer?: EmbedFooter;
#### image?: EmbedImage;
#### thumbnail?: EmbedThumbnail;
#### video?: EmbedVideo;
#### provider?: EmbedProvider;
#### author?: EmbedAuthor;
#### fields?: EmbedField[];
#### date: Date | undefined;
#### constructor(data: JSONEmbed);

# EmbedThumbnail extends Base 

#### url?: string;
#### proxyURL?: string;
#### height?: number;
#### width?: number;
#### constructor(data: JSONEmbedThumbnail);

# EmbedVideo extends Base 

#### url?: string;
#### proxyURL?: string;
#### height?: number;
#### width?: number;
#### constructor(data: JSONEmbedVideo);

# EmbedImage extends Base 

#### url?: string;
#### proxyURL?: string;
#### height?: number;
#### width?: number;
#### constructor(data: JSONEmbedImage);

# EmbedProvider extends Base 

#### name?: string;
#### url?: string;
#### constructor(data: JSONEmbedProvider);

# EmbedAuthor extends Base 

#### name?: string;
#### url?: string;
#### iconURL?: string;
#### proxyIconURL?: string;
#### constructor(data: JSONEmbedAuthor);

# EmbedFooter extends Base 

#### text: string;
#### iconURL?: string;
#### proxyIconURL?: string;
#### constructor(data: JSONEmbedFooter);

# EmbedField extends Base 

#### name: string;
#### value: string;
#### isInline?: boolean;
#### constructor(data: JSONEmbedField);

# Attachment extends Base 

#### flake: Flake;
#### filename: string;
#### size: number;
#### url: string;
#### proxyURL: string;
#### height: number | null;
#### width: number | null;
#### constructor(data: JSONAttachment);

# ChannelMention extends Base 

#### flake: Flake;
#### serverFlake: Flake;
#### type: number;
#### name: string;
#### channel: import("./Channel").default;
#### server: import("./Server").default;
#### constructor(data: ClientObject & JSONChannelMention);
#### getType(): ChannelType['value'] | null;

# AllowedMentions extends Base 

#### parse: AllowedMentionType[];
#### roles: Flake[];
#### users: Flake[];
#### isRepliedUser: boolean;
#### constructor(data: JSONAllowedMentions);

