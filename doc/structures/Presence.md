# Presence extends Base 

#### user: User;
#### serverFlake: Flake;
#### status: PresenceTypes;
#### activities: Activity[];
#### clientStatus: ClientStatus;
#### server: import("./Server").default;
#### constructor(data: ClientObject & JSONPresence);

# ClientStatus extends Base 

#### desktop?: ActiveSessions;
#### mobile?: ActiveSessions;
#### web?: ActiveSessions;
#### constructor(data: JSONClientStatus);

# Activity extends Base 

#### name: string;
#### type: ActivityType['key'];
#### url?: string | null;
#### createdTime: number;
#### timestamps?: ActivityTimestamps;
#### appFlake?: Flake;
#### details?: string | null;
#### state?: string | null;
#### emoji?: ActivityEmoji | null;
#### party?: ActivityParty;
#### assets?: ActivityAssets;
#### secrets?: ActivitySecrets;
#### isInstance?: boolean;
#### flags?: number;
#### createdDate: Date;
#### app: import("./App").default | undefined;
#### constructor(data: ClientObject & JSONActivity);
#### getType(): ActivityType['value'] | null;
#### getFlags(): ActivityFlag['value'][] | null;

# ActivityTimestamps extends Base 

#### startTime?: number;
#### endTime?: number;
#### startDate: Date | undefined;
#### endDate: Date | undefined;
#### constructor(data: JSONActivityTimestamps);

# ActivityEmoji extends Base 

#### name: string;
#### flake?: Flake;
#### isAnimated?: boolean;
#### emoji: import("./Server").Emoji | undefined;
#### constructor(data: ClientObject & JSONActivityEmoji);
#### getEmojiURL(params: ImageParams): string | undefined;

# ActivityParty extends Base 

#### flake?: Flake;
#### size?: [number, number];
#### app: import("./App").default | undefined;
#### constructor(data: ClientObject & JSONActivityParty);

# ActivityAssets extends Base 

#### largeImage?: string;
#### largeText?: string;
#### smallImage?: string;
#### smallText?: string;
#### constructor(data: ClientObject & JSONActivityAssets & AppFlakeObject);
#### getLargeImageURL(params: ImageParams): string | undefined;
#### getSmallImageURL(params: ImageParams): string | undefined;

# ActivitySecrets extends Base 

#### join?: string;
#### spectate?: string;
#### match?: string;
#### constructor(data: JSONActivitySecrets);

