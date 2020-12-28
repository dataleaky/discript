"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionTypes = exports.BitSet = void 0;
const Base_1 = require("../Base");
const Flake_1 = require("./Flake");
const PermissionTypes = { 0: 'Role', 1: 'Member' };
exports.PermissionTypes = PermissionTypes;
const BitwisePermissionFlags = { 1: 'Create Invite', 2: 'Kick Members', 4: 'Ban Members', 8: 'Administrator', 16: 'Manage Channels', 32: 'Manage Server', 64: 'Add Reactions', 128: 'View Audit Logs', 256: 'Priority Speaker', 512: 'Video', 1024: 'View Channels', 2048: 'Send Messages', 4096: 'Send TTS Messages', 8192: 'Manage Messages', 16384: 'Embed Links', 32768: 'Attach Files', 65536: 'Read Message History', 131072: 'Mention All Roles', 262144: 'Use External Emojis', 524288: 'View Server Insights', 1048576: 'Connect', 2097152: 'Speak', 4194304: 'Mute Members', 8388608: 'Deafen Members', 16777216: 'Move Members', 33554432: 'Use Voice Activity', 67108864: 'Change Nickname', 134217728: 'Manage Nicknames', 268435456: 'Manage Roles', 536870912: 'Manage Webhooks', 1073741824: 'Manage Emojis' };
const BitwisePermissionFlagsMFA = [2, 4, 8, 16, 32, 8192, 268435456, 536870912, 1073741824];
class Permission extends Base_1.default {
    constructor(data) {
        super();
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.type = data.type;
        this.allow = data.allow === undefined ? data.allow : new BitSet(data.allow);
        this.deny = data.deny === undefined ? data.deny : new BitSet(data.deny);
    }
    getType() {
        const find = Object.entries(PermissionTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
class BitSet extends Base_1.default {
    constructor(bits) {
        super();
        this.flags = BigInt(bits);
    }
    getFlags() {
        const find = Object.entries(BitwisePermissionFlags).filter(element => Number(element[0]) & Number(this.flags));
        return find.length ? find.map(element => element[1]) : null;
    }
    has(permission) {
        return (Array.isArray(permission) ? permission : [permission]).every(element => (Number(this.flags) & Number(element)) === Number(element));
    }
    isNeedMFA() {
        return BitwisePermissionFlagsMFA.some(element => element & Number(this.flags));
    }
}
exports.BitSet = BitSet;
exports.default = Permission;
