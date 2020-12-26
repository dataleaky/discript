import Base from '../Base';
import { EventHandler } from './EventHandler';
import Flake from '../structures/Flake';
import * as Types from '../Types';
import Collection from '../Collection';
export declare const pack: {
    version: number;
    homepage: string;
    name: string;
};
interface ClientEvents {
    debug: [message: string];
    error: [message: Error, id?: number];
    ready: [];
    warning: [message: string];
    messageCreate: [Types._JSONMessage];
}
export default class Client extends Base {
    options: {
        token: string;
        shards: number | 'auto';
        presence: {
            since: number | null;
            activities: {
                [key: string]: unknown;
            }[];
            status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
            afk: boolean;
        } | null;
        intends: number;
        defaultImageSize: Types._JSONImageSizes;
        defaultImageFormat: Types._JSONImageFormats;
    };
    handler: RequestHandler;
    shards: Collection<number, EventHandler>;
    starttime: number;
    ping: number;
    constructor(options: {
        token: string;
        shards?: number | 'auto';
        presence?: {
            since: number | null;
            activities: {
                [key: string]: unknown;
            }[];
            status: 'online' | 'dnd' | 'idle' | 'invisible' | 'offline';
            afk: boolean;
        } | null;
        intends?: number;
        defaultImageSize?: Types._JSONImageSizes;
        defaultImageFormat?: Types._JSONImageFormats;
    });
    getCustomEmojiURL(options: {
        animated: boolean;
        emojiID: string;
        size?: Types._JSONImageSizes;
    }): string;
    getGuildIconURL(options: {
        guildID: string;
        guildIcon: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getGuildSplashURL(options: {
        guildID: string;
        guildSplash: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getGuildDiscoverySplashURL(options: {
        guildID: string;
        guildDiscoverySplash: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getGuildBannerURL(options: {
        guildID: string;
        guildBanner: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getDefaultUserAvatarURL(options: {
        userDiscriminator: string;
    }): string;
    getUserAvatarURL(options: {
        avatar: string;
        id: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getApplicationIconURL(options: {
        applicationID: string;
        icon: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getApplicationAssetURL(options: {
        applicationID: string;
        assetID: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getAchievementIconURL(options: {
        applicationID: string;
        achievementID: string;
        iconHash: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getTeamIconURL(options: {
        teamID: string;
        teamIcon: string;
        format?: Types._JSONImageFormats;
        size?: Types._JSONImageSizes;
    }): string;
    getGateway(): Promise<{
        url: string;
    }>;
    getGatewayBot(): Promise<{
        url: string;
        shards: number;
        sessionStartLimit: {
            total: number;
            remaining: number;
            reset_after: number;
            max_concurrency: number;
        };
    }>;
    getApplicationInformation(options: {
        userID?: string;
    }): Promise<Application>;
    getAuditLog(options: {
        guildID: string;
        options: {
            userID?: string;
            actionType?: number;
            before?: string;
            limit?: number;
        };
    }): Promise<AuditLog>;
    getChannel(options: {
        channelID: string;
    }): Promise<Channel>;
    updateChannel(options: {
        channelID: string;
        options: {
            name?: string;
            type?: number;
            position?: number | null;
            topic?: string | null;
            nsfw?: boolean | null;
            rateLimitPerUser?: number | null;
            bitrate?: number | null;
            userLimit?: number | null;
            permissionOverwrites?: Overwrite[];
            parentID?: string;
        };
        reason?: string;
    }): Promise<Channel>;
    deleteGuildChannel(options: {
        channelID: string;
        reason?: string;
    }): Promise<Channel>;
    closeDMChannel(options: {
        channelID: string;
    }): Promise<Channel>;
    getMessages(options: {
        channelID: string;
        options: {
            around?: string;
            before?: string;
            after?: string;
            limit?: string;
        };
    }): Promise<Collection<unknown, unknown>>;
    getMessage(options: {
        channelID: string;
        messageID: string;
    }): Promise<Message>;
    createMessage(options: {
        channelID: string;
        options: {
            content?: string;
            nonce?: string | number;
            tts?: boolean;
            embed?: Types._JSONEmbed;
            payloadJSON?: string;
            allowedMentions?: AllowedMentions;
            file?: Types.FileContents | Types.FileContents[];
        };
    }): Promise<Message>;
    crosspostMessage(options: {
        channelID: string;
        messageID: string;
    }): Promise<Message>;
    createReaction(options: {
        channelID: string;
        messageID: string;
        userID?: string;
        emoji: string;
    }): Promise<void>;
    deleteReaction(options: {
        channelID: string;
        messageID: string;
        emoji?: string;
        userID?: string;
        all?: boolean;
    }): Promise<void>;
    getReactions(options: {
        channelID: string;
        messageID: string;
        emoji: string;
        options: {
            before: string;
            after: string;
            limit: number;
        };
    }): Promise<Collection<unknown, unknown>>;
    updateMessage(options: {
        channelID: string;
        messageID: string;
        options: {
            content?: string;
            embed?: Embed;
            flags?: number;
        };
    }): Promise<Message>;
    deleteMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    deleteBulkMessages(options: {
        channelID: string;
        options: {
            messages: string[];
        };
        reason?: string;
    }): Promise<void>;
    updateChannelPermissions(options: {
        channelID: string;
        overwriteID: string;
        options: {
            allow?: string;
            deny?: string;
            type?: number;
        };
        reason?: string;
    }): Promise<void>;
    getChannelInvites(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    createChannelInvite(options: {
        channelID: string;
        options: {
            maxAge?: number;
            maxUses?: number;
            temporary?: boolean;
            unique?: boolean;
            targetUser?: string;
            targetUserType?: number;
        };
        reason?: string;
    }): Promise<Invite>;
    deleteChannelPermission(options: {
        channelID: string;
        overwriteID: string;
        reason?: string;
    }): Promise<void>;
    followNewsChannel(options: {
        channelID: string;
        options: {
            webhookChannelID: string;
        };
    }): Promise<FollowedChannel>;
    triggerTypingIndicator(options: {
        channelID: string;
    }): Promise<void>;
    getPinnedMessages(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    createPinnedChannelMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    deletePinnedChannelMessage(options: {
        channelID: string;
        messageID: string;
        reason?: string;
    }): Promise<void>;
    createGroupDMRecipient(options: {
        channelID: string;
        userID: string;
        options: {
            accessToken: string;
            nick: string;
        };
    }): Promise<void>;
    deleteGroupDMRecipient(options: {
        channelID: string;
        userID: string;
    }): Promise<void>;
    getGuildEmojis(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    getGuildEmoji(options: {
        guildID: string;
        emojiID: string;
    }): Promise<Emoji>;
    createGuildEmoji(options: {
        guildID: string;
        options: {
            name: string;
            image: string;
            roles?: string[];
        };
        reason?: string;
    }): Promise<Emoji>;
    updateGuildEmoji(options: {
        guildID: string;
        emojiID: string;
        options: {
            name?: string;
            image?: string;
        };
        reason?: string;
    }): Promise<Emoji>;
    deleteGuildEmoji(options: {
        guildID: string;
        emojiID: string;
        reason?: string;
    }): Promise<void>;
    createGuild(options: {
        options: {
            name: string;
            region?: string;
            icon?: string;
            verificationLevel?: number;
            defaultMessageNotifications?: number;
            explicitContentFilter?: number;
            roles?: Role[];
            channels?: Channel[];
            afkChannelID?: string;
            afkTimeout?: number;
            systemChannelID?: string;
        };
    }): Promise<Guild>;
    getGuild(options: {
        guildID: string;
        options: {
            withCounts?: boolean;
        };
    }): Promise<Guild>;
    getGuildPreview(options: {
        guildID: string;
    }): Promise<GuildPreview>;
    updateGuild(options: {
        guildID: string;
        options: {
            name?: string;
            region?: string | null;
            icon?: string | null;
            verificationLevel?: number | null;
            defaultMessageNotifications?: number | null;
            explicitContentFilter?: number | null;
            afkChannelID?: string | null;
            afkTimeout?: number;
            ownerID?: string;
            splash?: string | null;
            banner?: string | null;
            systemChannelID?: string | null;
            rulesChannelID?: string | null;
            publicUpdatesChannelID?: string | null;
            preferredLocale?: Types.DiscordLocales | null;
        };
        reason?: string;
    }): Promise<Guild>;
    deleteGuild(options: {
        guildID: string;
    }): Promise<void>;
    getGuildChannels(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    createGuildChannel(options: {
        guildID: string;
        options: {
            name: string;
            type?: number;
            position?: number | null;
            topic?: string | null;
            nsfw?: boolean | null;
            rateLimitPerUser?: number | null;
            bitrate?: number | null;
            userLimit?: number | null;
            permissionOverwrites?: Overwrite[];
            parentID?: string;
        };
        reason: string;
    }): Promise<Channel>;
    updateGuildChannelPositions(options: {
        guildID: string;
        options: {
            id: string;
            position: number | null;
        };
    }): Promise<void>;
    getGuildMember(options: {
        guildID: string;
        userID: string;
    }): Promise<GuildMember>;
    getGuildMembers(options: {
        guildID: string;
        options: {
            after?: string;
            limit?: number;
        };
    }): Promise<Collection<unknown, unknown>>;
    createGuildMember(options: {
        guildID: string;
        userID: string;
        options: {
            accessToken: string;
            nick?: number;
            roles?: string[];
            mute?: boolean;
            deaf?: boolean;
        };
    }): Promise<GuildMember>;
    updateGuildMember(options: {
        guildID: string;
        userID: string;
        options: {
            nick?: number;
            roles?: string[];
            mute?: boolean;
            deaf?: boolean;
            channelID?: string;
        };
        reason?: string;
    }): Promise<void>;
    updateUserNick(options: {
        guildID: string;
        userID?: string;
        options: {
            nick?: string | null;
        };
    }): Promise<void>;
    createGuildMemberRole(options: {
        guildID: string;
        userID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    deleteGuildMemberRole(options: {
        guildID: string;
        userID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    deleteGuildMember(options: {
        guildID: string;
        userID: string;
        reason?: string;
    }): Promise<void>;
    getGuildBans(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    getGuildBan(options: {
        guildID: string;
        userID: string;
    }): Promise<Ban>;
    createGuildBan(options: {
        guildID: string;
        userID: string;
        options: {
            deleteMessageDays?: number;
            reason?: string;
        };
    }): Promise<void>;
    deleteGuildBan(options: {
        guildID: string;
        userID: string;
        reason?: string;
    }): Promise<void>;
    getGuildRoles(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    createGuildRole(options: {
        guildID: string;
        options: {
            name?: string;
            permissions?: string;
            color?: number;
            hoist?: boolean;
            mentionable?: boolean;
        };
        reason?: string;
    }): Promise<Role>;
    updateGuildRolePositions(options: {
        guildID: string;
        options: {
            id: string;
            position?: number | null;
        };
    }): Promise<Collection<unknown, unknown>>;
    updateGuildRole(options: {
        guildID: string;
        roleID: string;
        options: {
            name?: string;
            permissions?: string;
            color?: number;
            hoist?: boolean;
            mentionable?: boolean;
        };
        reason?: string;
    }): Promise<Role>;
    deleteGuildRole(options: {
        guildID: string;
        roleID: string;
        reason?: string;
    }): Promise<void>;
    getGuildPruneCount(options: {
        guildID: string;
        options: {
            days?: number;
            includeRoles?: string[];
        };
    }): Promise<any>;
    beginGuildPrune(options: {
        guildID: string;
        options: {
            days?: number;
            computePruneCount?: boolean;
            includeRoles?: string[];
        };
        reason?: string;
    }): Promise<any>;
    getGuildVoiceRegions(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    getGuildInvites(options: {
        guildID: string;
    }): Promise<Collection<unknown, unknown>>;
    getGuildIntegrations(options: {
        guildID: string;
        options: {
            includeApplications?: boolean;
        };
    }): Promise<Collection<unknown, unknown>>;
    createGuildIntegration(options: {
        guildID: string;
        options: {
            type: string;
            id: string;
        };
        reason?: string;
    }): Promise<void>;
    updateGuildIntegration(options: {
        guildID: string;
        integrationID: string;
        options: {
            expireBehavior?: number;
            expireGracePeriod?: number;
            enableEmoticons?: boolean;
        };
        reason?: string;
    }): Promise<void>;
    deleteGuildIntegration(options: {
        guildID: string;
        integrationID: string;
        reason?: string;
    }): Promise<void>;
    syncGuildIntegration(options: {
        guildID: string;
        integrationID: string;
    }): Promise<any>;
    getGuildWidgetSettings(options: {
        guildID: string;
    }): Promise<GuildWidget>;
    updateGuildWidget(options: {
        guildID: string;
        options?: string;
    }): Promise<GuildWidget>;
    getGuildWidget(options: {
        guildID: string;
    }): Promise<any>;
    getGuildVanityURL(options: {
        guildID: string;
    }): Promise<Invite>;
    getGuildWidgetImage(options: {
        guildID: string;
        options: {
            style?: Types._JSONWidgetStyle;
        };
    }): Promise<any>;
    getInvite(options: {
        inviteCode: string;
        options: {
            withCounts?: boolean;
        };
    }): Promise<Invite>;
    deleteInvite(options: {
        inviteCode: string;
        reason?: string;
    }): Promise<Invite>;
    getTemplate(options: {
        templateCode: string;
    }): Promise<Template>;
    createGuildFromTemplate(options: {
        templateCode: string;
        options: {
            name: string;
            icon?: string;
        };
    }): Promise<Guild>;
    getVoiceRegions(): Promise<Collection<unknown, unknown>>;
    getUser(options: {
        userID?: string;
    }): Promise<User>;
    updateUser(options: {
        userID?: bigint;
        options: {
            username?: string;
            avatar?: string;
        };
    }): Promise<User>;
    getGuilds(options: {
        userID?: string;
        options: {
            before?: string;
            after?: string;
            limit?: number;
        };
    }): Promise<Collection<bigint, Guild>>;
    leaveGuild(options: {
        guildID: string;
        userID?: string;
    }): Promise<void>;
    getDMs(options: {
        userID?: string;
    }): Promise<Collection<bigint, Channel>>;
    createDM(options: {
        userID?: string;
        options: {
            recipientID: string;
        };
    }): Promise<Channel>;
    createGroupDM(options: {
        userID?: string;
        options: {
            accessTokens: string[];
            nicks: [[string, string]];
        };
    }): Promise<Channel>;
    getConnections(options: {
        userID?: string;
    }): Promise<Collection<unknown, unknown>>;
    createChannelWebhook(options: {
        channelID: string;
        options: {
            name: string;
            avatar?: string | null;
        };
        reason?: string;
    }): Promise<Webhook>;
    getChannelWebhooks(options: {
        channelID: string;
    }): Promise<Collection<unknown, unknown>>;
    getGuildWebhooks(options: {
        guildID: string;
    }): Promise<Collection<bigint, Webhook>>;
    getWebhook(options: {
        webhookID: string;
        webhookToken?: string;
    }): Promise<Webhook>;
    updateWebhook(options: {
        webhookID: string;
        webhookToken?: string;
        options: {
            name: string;
            avatar?: string | null;
            channelID?: string;
        };
        reason?: string;
    }): Promise<Webhook>;
    deleteWebhook(options: {
        webhookID: string;
        webhookToken?: string;
        reason?: string;
    }): Promise<Webhook>;
    executeWebhook(options: {
        webhookID: string;
        webhookToken: string;
        slack?: string;
        github?: string;
        options: {
            wait?: boolean;
            content?: string;
            username?: string;
            avatarURL?: string;
            tts?: boolean;
            embeds?: Embed[];
            payloadJSON?: string;
            allowedMentions?: AllowedMentions;
            file?: Types.FileContents | Types.FileContents[];
        };
    }): Promise<void>;
}
declare class RequestHandler extends Base {
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
declare class User extends Base {
    protected client: Client;
    flake: Flake;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean | undefined;
    system: boolean | undefined;
    enabledMFA: boolean | undefined;
    locale: string | undefined;
    verified: string | undefined;
    email: string | null | undefined;
    flags: number | undefined;
    premiumType: number | undefined;
    publicFlags: number | undefined;
    constructor({ client, data }: {
        client: Client;
        data: any;
    });
    get mention(): string;
    get tag(): string;
    getAvatarURL(options: {
        format: Types._JSONImageFormats;
        size: Types._JSONImageSizes;
    }): string;
    getFlags(): any[] | null;
    getPremiumType(): "None" | "Nitro Classic" | "Nitro" | null;
}
declare class Application extends Base {
    protected client: Client;
    data: Types._JSONApplication;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONApplication;
    });
}
declare class AuditLog extends Base {
    protected client: Client;
    data: Types._JSONAuditLog;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONAuditLog;
    });
}
declare class Channel extends Base {
    protected client: Client;
    data: Types._JSONChannel;
    flake: Flake;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONChannel;
    });
}
declare class Message extends Base {
    protected client: Client;
    data: Types._JSONMessage;
    flake: Flake;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONMessage;
    });
}
declare class Embed extends Base {
    protected client: Client;
    data: Types._JSONEmbed;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONEmbed;
    });
}
declare class Overwrite extends Base {
    protected client: Client;
    data: Types._JSONOverwrite;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONOverwrite;
    });
}
declare class AllowedMentions extends Base {
    protected client: Client;
    data: Types._JSONAllowedMentions;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONAllowedMentions;
    });
}
declare class FollowedChannel extends Base {
    protected client: Client;
    data: Types._JSONFollowedChannel;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONFollowedChannel;
    });
}
declare class Invite extends Base {
    protected client: Client;
    data: Types._JSONInvite;
    code: string;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONInvite;
    });
}
declare class Emoji extends Base {
    protected client: Client;
    data: any;
    flake: Flake | undefined;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONEmoji;
    });
}
declare class Guild extends Base {
    protected client: Client;
    data: any;
    flake: Flake;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONGuild;
    });
}
declare class GuildPreview extends Base {
    protected client: Client;
    data: any;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONGuildPreview;
    });
}
declare class GuildWidget extends Base {
    protected client: Client;
    data: any;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONGuildWidget;
    });
}
declare class Ban extends Base {
    protected client: Client;
    data: Types._JSONBan;
    user: User;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONBan;
    });
}
declare class GuildMember extends Base {
    protected client: Client;
    data: any;
    user: User | undefined;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONGuildMember;
    });
}
declare class Role extends Base {
    protected client: Client;
    data: any;
    flake: Flake;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONRole;
    });
}
declare class Template extends Base {
    protected client: Client;
    data: Types._JSONTemplate;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONTemplate;
    });
}
declare class Webhook extends Base {
    protected client: Client;
    data: Types._JSONWebhook;
    flake: Flake;
    constructor({ client, data }: {
        client: Client;
        data: Types._JSONWebhook;
    });
}
export {};
