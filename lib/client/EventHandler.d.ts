/// <reference types="node" />
import * as WebSocket from 'ws';
import Base from '../Base';
import Client, { _JSONPayload } from './Client';
export interface EventHandler {
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
    cache: {};
}
export declare class EventHandler extends Base {
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
    receive(payload: _JSONPayload): void;
}
