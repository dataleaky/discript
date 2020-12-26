import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject, KeyValueParse } from '../Types';
import Flake from './Flake';
import Permission from './Permission';
import type { JSONPermission } from './Permission';
import User from './User';
import type { JSONUser } from './User';
declare const ChannelTypes: {
  readonly 0: "Server Text";
  readonly 1: "DM";
  readonly 2: "Server Voice";
  readonly 3: "Group DM";
  readonly 4: "Server Category";
  readonly 5: "Server News";
  readonly 6: "Server Store";
};
declare type ChannelType = KeyValueParse<(typeof ChannelTypes)>;
interface JSONChannel {
  id: string;
  type: ChannelType['key'];
  guild_id?: string;
  position?: number;
  permission_overwrites?: JSONPermission[];
  name?: string;
  topic?: string | null;
  nsfw?: boolean;
  last_message_id?: string | null;
  bitrate?: number;
  user_limit?: number;
  rate_limit_per_user?: number;
  recipients?: JSONUser[];
  icon?: string | null;
  owner_id?: string;
  application_id?: string;
  parent_id?: string | null;
  last_pin_timestamp?: string | null;
}
interface Channel {
  flake: Flake;
  type: ChannelType['key'];
  serverFlake?: Flake;
  position?: number;
  permissions?: Collection<bigint, Permission>;
  name?: string;
  topic?: string | null;
  isNSFW?: boolean;
  lastMessageFlake?: Flake | null;
  bitrate?: number;
  userLimit?: number;
  slowmode?: number;
  recipients?: Collection<bigint, User>;
  icon?: string | null;
  ownerFlake?: Flake;
  appFlake?: Flake;
  parentFlake?: Flake | null;
  lastPinTime?: number | null;
}
declare class Channel extends Base {
  protected client: ClientObject['client'];
  get mention(): string;
  get lastPinDate(): Date | null | undefined;
  constructor(data: ClientObject & JSONChannel);
  getType(): "Server Text" | "DM" | "Server Voice" | "Group DM" | "Server Category" | "Server News" | "Server Store" | null;
}
interface JSONFollowedChannel {
  channel_id: string;
  webhook_id: string;
}
interface FollowedChannel {
  channelFlake: Flake;
  webhookFlake: Flake;
}
declare class FollowedChannel extends Base {
  constructor(data: JSONFollowedChannel);
}
export default Channel;
export { ChannelTypes, FollowedChannel };
export type { ChannelType, JSONChannel, JSONFollowedChannel };
