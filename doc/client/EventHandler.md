# EventHandler extends Base 

#### constructor(data: ClientObject & JSONEventHandler);
#### reset(): void;
#### connect(): void;
#### disconnect(params: Disconnect): void;
#### identify(params: Identify): void;
#### resume(params: Resume): void;
#### heartbeat(params: number | null): void;
#### requestServerMembers(params: RequestServerMembers): void;
#### editVoiceState(params: EditVoiceState): void;
#### editPresence(params: EditPresence): void;
#### send(params: Send): void;
#### receive(payload: Payload): void;

