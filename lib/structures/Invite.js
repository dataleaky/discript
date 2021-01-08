"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InviteMetadata = void 0;
const Base_1 = require("../Base");
const Channel_1 = require("./Channel");
const Server_1 = require("./Server");
const User_1 = require("./User");
const TargetUserTypes = { 1: 'Stream' };
class Invite extends Base_1.default {
    constructor(data) {
        super();
        this._client = data._client;
        this.code = data.code;
        this.server = data.guild === undefined ? data.guild : new Server_1.default({ _client: this._client, ...data.guild });
        this.channel = data.channel === undefined ? data.channel : new Channel_1.default({ _client: this._client, ...data.channel });
        this.inviter = data.inviter === undefined ? data.inviter : new User_1.default({ _client: this._client, ...data.inviter });
        this.targetUser = data.target_user === undefined ? data.target_user : new User_1.default({ _client: this._client, ...data.target_user });
        this.targetUserType = data.target_user_type;
        this.roughPresenceCount = data.approximate_presence_count;
        this.roughMemberCount = data.approximate_member_count;
    }
    ;
    getTargetUserType() {
        const find = Object.entries(TargetUserTypes).find(element => element[0] === String(this.targetUserType));
        return find ? find[1] : null;
    }
    ;
}
class InviteMetadata extends Invite {
    get createdDate() {
        return this.createdTime === undefined ? this.createdTime : new Date(this.createdTime);
    }
    constructor(data) {
        super(data);
        this.uses = data.uses;
        this.maxUses = data.max_uses;
        this.maxAge = data.max_age * 1000;
        this.isTemporary = data.temporary;
        this.createdTime = data.created_at === undefined ? data.created_at : Date.parse(data.created_at);
    }
}
exports.InviteMetadata = InviteMetadata;
exports.default = Invite;
