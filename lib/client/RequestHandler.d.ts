import Base from '../dev/Base';
import Collection from '../dev/Collection';
import type { KeyValueParse, UnknownObject } from '../dev/Types';
import type Client from './Client';
import type { FileContents, JSONGateway, JSONGatewayBot } from './Client';
import EventHandler from './EventHandler';
import type { ClientEvents } from './EventHandler';
declare class Emitter extends Base {
  protected events: Collection<ClientEvent['key'], Function[]>;
  constructor();
  say<E extends ClientEvent['key']>(event: E, ...args: ClientEvents[E]): this;
  listen<E extends ClientEvent['key']>(event: E, listener: (...args: ClientEvents[E]) => void): this;
  forget(event: ClientEvent['key']): this;
}
declare type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';
declare type ClientEvent = KeyValueParse<ClientEvents>;
interface ReasonObject {
  reason?: string;
}
interface RequestParams {
  method: HTTPMethod;
  url: string;
  body?: UnknownObject & ReasonObject;
  file?: FileContents | FileContents[];
}
interface RequestHandler {
  baseURL: string;
  cache: {
    gateway?: JSONGateway | JSONGatewayBot;
  };
  shards: Collection<number, EventHandler>;
}
declare class RequestHandler extends Emitter {
  protected client: Client;
  constructor(client: Client);
  request(params: RequestParams): Promise<unknown>;
  connect(): Promise<void>;
}
export default RequestHandler;
