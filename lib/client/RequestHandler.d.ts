import Base from '../Base';
import * as Types from '../Types';
import Collection from '../Collection';
import Client, { ClientEvents } from './Client';
export declare class RequestHandler extends Base {
    protected client: Client;
    events: Collection<string, Function[]>;
    baseURL: string;
    cache: {
        gateway?: Types._JSONGateway | Types._JSONGatewayBot;
    };
    constructor(client: Client);
    request(params: {
        method: Types._JSONHTTPMethods;
        url: string;
        body?: {
            [key: string]: unknown;
            reason?: string;
        };
        file?: Types.FileContents | Types.FileContents[];
    }): Promise<any>;
    connect(): Promise<void>;
    say<E extends keyof ClientEvents>(event: E, ...args: ClientEvents[E]): this;
    listen<E extends keyof ClientEvents>(event: E, listener: (...args: ClientEvents[E]) => void): this;
    forget(event: string): this;
}
