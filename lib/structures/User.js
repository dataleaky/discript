"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Flake_1 = require("./Flake");
const UserFlags = { 0: 'None', 1: 'Discord Employee', 2: 'Partnered Server Owner', 4: 'HypeSquad Events', 8: 'Bug Hunter Level 1', 64: 'House Bravery', 128: 'House Brilliance', 256: 'House Balance', 512: 'Early Supporter', 1024: 'Team User', 4096: 'System', 16384: 'Bug Hunter Level 2', 65536: 'Verified Bot', 131072: 'Early Verified Bot Developer' };
const PremiumTypes = { 0: 'None', 1: 'Nitro Classic', 2: 'Nitro' };
class User extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.username = data.username;
        this.tag = data.discriminator;
        this.avatar = data.avatar;
        this.isBot = data.bot;
        this.isSystem = data.system;
        this.isMFA = data.mfa_enabled;
        this.locale = data.locale;
        this.isVerified = data.verified;
        this.email = data.email;
        this.flags = data.flags;
        this.premiumType = data.premium_type;
    }
    get mention() {
        return this.flake === undefined ? this.flake : `<@${this.flake.id}>`;
    }
    get fullName() {
        return this.username === undefined ? this.username : this.tag === undefined ? this.tag : `${this.username}#${this.tag}`;
    }
    getAvatarURL(params) {
        return this.avatar === undefined || this.avatar === null ? this.tag === undefined ? null : this.client.getUserAvatarDefaultURL({ tag: this.tag }) : this.client.getUserAvatarURL({ format: params.format, size: params.size, avatar: this.avatar, id: String(this.flake.id) });
    }
    getFlags() {
        const find = Object.entries(UserFlags).filter(element => Number(element[0]) & Number(this.flags));
        return find.length ? find.map(element => element[1]) : null;
    }
    getPremiumType() {
        const find = Object.entries(PremiumTypes).find(element => element[0] === String(this.premiumType));
        return find ? find[1] : null;
    }
}
exports.default = User;
