# Webhook extends Base 

#### server: import("./Server").default | undefined;
#### channel: import("./Channel").default;
#### app: import("./App").default | null;
#### constructor(data: ClientObject & JSONWebhook);
#### getAvatarURL(params: ImageParams): string | null;
#### getType(): "Incoming" | "Channel Follower" | null;

