import Base from '../Base';
import type { ClientObject, DiscordLocales, ImageParams, KeyValueParse } from '../Types';
import Flake from './Flake';
declare const UserFlags: {
    readonly 0: "None";
    readonly 1: "Discord Employee";
    readonly 2: "Partnered Server Owner";
    readonly 4: "HypeSquad Events";
    readonly 8: "Bug Hunter Level 1";
    readonly 64: "House Bravery";
    readonly 128: "House Brilliance";
    readonly 256: "House Balance";
    readonly 512: "Early Supporter";
    readonly 1024: "Team User";
    readonly 4096: "System";
    readonly 16384: "Bug Hunter Level 2";
    readonly 65536: "Verified Bot";
    readonly 131072: "Early Verified Bot Developer";
};
declare const PremiumTypes: {
    readonly 0: "None";
    readonly 1: "Nitro Classic";
    readonly 2: "Nitro";
};
declare type UserFlag = KeyValueParse<(typeof UserFlags)>;
declare type PremiumType = KeyValueParse<(typeof PremiumTypes)>;
interface JSONUser {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    locale?: DiscordLocales;
    verified?: boolean;
    email?: string | null;
    flags?: number;
    premium_type?: PremiumType['key'];
    public_flags?: number;
}
interface User {
    flake: Flake;
    username: string;
    tag: string;
    avatar: string | null;
    isBot?: boolean;
    isSystem?: boolean;
    isMFA?: boolean;
    locale?: string;
    isVerified?: boolean;
    email?: string | null;
    flags?: number;
    premiumType?: PremiumType['key'];
}
declare class User extends Base {
    protected _client: ClientObject['_client'];
    get mention(): `<@${bigint}>`;
    get fullName(): `${string}#${string}`;
    constructor(data: ClientObject & JSONUser);
    getAvatarURL(params: ImageParams): string | null;
    getFlags(): UserFlag['value'][] | null;
    getPremiumType(): PremiumType['value'] | null;
}
export default User;
export type { JSONUser };
