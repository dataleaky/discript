import Base from '../Base';
import type { ClientObject, KeyValueParse, PartialObject } from '../Types';
import Channel from './Channel';
import type { JSONChannel } from './Channel';
import Server from './Server';
import type { JSONServer } from './Server';
import User from './User';
import type { JSONUser } from './User';
declare const TargetUserTypes: {
  readonly 1: "Stream";
};
declare type TargetUserType = KeyValueParse<(typeof TargetUserTypes)>;
interface JSONInvite {
  code: string;
  guild?: PartialObject<JSONServer>;
  channel: PartialObject<JSONChannel>;
  inviter?: JSONUser;
  target_user?: PartialObject<JSONUser>;
  target_user_type?: TargetUserType['key'];
  approximate_presence_count?: number;
  approximate_member_count?: number;
}
interface Invite {
  code: string;
  server?: PartialObject<Server>;
  channel: PartialObject<Channel>;
  inviter?: User;
  targetUser?: PartialObject<User>;
  targetUserType?: number;
  roughPresenceCount?: number;
  roughMemberCount?: number;
}
declare class Invite extends Base {
  protected client: ClientObject['client'];
  constructor(data: ClientObject & JSONInvite);
  getTargetUserType(): "Stream" | null;
}
interface JSONInviteMetadata extends JSONInvite {
  uses: number;
  max_uses: number;
  max_age: number;
  temporary: boolean;
  created_at: string;
}
interface InviteMetadata extends Invite {
  uses: number;
  maxUses: number;
  maxAge: number;
  isTemporary: boolean;
  createdTime: number;
}
declare class InviteMetadata extends Invite {
  get createdDate(): Date;
  constructor(data: ClientObject & JSONInviteMetadata);
}
export default Invite;
export { InviteMetadata, JSONInvite, JSONInviteMetadata };
