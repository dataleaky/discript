# Invite extends Base 

#### code: string;
#### server?: PartialObject<Server>;
#### channel: PartialObject<Channel>;
#### inviter?: User;
#### targetUser?: PartialObject<User>;
#### targetUserType?: number;
#### roughPresenceCount?: number;
#### roughMemberCount?: number;
#### constructor(data: ClientObject & JSONInvite);
#### getTargetUserType(): "Stream" | null;

# InviteMetadata extends Invite 

#### uses: number;
#### maxUses: number;
#### maxAge: number;
#### isTemporary: boolean;
#### createdTime: number;
#### createdDate: Date;
#### constructor(data: ClientObject & JSONInviteMetadata);

