# User extends Base 

#### flake: Flake;
#### username: string;
#### tag: string;
#### avatar: string | null;
#### isBot?: boolean;
#### isSystem?: boolean;
#### isMFA?: boolean;
#### locale?: string;
#### isVerified?: boolean;
#### email?: string | null;
#### flags?: number;
#### premiumType?: PremiumType['key'];
#### mention: `<@${bigint}>`;
#### fullName: `${string}#${string}`;
#### constructor(data: ClientObject & JSONUser);
#### getAvatarURL(params: ImageParams): string | null;
#### getFlags(): UserFlag['value'][] | null;
#### getPremiumType(): PremiumType['value'] | null;

