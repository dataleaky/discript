"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const MembershipStateTypes = { 1: 'Invited', 2: 'Accepted' };
class Application extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.rpcOrigins = data.rpc_origins;
        this.isPublic = data.bot_public;
        this.isCodeGrant = data.bot_require_code_grant;
        this.owner = data.owner === undefined ? data.owner : new User_1.default({ client: this.client, ...data.owner });
        this.summary = data.summary;
        this.verifyKey = data.verify_key;
        this.team = data.team === undefined || data.team === null ? null : new Team({ client: this.client, ...data.team });
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.skuFlake = data.primary_sku_id === undefined ? data.primary_sku_id : new Flake_1.default(data.primary_sku_id);
        this.slug = data.slug;
        this.coverImage = data.cover_image;
        this.flags = data.flags;
    }
    getIconURL(params) {
        return this.icon === undefined || this.icon === null ? this.icon : this.client.getApplicationIconURL({ format: params.format, size: params.size, icon: this.icon, appID: String(this.flake.id) });
    }
}
class Team extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.icon = data.icon;
        this.members = data.members === undefined ? data.members : (() => {
            const collection = new Collection_1.default();
            for (const object of data.members) {
                const subject = new TeamMember({ client: this.client, ...object });
                collection.set(subject.user.flake.id, subject);
            }
            return collection;
        })();
        this.ownerFlake = new Flake_1.default(data.owner_user_id);
    }
    getIconURL(params) {
        return this.icon === undefined || this.icon === null ? this.icon : this.client.getTeamIconURL({ format: params.format, size: params.size, icon: this.icon, id: String(this.flake.id) });
    }
}
class TeamMember extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.membershipState = data.membership_state;
        this.permissions = data.permissions;
        this.teamFlake = new Flake_1.default(data.team_id);
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this.client, ...data.user });
    }
    getMembershipState() {
        const find = Object.entries(MembershipStateTypes).find(element => element[0] === String(this.membershipState));
        return find ? find[1] : null;
    }
}
exports.default = Application;
