# AuditLog extends Base 

#### webhooks: Collection<bigint, Webhook>;
#### users: Collection<bigint, User>;
#### auditLogEntries: Collection<bigint, AuditLogEntry>;
#### integrations: Collection<bigint, Integration>;
#### constructor(data: ClientObject & JSONAuditLog);

# AuditLogEntry extends Base 

#### targetFlake: Flake | null;
#### changes?: AuditLogChange[];
#### userFlake: Flake;
#### flake: Flake;
#### actionType: AuditLogEvent['key'];
#### options?: OptionalAuditEntryInfo;
#### reason?: string;
#### constructor(data: ClientObject & JSONAuditLogEntry);
#### getActionType(): AuditLogEvent['value'] | null;

# OptionalAuditEntryInfo extends Base 

#### deleteMemberDays?: number;
#### membersRemoved?: number;
#### channelFlake?: Flake;
#### messageFlake?: Flake;
#### count?: number;
#### flake?: Flake;
#### type?: PermissionType['key'];
#### roleName?: string;
#### constructor(data: JSONOptionalAuditEntryInfo);
#### getType(): PermissionType['value'] | null;

# AuditLogChange extends Base 

#### newValue?: AuditLogChangeType;
#### oldValue?: AuditLogChangeType;
#### key?: AuditLogChangeKey['value'][0];
#### constructor(data: ClientObject & JSONAuditLogChange);

