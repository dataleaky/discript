/// <reference types="node" />
import Base from '../dev/Base';
import type { KeyValueParse } from '../dev/Types';
import Channel from '../dev/structures/Channel';
import Message from '../dev/structures/Message';
import Server from '../dev/structures/Server';
import type Client from './Client';
import * as WebSocket from 'ws';
declare const GatewayOpcodes: {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
};
declare type GatewayOpcode = KeyValueParse<(typeof GatewayOpcodes)>;
interface ClientEvents {
  debug: [message: string];
  warning: [message: string];
  error: [message: Error, id: number | null];
  ready: [];
  channelCreate: [Channel];
  channelUpdate: [Channel];
  channelDelete: [Channel];
  channelPinsUpdate: [unknown];
  messageCreate: [Message];
  serverCreate: [Server];
  serverUpdate: [Server];
  serverDelete: [Server];
  serverBanAdd: [unknown];
  serverBanRemove: [unknown];
}
interface JSONPayload {
  op: GatewayOpcode['key'];
  d: unknown;
  s: number | null;
  t: string | null;
}
interface EventHandler {
  id: number;
  ws?: WebSocket;
  heartbeat: NodeJS.Timeout | null;
  heartbeatAck: boolean;
  heartbeatTime: number;
  sequence: number;
  ratelimits: {
    queue: string[];
    total: number;
    remaining: number;
    time: number;
    timer: NodeJS.Timeout | null;
  };
  cache: {
    ready?: unknown;
  };
}
declare class EventHandler extends Base {
  protected client: Client;
  constructor({ client, id }: {
    client: Client;
    id: number;
  });
  restart(): void;
  connect(): void;
  send(op: number): void;
  trySendWS({ op, d, priority }: {
    op: number;
    d?: unknown;
    priority?: boolean;
  }): void;
  receive(payload: JSONPayload): void;
}
export default EventHandler;
export type { ClientEvents };
