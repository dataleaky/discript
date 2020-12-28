import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, ImageParams, KeyValueParse, PartialObject } from '../Types';
import Flake from './Flake';
import User from './User';
import type { JSONUser } from './User';
declare const IntegrationExpireBehaviors: {
    readonly 0: "Remove role";
    readonly 1: "Kick";
};
declare const VisibilityTypes: {
    readonly 0: "None";
    readonly 1: "Everyone";
};
declare type IntegrationExpireBehavior = KeyValueParse<(typeof IntegrationExpireBehaviors)>;
declare type VisibilityType = KeyValueParse<(typeof VisibilityTypes)>;
interface JSONIntegration {
    id: string;
    name: string;
    type: string;
    enabled: boolean;
    syncing?: boolean;
    role_id?: string;
    enable_emoticons?: boolean;
    expire_behavior?: IntegrationExpireBehavior['key'];
    expire_grace_period?: number;
    user?: JSONUser;
    account: JSONIntegrationAccount;
    synced_at?: string;
    subscriber_count?: number;
    revoked?: boolean;
    application?: JSONIntegrationApp;
}
interface Integration {
    flake: Flake;
    name: string;
    type: string;
    isEnabled: boolean;
    isSyncing?: boolean;
    roleFlake?: Flake;
    isEmojis?: boolean;
    expireBehavior?: IntegrationExpireBehavior['key'];
    expireGracePeriod?: number;
    user?: User;
    account: IntegrationAccount;
    syncedTime?: number;
    subscriberСount?: number;
    isRevoked?: boolean;
    app?: IntegrationApp;
}
declare class Integration extends Base {
    protected _client: ClientObject['client'];
    get syncedDate(): Date | undefined;
    get role(): import("./Server").Role | undefined;
    constructor(data: ClientObject & JSONIntegration);
    getExpireBehavior(): IntegrationExpireBehavior['value'] | null;
}
interface JSONIntegrationAccount {
    id: string;
    name: string;
}
interface IntegrationAccount {
    flake: Flake;
    name: string;
}
declare class IntegrationAccount extends Base {
    protected _client: ClientObject['client'];
    get user(): User;
    constructor(data: ClientObject & JSONIntegrationAccount);
}
interface JSONIntegrationApp {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    summary: string;
    bot?: JSONUser;
}
interface IntegrationApp {
    flake: Flake;
    name: string;
    icon: string | null;
    description: string;
    summary: string;
    bot?: User;
}
declare class IntegrationApp extends Base {
    protected _client: ClientObject['client'];
    get app(): import("./App").default;
    constructor(data: ClientObject & JSONIntegrationApp);
    getIconURL(params: ImageParams): string | null;
}
interface JSONConnection {
    id: string;
    name: string;
    type: string;
    revoked?: boolean;
    integrations?: PartialObject<JSONIntegration>[];
    verified: boolean;
    friend_sync: boolean;
    show_activity: boolean;
    visibility: VisibilityType['key'];
}
interface Connection {
    flake: Flake;
    name: string;
    type: string;
    isRevoked?: boolean;
    integrations?: Collection<bigint, PartialObject<Integration>>;
    isVerified: boolean;
    isFriendSync: boolean;
    isShowActivity: boolean;
    visibilityType: VisibilityType['key'];
}
declare class Connection extends Base {
    protected _client: ClientObject['client'];
    get user(): User;
    constructor(data: ClientObject & JSONConnection);
    getVisibilityType(): VisibilityType['value'] | null;
}
export default Integration;
export { Connection };
export type { JSONConnection, JSONIntegration };
