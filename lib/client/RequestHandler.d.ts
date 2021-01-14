import Base from '../Base';
import Collection from '../Collection';
import type { KeyValueParse, UnknownObject } from '../Types';
import type Channel from '../structures/Channel';
import type { ServerMember } from '../structures/Server';
import type Client from './Client';
import EventHandler from './EventHandler';
import type { EventListen } from './EventHandler';
declare type HTTPMethod = 'GET' | 'PATCH' | 'POST' | 'PUT' | 'DELETE';
declare type ClientEvent = KeyValueParse<EventListen>;
interface ReasonObject {
    reason?: string;
}
declare class Emitter extends Base {
    protected _events: Collection<ClientEvent['key'], Function[]>;
    constructor();
    say<E extends ClientEvent['key']>(event: E, ...args: EventListen[E]): this;
    listen<E extends ClientEvent['key']>(event: E, listener: (...args: EventListen[E]) => void): this;
    forget(event: ClientEvent['key']): this;
}
interface RequestParams {
    method: HTTPMethod;
    url: string;
    body?: UnknownObject & ReasonObject;
    file?: FileContents | FileContents[];
}
interface RequestHandler {
    gatewayURL: string | null;
    shards: Collection<number, EventHandler>;
}
declare class RequestHandler extends Emitter {
    protected _client: Client;
    constructor(client: Client);
    generateFlake(time: number | Date): bigint;
    computePermissions(member: ServerMember, channel: Channel): bigint;
    request(params: RequestParams): Promise<unknown>;
    connect(): Promise<void>;
}
interface FileContents {
}
declare type ImageData = string;
export default RequestHandler;
export type { FileContents, ImageData };
