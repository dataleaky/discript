# Emitter extends Base 

#### constructor();
#### say<E extends ClientEvent['key']>(event: E, ...args: EventListen[E]): this;
#### listen<E extends ClientEvent['key']>(event: E, listener: (...args: EventListen[E]) => void): this;
#### forget(event: ClientEvent['key']): this;

# RequestHandler extends Emitter 

#### gatewayURL: string | null;
#### shards: Collection<number, EventHandler>;
#### constructor(client: Client);
#### generateFlake(time: number | Date): bigint;
#### computePermissions(member: ServerMember, channel: Channel): bigint;
#### request(params: RequestParams): Promise<unknown>;
#### connect(): Promise<void>;

