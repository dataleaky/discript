"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const Integration_1 = require("./Integration");
const Permission_1 = require("./Permission");
const Server_1 = require("./Server");
const User_1 = require("./User");
const Webhook_1 = require("./Webhook");
const AuditLogEvents = { 1: 'Server Update', 10: 'Channel Create', 11: 'Channel Update', 12: 'Channel Delete', 13: 'Channel Overwrite Create', 14: 'Channel Overwrite Update', 15: 'Channel Overwrite Delete', 20: 'Member Kick', 21: 'Member Prune', 22: 'Member Ban Add', 23: 'Member Ban Remove', 24: 'Member Update', 25: 'Member Role Update', 26: 'Member Move', 27: 'Member Disconnect', 28: 'Bot Add', 30: 'Role Create', 31: 'Role Update', 32: 'Role Delete', 40: 'Invite Create', 41: 'Invite Update', 42: 'Invite Delete', 50: 'Webhook Create', 51: 'Webhook Update', 52: 'Webhook Delete', 60: 'Emoji Create', 61: 'Emoji Update', 62: 'Emoji Delete', 72: 'Message Delete', 73: 'Message Bulk Delete', 74: 'Message Pin', 75: 'Message Unpin', 80: 'Integration Create', 81: 'Integration Update', 82: 'Integration Delete' };
const AuditLogChangeKeys = {
    name: ['name', (element) => element], icon_hash: ['icon', (element) => element], splash_hash: ['splash', (element) => element], owner_id: ['ownerFlake', (element) => new Flake_1.default(element)], region: ['region', (element) => element], afk_channel_id: ['afkChannelFlake', (element) => new Flake_1.default(element)], afk_timeout: ['afkTimeout', (element) => element], mfa_level: ['mfaLevel', (element) => element], verification_level: ['verificationLevel', (element) => element], explicit_content_filter: ['explicitFilter', (element) => element], default_message_notifications: ['defaultNotifications', (element) => element], vanity_url_code: ['vanityCode', (element) => element], $add: ['add', (element) => {
            const collection = new Collection_1.default();
            for (const object of element) {
                const subject = new Server_1.Role(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        }], $remove: ['remove', (element) => {
            const collection = new Collection_1.default();
            for (const object of element) {
                const subject = new Server_1.Role(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        }], prune_delete_days: ['days', (element) => element], widget_enabled: ['isWidget', (element) => element], widget_channel_id: ['widgetChannelFlake', (element) => new Flake_1.default(element)], system_channel_id: ['systemChannelFlake', (element) => new Flake_1.default(element)], position: ['position', (element) => element], topic: ['topic', (element) => element], bitrate: ['bitrate', (element) => element], permission_overwrites: ['permissions', (element) => {
            const collection = new Collection_1.default();
            for (const object of element) {
                const subject = new Permission_1.default(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        }], nsfw: ['isNSFW', (element) => element], application_id: ['appFlake', (element) => new Flake_1.default(element)], rate_limit_per_user: ['slowmode', (element) => element], permissions: ['bitPermission', (element) => new Permission_1.BitSet(element)], color: ['colorDec', (element) => element], hoist: ['isHoist', (element) => element], mentionable: ['isMentionable', (element) => element], allow: ['deny', (element) => new Permission_1.BitSet(element)], deny: ['deny', (element) => new Permission_1.BitSet(element)], code: ['code', (element) => element], channel_id: ['channelFlake', (element) => new Flake_1.default(element)], inviter_id: ['inviterFlake', (element) => new Flake_1.default(element)], max_uses: ['maxUses', (element) => element], uses: ['uses', (element) => element], max_age: ['maxAge', (element) => element], temporary: ['isTemporary', (element) => element], deaf: ['isDeaf', (element) => element], mute: ['isMute', (element) => element], nick: ['nick', (element) => element], avatar_hash: ['avatar', (element) => element], id: ['flake', (element) => new Flake_1.default(element)], type: ['type', (element) => element], enable_emoticons: ['isEmojis', (element) => element], expire_behavior: ['expireBehavior', (element) => element], expire_grace_period: ['expireGracePeriod', (element) => element]
};
class AuditLog extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.webhooks = (() => {
            const collection = new Collection_1.default();
            for (const object of data.webhooks) {
                const subject = new Webhook_1.default({ client: this.client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.users = (() => {
            const collection = new Collection_1.default();
            for (const object of data.users) {
                const subject = new User_1.default({ client: this.client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.auditLogEntries = (() => {
            const collection = new Collection_1.default();
            for (const object of data.audit_log_entries) {
                const subject = new AuditLogEntry(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.integrations = (() => {
            const collection = new Collection_1.default();
            for (const object of data.integrations) {
                const subject = new Integration_1.default({ client: this.client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
    }
}
class AuditLogEntry extends Base_1.default {
    constructor(data) {
        super();
        this.targetFlake = data.target_id === null ? data.target_id : new Flake_1.default(data.target_id);
        this.changes = data.changes === undefined ? data.changes : data.changes.map(element => new AuditLogChange(element));
        this.userFlake = new Flake_1.default(data.user_id);
        this.flake = new Flake_1.default(data.id);
        this.actionType = data.action_type;
        this.options = data.options === undefined ? data.options : new OptionalAuditEntryInfo(data.options);
        this.reason = data.reason;
    }
    getActionType() {
        const find = Object.entries(AuditLogEvents).find(element => element[0] === String(this.actionType));
        return find ? find[1] : null;
    }
}
class OptionalAuditEntryInfo extends Base_1.default {
    constructor(data) {
        super();
        this.deleteMemberDays = data.delete_member_days === undefined ? data.delete_member_days : Number(data.delete_member_days);
        this.membersRemoved = data.members_removed === undefined ? data.members_removed : Number(data.members_removed);
        this.channelFlake = data.channel_id === undefined ? data.channel_id : new Flake_1.default(data.channel_id);
        this.messageFlake = data.message_id === undefined ? data.message_id : new Flake_1.default(data.message_id);
        this.count = data.count === undefined ? data.count : Number(data.count);
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.type = Number(data.type);
        this.roleName = data.role_name;
    }
    getType() {
        const find = Object.entries(Permission_1.PermissionTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
class AuditLogChange extends Base_1.default {
    constructor(data) {
        const change = AuditLogChangeKeys[data.key];
        super();
        this.key = change[0];
        this.newValue = data.new_value === undefined ? data.new_value : change[1](data.new_value);
        this.oldValue = data.old_value === undefined ? data.old_value : change[1](data.old_value);
    }
}
exports.default = AuditLog;
