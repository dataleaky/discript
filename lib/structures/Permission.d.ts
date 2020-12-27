import Base from '../Base';
import type { KeyValueParse } from '../Types';
import Flake from './Flake';
declare const PermissionTypes: {
    readonly 0: "Role";
    readonly 1: "Member";
};
declare const BitwisePermissionFlags: {
    readonly 1: "Create Invite";
    readonly 2: "Kick Members";
    readonly 4: "Ban Members";
    readonly 8: "Administrator";
    readonly 16: "Manage Channels";
    readonly 32: "Manage Server";
    readonly 64: "Add Reactions";
    readonly 128: "View Audit Logs";
    readonly 256: "Priority Speaker";
    readonly 512: "Video";
    readonly 1024: "View Channels";
    readonly 2048: "Send Messages";
    readonly 4096: "Send TTS Messages";
    readonly 8192: "Manage Messages";
    readonly 16384: "Embed Links";
    readonly 32768: "Attach Files";
    readonly 65536: "Read Message History";
    readonly 131072: "Mention All Roles";
    readonly 262144: "Use External Emojis";
    readonly 524288: "View Server Insights";
    readonly 1048576: "Connect";
    readonly 2097152: "Speak";
    readonly 4194304: "Mute Members";
    readonly 8388608: "Deafen Members";
    readonly 16777216: "Move Members";
    readonly 33554432: "Use Voice Activity";
    readonly 67108864: "Change Nickname";
    readonly 134217728: "Manage Nicknames";
    readonly 268435456: "Manage Roles";
    readonly 536870912: "Manage Webhooks";
    readonly 1073741824: "Manage Emojis";
};
declare type PermissionType = KeyValueParse<(typeof PermissionTypes)>;
declare type BitwisePermissionFlag = KeyValueParse<(typeof BitwisePermissionFlags)>;
interface JSONPermission {
    id: string;
    type: PermissionType;
    allow: string;
    deny: string;
}
interface Permission {
    flake: Flake;
    type: PermissionType;
    allow: BitSet;
    deny: BitSet;
}
declare class Permission extends Base {
    constructor(data: JSONPermission);
    getType(): PermissionType['value'] | null;
}
interface BitSet {
    flags: bigint;
}
declare class BitSet extends Base {
    constructor(bits: bigint | string | number);
    getFlags(): BitwisePermissionFlag['value'][] | null;
    has(permission: bigint | bigint[]): boolean;
    isNeedMFA(): boolean;
}
export default Permission;
export { BitSet, PermissionTypes };
export type { JSONPermission, PermissionType };
