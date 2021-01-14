# Permission extends Base 

#### flake: Flake;
#### type: PermissionType;
#### allow: BitSet;
#### deny: BitSet;
#### constructor(data: JSONPermission);
#### getType(): PermissionType['value'] | null;

# BitSet extends Base 

#### flags: bigint;
#### constructor(bits: bigint | string | number);
#### getFlags(): BitwisePermissionFlag['value'][] | null;
#### has(permission: bigint | bigint[]): boolean;
#### isNeedMFA(): boolean;

