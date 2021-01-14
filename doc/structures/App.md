# App extends Base 

#### flake: Flake;
#### name: string;
#### icon: string | null;
#### description: string;
#### rpcOrigins?: string[];
#### isPublic: boolean;
#### isCodeGrant: boolean;
#### owner: PartialObject<User>;
#### summary: string;
#### verifyKey: string;
#### team: Team | null;
#### serverFlake?: Flake;
#### skuFlake?: Flake;
#### slug?: string;
#### coverImage?: string;
#### flags: number;
#### server: import("./Server").default | undefined;
#### constructor(data: ClientObject & JSONApp);
#### getIconURL(params: ImageParams): string | null;

# Team extends Base 

#### icon: string | null;
#### flake: Flake;
#### members: Collection<bigint, TeamMember>;
#### ownerFlake: Flake;
#### owner: User;
#### constructor(data: ClientObject & JSONTeam);
#### getIconURL(params: ImageParams): string | null;

# TeamMember extends Base 

#### membershipState: number;
#### permissions: string[];
#### teamFlake: Flake;
#### user: PartialObject<User>;
#### team: App;
#### constructor(data: ClientObject & JSONTeamMember);
#### getMembershipState(): MembershipStateType['value'] | null;

