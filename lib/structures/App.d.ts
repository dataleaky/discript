import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, ImageParams, KeyValueParse, PartialObject } from '../Types';
import Flake from './Flake';
import User from './User';
import type { JSONUser } from './User';
declare const MembershipStateTypes: {
    readonly 1: "Invited";
    readonly 2: "Accepted";
};
declare type MembershipStateType = KeyValueParse<(typeof MembershipStateTypes)>;
interface JSONApp {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    rpc_origins?: string[];
    bot_public: boolean;
    bot_require_code_grant: boolean;
    owner: PartialObject<JSONUser>;
    summary: string;
    verify_key: string;
    team: JSONTeam | null;
    guild_id?: string;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
    flags: number;
}
interface App {
    flake: Flake;
    name: string;
    icon: string | null;
    description: string;
    rpcOrigins?: string[];
    isPublic: boolean;
    isCodeGrant: boolean;
    owner: PartialObject<User>;
    summary: string;
    verifyKey: string;
    team: Team | null;
    serverFlake?: Flake;
    skuFlake?: Flake;
    slug?: string;
    coverImage?: string;
    flags: number;
}
declare class App extends Base {
    protected _client: ClientObject['client'];
    get server(): import("./Server").default | undefined;
    constructor(data: ClientObject & JSONApp);
    getIconURL(params: ImageParams): string | null;
}
interface JSONTeam {
    icon: string | null;
    id: string;
    members: JSONTeamMember[];
    owner_user_id: string;
}
interface Team {
    icon: string | null;
    flake: Flake;
    members: Collection<bigint, TeamMember>;
    ownerFlake: Flake;
}
declare class Team extends Base {
    protected _client: ClientObject['client'];
    get owner(): User;
    constructor(data: ClientObject & JSONTeam);
    getIconURL(params: ImageParams): string | null;
}
interface JSONTeamMember {
    membership_state: MembershipStateType['key'];
    permissions: string[];
    team_id: string;
    user: PartialObject<JSONUser>;
}
interface TeamMember {
    membershipState: number;
    permissions: string[];
    teamFlake: Flake;
    user: PartialObject<User>;
}
declare class TeamMember extends Base {
    protected _client: ClientObject['client'];
    get team(): App;
    constructor(data: ClientObject & JSONTeamMember);
    getMembershipState(): MembershipStateType['value'] | null;
}
export default App;
export type { JSONApp };
