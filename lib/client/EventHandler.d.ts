/// <reference types="node" />
import Base from '../Base';
import Collection from '../Collection';
import type { ClientObject } from '../Types';
import Channel from '../structures/Channel';
import Message from '../structures/Message';
import Presence from '../structures/Presence';
import type { JSONActivity, StatusTypes } from '../structures/Presence';
import Server, { Emoji, Role, ServerMember, VoiceState } from '../structures/Server';
import User from '../structures/User';
import WebSocket = require('ws');
declare type Opcode = 0 | 1 | 2 | 3 | 4 | 6 | 7 | 8 | 9 | 10 | 11;
declare type EventName = 'READY' | 'RESUMED' | 'CHANNEL_CREATE' | 'CHANNEL_UPDATE' | 'CHANNEL_DELETE' | 'CHANNEL_PINS_UPDATE' | 'GUILD_CREATE' | 'GUILD_UPDATE' | 'GUILD_DELETE' | 'GUILD_BAN_ADD' | 'GUILD_BAN_REMOVE' | 'GUILD_EMOJIS_UPDATE' | 'GUILD_INTEGRATIONS_UPDATE' | 'GUILD_MEMBER_ADD' | 'GUILD_MEMBER_REMOVE' | 'GUILD_MEMBER_UPDATE' | 'GUILD_MEMBER_CHUNK' | 'GUILD_ROLE_CREATE' | 'GUILD_ROLE_UPDATE' | 'GUILD_ROLE_DELETE' | 'INVITE_CREATE' | 'INVITE_DELETE' | 'MESSAGE_CREATE' | 'MESSAGE_UPDATE' | 'MESSAGE_DELETE' | 'MESSAGE_DELETE_BULK' | 'MESSAGE_REACTION_ADD' | 'MESSAGE_REACTION_REMOVE' | 'MESSAGE_REACTION_REMOVE_ALL' | 'MESSAGE_REACTION_REMOVE_EMOJI' | 'PRESENCE_UPDATE' | 'TYPING_START' | 'USER_UPDATE' | 'VOICE_STATE_UPDATE' | 'VOICE_SERVER_UPDATE' | 'WEBHOOKS_UPDATE' | 'INTERACTION_CREATE';
declare type ShardStatus = 'disconnected' | 'connect' | 'resume' | 'ready';
export interface EventListen {
    error: [error: Error, shardID: number | null];
    debug: [message: string];
    ready: [];
    shardReady: [];
    channelAdd: [channel: Channel];
    channelEdit: [channel: Channel];
    channelRemove: [channel: Channel];
    channelPinsEdit: [channelID: string, serverID: string | undefined, lastPinTime: number | null | undefined];
    serverAdd: [server: Server];
    serverEdit: [server: Server];
    serverRemove: [server: Server];
    serverBanAdd: [serverID: string, User: User];
    serverBanRemove: [serverID: string, User: User];
    serverEmojisEdit: [serverID: string, emojis: Collection<bigint, Emoji>];
    serverIntegrationsEdit: [serverID: string];
    serverMemberAdd: [serverID: string, member: ServerMember];
    serverMemberEdit: [serverID: string, user: User, rolesID: string[], joinedTime: number, nick: string | null | undefined, premiumTime: number | null | undefined];
    serverMemberRemove: [serverID: string, user: User];
    serverRoleAdd: [serverID: string, role: Role];
    serverRoleEdit: [serverID: string, role: Role];
    serverRoleRemove: [serverID: string, roleID: string];
    inviteAdd: [invite: string, channelID: string, createdTime: number, serverID: string | undefined, inviter: User | undefined, maxAge: number, maxUses: number, targerUser: User | undefined, targetUserType: number | undefined, isTemporary: boolean, uses: number];
    inviteRemove: [code: string, channelID: string, serverID: string | undefined];
    messageAdd: [message: Message];
    messageEdit: [message: Message];
    messageRemove: [messageID: string, channelID: string, serverID: string | undefined];
    messagesRemove: [messagesID: string[], channelID: string, serverID: string | undefined];
    messageReactionAdd: [emoji: Emoji, userID: string, messageID: string, channelID: string, serverID: string | undefined, member: ServerMember | undefined];
    messageReactionRemove: [emoji: Emoji, userID: string, messageID: string, channelID: string, serverID: string | undefined];
    messageReactionsRemove: [messageID: string, channelID: string, serverID: string | undefined];
    messageReactionsEmojiRemove: [emoji: Emoji, messageID: string, channelID: string, serverID: string | undefined];
    presenceEdit: [presence: Presence];
    typingStart: [time: number, userID: string, channelID: string, guildID: string | undefined, member: ServerMember | undefined];
    userEdit: [user: User];
    voiceStateEdit: [voiceState: VoiceState];
    voiceServerEdit: [token: string, serverID: string, endpoint: string];
    webhookEdit: [channelID: string, serverID: string];
}
interface Disconnect {
    reconnect: boolean;
    reset: boolean;
    error?: Error;
}
interface Identify {
    token: string;
    properties: IdentifyConnectionProperties;
    compress?: boolean;
    large_threshold?: number;
    shard?: [shard_id: number, num_shards: number];
    presence?: EditPresence;
    guild_subscriptions?: boolean;
    intents: number;
}
interface IdentifyConnectionProperties {
    $os: string;
    $browser: string;
    $device: string;
}
export interface EditPresence {
    since: number | null;
    activities: JSONActivity[] | null;
    status: StatusTypes;
    afk: boolean;
}
interface EditVoiceState {
    guild_id: string;
    channel_id: string | null;
    self_mute: boolean;
    self_deaf: boolean;
}
interface Resume {
    token: string;
    session_id: string;
    seq: number;
}
interface RequestServerMembers {
    guild_id: string;
    query?: string;
    limit?: number;
    presences?: boolean;
    user_ids?: string | string[];
    nonce?: string;
}
interface Send {
    op: Opcode;
    d?: unknown;
    priority?: boolean;
}
interface Payload {
    op: Opcode;
    d: unknown;
    s: number | null;
    t: EventName | null;
}
interface JSONEventHandler {
    id: number;
}
export default interface EventHandler {
    id: number;
    ws: WebSocket;
    rateLimit: {
        queue: string[];
        total: number;
        remaining: number;
        interval: number;
    };
    heartbeatInterval: NodeJS.Timeout | null;
    heartbeatTime: number | null;
    heartbeatIsAcked: boolean;
    responseTime: number;
    startTime: number | null;
    sequence: number | null;
    sessionID: string;
    status: ShardStatus;
}
export default class EventHandler extends Base {
    protected _client: ClientObject['_client'];
    constructor(data: ClientObject & JSONEventHandler);
    reset(): void;
    connect(): void;
    disconnect(params: Disconnect): void;
    identify(params: Identify): void;
    resume(params: Resume): void;
    heartbeat(params: number | null): void;
    requestServerMembers(params: RequestServerMembers): void;
    editVoiceState(params: EditVoiceState): void;
    editPresence(params: EditPresence): void;
    send(params: Send): void;
    receive(payload: Payload): void;
}
export {};
