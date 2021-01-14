# Integration extends Base 

#### flake: Flake;
#### name: string;
#### type: string;
#### isEnabled: boolean;
#### isSyncing?: boolean;
#### roleFlake?: Flake;
#### isEmojis?: boolean;
#### expireBehavior?: IntegrationExpireBehavior['key'];
#### expireGracePeriod?: number;
#### user?: User;
#### account: IntegrationAccount;
#### syncedTime?: number;
#### subscriberСount?: number;
#### isRevoked?: boolean;
#### app?: IntegrationApp;
#### syncedDate: Date | undefined;
#### role: import("./Server").Role | undefined;
#### constructor(data: ClientObject & JSONIntegration);
#### getExpireBehavior(): IntegrationExpireBehavior['value'] | null;

# IntegrationAccount extends Base 

#### flake: Flake;
#### name: string;
#### user: User;
#### constructor(data: ClientObject & JSONIntegrationAccount);

# IntegrationApp extends Base 

#### flake: Flake;
#### name: string;
#### icon: string | null;
#### description: string;
#### summary: string;
#### bot?: User;
#### app: import("./App").default;
#### constructor(data: ClientObject & JSONIntegrationApp);
#### getIconURL(params: ImageParams): string | null;

# Connection extends Base 

#### flake: Flake;
#### name: string;
#### type: string;
#### isRevoked?: boolean;
#### integrations?: Collection<bigint, PartialObject<Integration>>;
#### isVerified: boolean;
#### isFriendSync: boolean;
#### isShowActivity: boolean;
#### visibilityType: VisibilityType['key'];
#### user: User;
#### constructor(data: ClientObject & JSONConnection);
#### getVisibilityType(): VisibilityType['value'] | null;

