import Base from '../Base';
import type { ClientObject, ImageParams, KeyValueParse, PartialObject } from '../Types';
import Flake from './Flake';
import User from './User';
import type { JSONUser } from './User';
declare const ActivityTypes: {
    readonly 0: "Game";
    readonly 1: "Streaming";
    readonly 2: "Listening";
    readonly 4: "Custom";
    readonly 5: "Competing";
};
declare const ActivityFlags: {
    readonly 1: "Instance";
    readonly 2: "Join";
    readonly 4: "Spectate";
    readonly 8: "Join Request";
    readonly 16: "Sync";
    readonly 32: "Play";
};
declare type ActivityType = KeyValueParse<(typeof ActivityTypes)>;
declare type ActivityFlag = KeyValueParse<(typeof ActivityFlags)>;
declare type ActiveSessions = 'online' | 'idle' | 'dnd';
declare type PresenceTypes = ActiveSessions | 'offline';
declare type StatusTypes = PresenceTypes | 'invisible';
interface AppFlakeObject {
    appFlake?: Flake;
}
interface JSONPresence {
    user: PartialObject<JSONUser>;
    guild_id: string;
    status: PresenceTypes;
    activities: JSONActivity[];
    client_status: JSONClientStatus;
}
interface Presence {
    user: User;
    serverFlake: Flake;
    status: PresenceTypes;
    activities: Activity[];
    clientStatus: ClientStatus;
}
declare class Presence extends Base {
    protected _client: ClientObject['client'];
    get server(): import("./Server").default;
    constructor(data: ClientObject & JSONPresence);
}
interface JSONClientStatus {
    desktop?: ActiveSessions;
    mobile?: ActiveSessions;
    web?: ActiveSessions;
}
interface ClientStatus {
    desktop?: ActiveSessions;
    mobile?: ActiveSessions;
    web?: ActiveSessions;
}
declare class ClientStatus extends Base {
    constructor(data: JSONClientStatus);
}
interface JSONActivity {
    name: string;
    type: ActivityType['key'];
    url?: string | null;
    created_at: number;
    timestamps?: JSONActivityTimestamps;
    application_id?: string;
    details?: string | null;
    state?: string | null;
    emoji?: JSONActivityEmoji | null;
    party?: JSONActivityParty;
    assets?: JSONActivityAssets;
    secrets?: JSONActivitySecrets;
    instance?: boolean;
    flags?: number;
}
interface Activity {
    name: string;
    type: ActivityType['key'];
    url?: string | null;
    createdTime: number;
    timestamps?: ActivityTimestamps;
    appFlake?: Flake;
    details?: string | null;
    state?: string | null;
    emoji?: ActivityEmoji | null;
    party?: ActivityParty;
    assets?: ActivityAssets;
    secrets?: ActivitySecrets;
    isInstance?: boolean;
    flags?: number;
}
declare class Activity extends Base {
    protected _client: ClientObject['client'];
    get createdDate(): Date;
    get app(): import("./App").default | undefined;
    constructor(data: ClientObject & JSONActivity);
    getType(): ActivityType['value'] | null;
    getFlags(): ActivityFlag['value'][] | null;
}
interface JSONActivityTimestamps {
    start?: number;
    end?: number;
}
interface ActivityTimestamps {
    startTime?: number;
    endTime?: number;
}
declare class ActivityTimestamps extends Base {
    get startDate(): Date | undefined;
    get endDate(): Date | undefined;
    constructor(data: JSONActivityTimestamps);
}
interface JSONActivityEmoji {
    name: string;
    id?: string;
    animated?: boolean;
}
interface ActivityEmoji {
    name: string;
    flake?: Flake;
    isAnimated?: boolean;
}
declare class ActivityEmoji extends Base {
    protected _client: ClientObject['client'];
    get emoji(): import("./Server").Emoji | undefined;
    constructor(data: ClientObject & JSONActivityEmoji);
    getEmojiURL(params: ImageParams): string | undefined;
}
interface JSONActivityParty {
    id?: string;
    size?: [number, number];
}
interface ActivityParty {
    flake?: Flake;
    size?: [number, number];
}
declare class ActivityParty extends Base {
    protected _client: ClientObject['client'];
    get app(): import("./App").default | undefined;
    constructor(data: ClientObject & JSONActivityParty);
}
interface JSONActivityAssets {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
}
interface ActivityAssets {
    largeImage?: string;
    largeText?: string;
    smallImage?: string;
    smallText?: string;
}
declare class ActivityAssets extends Base {
    protected _client: ClientObject['client'];
    protected _appFlake?: AppFlakeObject['appFlake'];
    constructor(data: ClientObject & JSONActivityAssets & AppFlakeObject);
    getLargeImageURL(params: ImageParams): string | undefined;
    getSmallImageURL(params: ImageParams): string | undefined;
}
interface JSONActivitySecrets {
    join?: string;
    spectate?: string;
    match?: string;
}
interface ActivitySecrets {
    join?: string;
    spectate?: string;
    match?: string;
}
declare class ActivitySecrets extends Base {
    constructor(data: JSONActivitySecrets);
}
export default Presence;
export { Activity };
export type { JSONActivity, JSONPresence, StatusTypes };
