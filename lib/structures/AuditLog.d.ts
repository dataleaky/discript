import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, KeyValueParse, PartialObject } from '../Types';
import type { ChannelType } from './Channel';
import Flake from './Flake';
import Integration from './Integration';
import type { JSONIntegration } from './Integration';
import Permission, { BitSet } from './Permission';
import type { JSONPermission, PermissionType } from './Permission';
import { Role } from './Server';
import type { DefaultMessageNotificationLevel, ExplicitContentFilterLevel, JSONRole, MFALevel, VerificationLevel } from './Server';
import User from './User';
import type { JSONUser } from './User';
import Webhook from './Webhook';
import type { JSONWebhook } from './Webhook';
declare const AuditLogEvents: {
    readonly 1: "Server Update";
    readonly 10: "Channel Create";
    readonly 11: "Channel Update";
    readonly 12: "Channel Delete";
    readonly 13: "Channel Overwrite Create";
    readonly 14: "Channel Overwrite Update";
    readonly 15: "Channel Overwrite Delete";
    readonly 20: "Member Kick";
    readonly 21: "Member Prune";
    readonly 22: "Member Ban Add";
    readonly 23: "Member Ban Remove";
    readonly 24: "Member Update";
    readonly 25: "Member Role Update";
    readonly 26: "Member Move";
    readonly 27: "Member Disconnect";
    readonly 28: "Bot Add";
    readonly 30: "Role Create";
    readonly 31: "Role Update";
    readonly 32: "Role Delete";
    readonly 40: "Invite Create";
    readonly 41: "Invite Update";
    readonly 42: "Invite Delete";
    readonly 50: "Webhook Create";
    readonly 51: "Webhook Update";
    readonly 52: "Webhook Delete";
    readonly 60: "Emoji Create";
    readonly 61: "Emoji Update";
    readonly 62: "Emoji Delete";
    readonly 72: "Message Delete";
    readonly 73: "Message Bulk Delete";
    readonly 74: "Message Pin";
    readonly 75: "Message Unpin";
    readonly 80: "Integration Create";
    readonly 81: "Integration Update";
    readonly 82: "Integration Delete";
};
declare const AuditLogChangeKeys: {
    readonly name: readonly ["name", (element: string) => string];
    readonly icon_hash: readonly ["icon", (element: string) => string];
    readonly splash_hash: readonly ["splash", (element: string) => string];
    readonly owner_id: readonly ["ownerFlake", (element: string) => Flake];
    readonly region: readonly ["region", (element: string) => string];
    readonly afk_channel_id: readonly ["afkChannelFlake", (element: string) => Flake];
    readonly afk_timeout: readonly ["afkTimeout", (element: number) => number];
    readonly mfa_level: readonly ["mfaLevel", (element: MFALevel['key']) => 0 | 1];
    readonly verification_level: readonly ["verificationLevel", (element: VerificationLevel['key']) => 0 | 2 | 1 | 4 | 3];
    readonly explicit_content_filter: readonly ["explicitFilter", (element: ExplicitContentFilterLevel['key']) => 0 | 2 | 1];
    readonly default_message_notifications: readonly ["defaultNotifications", (element: DefaultMessageNotificationLevel['key']) => 0 | 1];
    readonly vanity_url_code: readonly ["vanityCode", (element: string) => string];
    readonly $add: readonly ["add", (element: PartialObject<JSONRole>[]) => Collection<bigint, PartialObject<Role>>];
    readonly $remove: readonly ["remove", (element: PartialObject<JSONRole>[]) => Collection<bigint, PartialObject<Role>>];
    readonly prune_delete_days: readonly ["days", (element: number) => number];
    readonly widget_enabled: readonly ["isWidget", (element: boolean) => boolean];
    readonly widget_channel_id: readonly ["widgetChannelFlake", (element: string) => Flake];
    readonly system_channel_id: readonly ["systemChannelFlake", (element: string) => Flake];
    readonly position: readonly ["position", (element: number) => number];
    readonly topic: readonly ["topic", (element: string) => string];
    readonly bitrate: readonly ["bitrate", (element: number) => number];
    readonly permission_overwrites: readonly ["permissions", (element: JSONPermission[]) => Collection<bigint, Permission>];
    readonly nsfw: readonly ["isNSFW", (element: boolean) => boolean];
    readonly application_id: readonly ["appFlake", (element: string) => Flake];
    readonly rate_limit_per_user: readonly ["slowmode", (element: number) => number];
    readonly permissions: readonly ["bitPermission", (element: string) => BitSet];
    readonly color: readonly ["colorDec", (element: boolean) => boolean];
    readonly hoist: readonly ["isHoist", (element: boolean) => boolean];
    readonly mentionable: readonly ["isMentionable", (element: boolean) => boolean];
    readonly allow: readonly ["deny", (element: string) => BitSet];
    readonly deny: readonly ["deny", (element: string) => BitSet];
    readonly code: readonly ["code", (element: string) => string];
    readonly channel_id: readonly ["channelFlake", (element: string) => Flake];
    readonly inviter_id: readonly ["inviterFlake", (element: string) => Flake];
    readonly max_uses: readonly ["maxUses", (element: number) => number];
    readonly uses: readonly ["uses", (element: number) => number];
    readonly max_age: readonly ["maxAge", (element: number) => number];
    readonly temporary: readonly ["isTemporary", (element: boolean) => boolean];
    readonly deaf: readonly ["isDeaf", (element: boolean) => boolean];
    readonly mute: readonly ["isMute", (element: boolean) => boolean];
    readonly nick: readonly ["nick", (element: string) => string];
    readonly avatar_hash: readonly ["avatar", (element: string) => string];
    readonly id: readonly ["flake", (element: string) => Flake];
    readonly type: readonly ["type", (element: ChannelType['key'] | string) => string | 0 | 2 | 1 | 6 | 5 | 4 | 3];
    readonly enable_emoticons: readonly ["isEmojis", (element: boolean) => boolean];
    readonly expire_behavior: readonly ["expireBehavior", (element: number) => number];
    readonly expire_grace_period: readonly ["expireGracePeriod", (element: number) => number];
};
declare type AuditLogEvent = KeyValueParse<(typeof AuditLogEvents)>;
declare type AuditLogChangeKey = KeyValueParse<(typeof AuditLogChangeKeys)>;
declare type AuditLogChangeTypeJSON = string | MFALevel['key'] | VerificationLevel['key'] | ExplicitContentFilterLevel['key'] | DefaultMessageNotificationLevel['key'] | PartialObject<JSONRole>[] | number | boolean | JSONPermission[] | ChannelType['key'];
declare type AuditLogChangeType = string | Flake | MFALevel['key'] | VerificationLevel['key'] | ExplicitContentFilterLevel['key'] | DefaultMessageNotificationLevel['key'] | Collection<bigint, PartialObject<Role>> | number | boolean | Collection<bigint, Permission> | BitSet | ChannelType['key'];
interface JSONAuditLog {
    webhooks: JSONWebhook[];
    users: JSONUser[];
    audit_log_entries: JSONAuditLogEntry[];
    integrations: PartialObject<JSONIntegration>[];
}
interface AuditLog {
    webhooks: Collection<bigint, Webhook>;
    users: Collection<bigint, User>;
    auditLogEntries: Collection<bigint, AuditLogEntry>;
    integrations: Collection<bigint, Integration>;
}
declare class AuditLog extends Base {
    protected client: ClientObject['client'];
    constructor(data: ClientObject & JSONAuditLog);
}
interface JSONAuditLogEntry {
    target_id: string | null;
    changes?: JSONAuditLogChange[];
    user_id: string;
    id: string;
    action_type: AuditLogEvent['key'];
    options?: JSONOptionalAuditEntryInfo;
    reason?: string;
}
interface AuditLogEntry extends Base {
    targetFlake: Flake | null;
    changes?: AuditLogChange[];
    userFlake: Flake;
    flake: Flake;
    actionType: AuditLogEvent['key'];
    options?: OptionalAuditEntryInfo;
    reason?: string;
}
declare class AuditLogEntry extends Base {
    constructor(data: JSONAuditLogEntry);
    getActionType(): AuditLogEvent['value'] | null;
}
interface JSONOptionalAuditEntryInfo {
    delete_member_days?: string;
    members_removed?: string;
    channel_id?: string;
    message_id?: string;
    count?: string;
    id?: string;
    type?: PermissionType['key'];
    role_name?: string;
}
interface OptionalAuditEntryInfo extends Base {
    deleteMemberDays?: number;
    membersRemoved?: number;
    channelFlake?: Flake;
    messageFlake?: Flake;
    count?: number;
    flake?: Flake;
    type?: PermissionType['key'];
    roleName?: string;
}
declare class OptionalAuditEntryInfo extends Base {
    constructor(data: JSONOptionalAuditEntryInfo);
    getType(): PermissionType['value'] | null;
}
interface JSONAuditLogChange {
    new_value?: AuditLogChangeTypeJSON;
    old_value?: AuditLogChangeTypeJSON;
    key: AuditLogChangeKey['key'];
}
interface AuditLogChange extends Base {
    newValue?: AuditLogChangeType;
    oldValue?: AuditLogChangeType;
    key?: AuditLogChangeKey['value'][0];
}
declare class AuditLogChange extends Base {
    constructor(data: JSONAuditLogChange);
}
export default AuditLog;
export type { AuditLogEvent, JSONAuditLog };
