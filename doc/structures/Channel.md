# Channel extends Base 

#### flake: Flake;
#### type: ChannelType['key'];
#### serverFlake?: Flake;
#### position?: number;
#### permissions?: Collection<bigint, Permission>;
#### name?: string;
#### topic?: string | null;
#### isNSFW?: boolean;
#### lastMessageFlake?: Flake | null;
#### bitrate?: number;
#### userLimit?: number;
#### slowmode?: number;
#### recipients?: Collection<bigint, User>;
#### icon?: string | null;
#### ownerFlake?: Flake;
#### appFlake?: Flake;
#### parentFlake?: Flake | null;
#### lastPinTime?: number | null;
#### mention: `<#${bigint}>`;
#### lastPinDate: Date | null | undefined;
#### server: import("./Server").default | undefined;
#### lastMessage: import("./Server").Emoji | null | undefined;
#### owner: User | undefined;
#### app: import("./App").default | undefined;
#### parent: Channel | null | undefined;
#### constructor(data: ClientObject & JSONChannel);
#### getType(): "Server Text" | "DM" | "Server Voice" | "Group DM" | "Server Category" | "Server News" | "Server Store" | null;

# FollowedChannel extends Base 

#### channelFlake: Flake;
#### webhookFlake: Flake;
#### channel: Channel;
#### webhook: import("./Webhook").default;
#### constructor(data: ClientObject & JSONFollowedChannel);

