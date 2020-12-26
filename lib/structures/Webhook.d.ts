import Base from '../Base';
import type { ClientObject, ImageParams, KeyValueParse } from '../Types';
import Flake from './Flake';
import User from './User';
import type { JSONUser } from './User';
declare const WebhookTypes: {
  readonly 1: "Incoming";
  readonly 2: "Channel Follower";
};
declare type WebhookType = KeyValueParse<(typeof WebhookTypes)>;
interface JSONWebhook {
  id: string;
  type: WebhookType['key'];
  guild_id?: string;
  channel_id: string;
  user?: JSONUser;
  name: string | null;
  avatar: string | null;
  token?: string;
  application_id: string | null;
}
interface Webhook {
  flake: Flake;
  type: number;
  serverFlake?: Flake;
  channelFlake: Flake;
  user?: User;
  name: string | null;
  avatar: string | null;
  token?: string;
  appFlake: Flake | null;
}
declare class Webhook extends Base {
  protected client: ClientObject['client'];
  constructor(data: ClientObject & JSONWebhook);
  getAvatarURL(params: ImageParams): string | null;
  getType(): "Incoming" | "Channel Follower" | null;
}
export default Webhook;
export type { JSONWebhook };
