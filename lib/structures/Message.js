"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowedMentions = void 0;
const Base_1 = require("../Base");
const Channel_1 = require("./Channel");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const Server_1 = require("./Server");
const User_1 = require("./User");
const Webhook_1 = require("./Webhook");
const MessageTypes = { 0: 'Default', 1: 'Recipient Add', 2: 'Recipient Remove', 3: 'Call', 4: 'Channel Name Change', 5: 'Channel Icon Change', 6: 'Channel Pinned Message', 7: 'Server Member Join', 8: 'User Premium Server Subscription', 9: 'User Premium Server Subscription Tier 1', 10: 'User Premium Server Subscription Tier 2', 11: 'User Premium Server Subscription Tier 3', 12: 'Channel Follow Add', 14: 'Server Discovery Disqualified', 15: 'Server Discovery Requalified', 19: 'Reply', 20: 'Application Command' };
const MessageFlags = { 1: 'Crossposted', 2: 'Is Crosspost', 4: 'Suppress Embeds', 8: 'Source Message Deleted', 16: 'Urgent' };
const MessageActivityTypes = { 1: 'Join', 2: 'Spectate', 3: 'Listen', 5: 'Join Request' };
const MessageStickerFormatTypes = { 1: 'png', 2: 'apng', 3: 'lottie' };
class Message extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.channelFlake = new Flake_1.default(data.channel_id);
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
        this.author = this.webhookFlake === undefined ? new User_1.default({ client: this.client, ...data.author }) : new Webhook_1.default({ client: this.client, ...data.author });
        this.member = data.member === undefined ? data.member : new Server_1.ServerMember({ client: this.client, ...data.member });
        this.content = data.content;
        this.timestamp = Date.parse(data.timestamp);
        this.editedTime = data.edited_timestamp === null ? data.edited_timestamp : Date.parse(data.edited_timestamp);
        this.isTTS = data.tts;
        this.isMentionEveryone = data.mention_everyone;
        this.mentionUsers = data.mentions === undefined ? data.mentions : (() => {
            const collection = new Collection_1.default();
            for (const object of data.mentions) {
                const subject = new User_1.default({ client: this.client, ...object });
                subject.member = new Server_1.ServerMember({ client: this.client, ...object.member });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.mentionRoleFlakes = data.mention_roles.map(element => new Flake_1.default(element));
        this.mentionChannels = data.mention_channels === undefined ? data.mention_channels : (() => {
            const collection = new Collection_1.default();
            for (const object of data.mention_channels) {
                const subject = new ChannelMention(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.attachments = data.attachments === undefined ? data.attachments : (() => {
            const collection = new Collection_1.default();
            for (const object of data.attachments) {
                const subject = new Attachment(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.embeds = data.embeds.map(element => new Embed(element));
        this.reactions = data.reactions === undefined ? data.reactions : data.reactions.map(element => new Reaction({ client: this.client, ...element }));
        this.nonce = data.nonce;
        this.isPinned = data.pinned;
        this.webhookFlake = data.webhook_id === undefined ? data.webhook_id : new Flake_1.default(data.webhook_id);
        this.type = data.type;
        this.activity = data.activity === undefined ? data.activity : new MessageActivity(data.activity);
        this.app = data.application === undefined ? data.application : new MessageApplication({ client: this.client, ...data.application });
        this.reference = data.message_reference === undefined ? data.message_reference : new MessageReference(data.message_reference);
        this.flags = data.flags;
        this.replyMessage = data.referenced_message === undefined || data.referenced_message === null ? data.referenced_message : new Message({ client: this.client, ...data.referenced_message });
        this.stickers = data.stickers === undefined ? data.stickers : (() => {
            const collection = new Collection_1.default();
            for (const object of data.stickers) {
                const subject = new MessageSticker(object);
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
    }
    get date() {
        return new Date(this.timestamp);
    }
    get editedDate() {
        if (this.editedTime === undefined)
            return null;
        if (this.editedTime === null)
            return null;
        else
            return new Date(this.editedTime);
    }
    getType() {
        const find = Object.entries(MessageTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
    getFlags() {
        const find = Object.entries(MessageFlags).filter(element => Number(element[0]) & Number(this.flags));
        return find.length ? find.map(element => element[1]) : null;
    }
}
class MessageActivity extends Base_1.default {
    constructor(data) {
        super();
        this.type = data.type;
        this.partyFlake = data.party_id === undefined ? data.party_id : new Flake_1.default(data.party_id);
    }
    getType() {
        const find = Object.entries(MessageActivityTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
class MessageApplication extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.flake = new Flake_1.default(data.id);
        this.coverImage = data.cover_image;
        this.description = data.description;
        this.icon = data.icon;
        this.name = data.name;
    }
    getIconURL(params) {
        return this.icon === null ? null : this.client.getApplicationIconURL({ format: params.format, size: params.size, applicationID: String(this.flake.id), icon: this.icon });
    }
    getAssetURL(params) {
        return this.coverImage === undefined ? null : this.client.getApplicationAssetURL({ format: params.format, size: params.size, applicationID: String(this.flake.id), assetID: this.coverImage });
    }
}
class MessageReference extends Base_1.default {
    constructor(data) {
        super();
        this.messageFlake = data.message_id === undefined ? data.message_id : new Flake_1.default(data.message_id);
        this.channelFlake = data.channel_id === undefined ? data.channel_id : new Flake_1.default(data.channel_id);
        this.serverFlake = data.guild_id === undefined ? data.guild_id : new Flake_1.default(data.guild_id);
    }
}
class MessageSticker extends Base_1.default {
    constructor(data) {
        super();
        this.flake = new Flake_1.default(data.id);
        this.packFlake = new Flake_1.default(data.pack_id);
        this.name = data.name;
        this.description = data.description;
        this.tags = data.tags;
        this.asset = data.asset;
        this.previewAsset = data.preview_asset;
        this.formatType = data.format_type;
    }
    getFormatType() {
        const find = Object.entries(MessageStickerFormatTypes).find(element => element[0] === String(this.formatType));
        return find ? find[1] : null;
    }
}
class Reaction extends Base_1.default {
    constructor(data) {
        super();
        this.client = data.client;
        this.count = data.count;
        this.isMe = data.me;
        this.emoji = new Server_1.Emoji({ client: this.client, ...data.emoji });
    }
}
class Embed extends Base_1.default {
    get date() {
        return this.time === undefined ? this.time : new Date(this.time);
    }
    constructor(data) {
        super();
        this.title = data.title;
        this.type = data.type;
        this.description = data.description;
        this.url = data.url;
        this.time = data.timestamp === undefined ? data.timestamp : Date.parse(data.timestamp);
        this.colorDec = data.color;
        this.footer = data.footer === undefined ? data.footer : new EmbedFooter(data.footer);
        this.image = data.image === undefined ? data.image : new EmbedImage(data.image);
        this.thumbnail = data.thumbnail === undefined ? data.thumbnail : new EmbedThumbnail(data.thumbnail);
        this.video = data.video === undefined ? data.video : new EmbedVideo(data.video);
        this.provider = data.provider === undefined ? data.provider : new EmbedProvider(data.provider);
        this.author = data.author === undefined ? data.author : new EmbedAuthor(data.author);
        this.fields = data.fields === undefined ? data.fields : data.fields.map(element => new EmbedField(element));
    }
}
class EmbedThumbnail extends Base_1.default {
    constructor(data) {
        super();
        this.url = data.url;
        this.proxyURL = data.proxy_url;
        this.height = data.height;
        this.width = data.width;
    }
}
class EmbedVideo extends Base_1.default {
    constructor(data) {
        super();
        this.url = data.url;
        this.height = data.height;
        this.width = data.width;
    }
}
class EmbedImage extends Base_1.default {
    constructor(data) {
        super();
        this.url = data.url;
        this.proxyURL = data.proxy_url;
        this.height = data.height;
        this.width = data.width;
    }
}
class EmbedProvider extends Base_1.default {
    constructor(data) {
        super();
        this.name = data.name;
        this.url = data.url;
    }
}
class EmbedAuthor extends Base_1.default {
    constructor(data) {
        super();
        this.name = data.name;
        this.url = data.url;
        this.iconURL = data.icon_url;
        this.proxyIconURL = data.proxy_icon_url;
    }
}
class EmbedFooter extends Base_1.default {
    constructor(data) {
        super();
        this.text = data.text;
        this.iconURL = data.icon_url;
        this.proxyIconURL = data.proxy_icon_url;
    }
}
class EmbedField extends Base_1.default {
    constructor(data) {
        super();
        this.name = data.name;
        this.value = data.value;
        this.isInline = data.inline;
    }
}
class Attachment extends Base_1.default {
    constructor(data) {
        super();
        this.flake = new Flake_1.default(data.id);
        this.filename = data.filename;
        this.size = data.size;
        this.url = data.url;
        this.proxyURL = data.proxy_url;
        this.height = data.height;
        this.width = data.width;
    }
}
class ChannelMention extends Base_1.default {
    constructor(data) {
        super();
        this.flake = new Flake_1.default(data.id);
        this.serverFlake = new Flake_1.default(data.guild_id);
        this.type = data.type;
        this.name = data.name;
    }
    getType() {
        const find = Object.entries(Channel_1.ChannelTypes).find(element => element[0] === String(this.type));
        return find ? find[1] : null;
    }
}
;
class AllowedMentions extends Base_1.default {
    constructor(data) {
        super();
        this.parse = data.parse;
        this.roles = data.roles.map(element => new Flake_1.default(element));
        this.users = data.users.map(element => new Flake_1.default(element));
        this.isRepliedUser = data.replied_user;
    }
    ;
}
exports.AllowedMentions = AllowedMentions;
;
exports.default = Message;
