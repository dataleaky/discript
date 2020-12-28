"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const Base_1 = require("../Base");
const Collection_1 = require("../Collection");
const Flake_1 = require("./Flake");
const User_1 = require("./User");
const IntegrationExpireBehaviors = { 0: 'Remove role', 1: 'Kick' };
const VisibilityTypes = { 0: 'None', 1: 'Everyone' };
class Integration extends Base_1.default {
    constructor(data) {
        super();
        this._client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.type = data.type;
        this.isEnabled = data.enabled;
        this.isSyncing = data.syncing;
        this.roleFlake = data.role_id === undefined ? data.role_id : new Flake_1.default(data.role_id);
        this.isEmojis = data.enable_emoticons;
        this.expireBehavior = data.expire_behavior;
        this.expireGracePeriod = data.expire_grace_period;
        this.user = data.user === undefined ? data.user : new User_1.default({ client: this._client, ...data.user });
        this.account = data.account === undefined ? data.account : new IntegrationAccount({ client: this._client, ...data.account });
        this.syncedTime = data.synced_at === undefined ? data.synced_at : Date.parse(data.synced_at);
        this.subscriberСount = data.subscriber_count;
        this.isRevoked = data.revoked;
        this.app = data.application === undefined ? data.application : new IntegrationApp({ client: this._client, ...data.application });
    }
    get syncedDate() {
        return this.syncedTime === undefined ? this.syncedTime : new Date(this.syncedTime);
    }
    get role() {
        return this.roleFlake === undefined ? this.roleFlake : this._client.roles.get(this.roleFlake.id);
    }
    getExpireBehavior() {
        const find = Object.entries(IntegrationExpireBehaviors).find(element => element[0] === String(this.expireBehavior));
        return find ? find[1] : null;
    }
}
class IntegrationAccount extends Base_1.default {
    constructor(data) {
        super();
        this._client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
    }
    get user() {
        return this.flake === undefined ? this.flake : this._client.users.get(this.flake.id);
    }
}
class IntegrationApp extends Base_1.default {
    constructor(data) {
        super();
        this._client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.icon = data.icon;
        this.description = data.description;
        this.summary = data.summary;
        this.bot = data.bot === undefined ? data.bot : new User_1.default({ client: this._client, ...data.bot });
    }
    get app() {
        return this.flake === undefined ? this.flake : this._client.apps.get(this.flake.id);
    }
    getIconURL(params) {
        return this.icon === undefined || this.icon === null ? this.icon : this._client.getAppIconURL({ ...params, icon: this.icon, appID: String(this.flake.id) });
    }
}
class Connection extends Base_1.default {
    constructor(data) {
        super();
        this._client = data.client;
        this.flake = data.id === undefined ? data.id : new Flake_1.default(data.id);
        this.name = data.name;
        this.type = data.type;
        this.isRevoked = data.revoked;
        this.integrations = data.integrations === undefined ? data.integrations : (() => {
            const collection = new Collection_1.default();
            for (const object of data.integrations) {
                const subject = new Integration({ client: this._client, ...object });
                collection.set(subject.flake.id, subject);
            }
            return collection;
        })();
        this.isVerified = data.verified;
        this.isFriendSync = data.friend_sync;
        this.isShowActivity = data.show_activity;
        this.visibilityType = data.visibility;
    }
    get user() {
        return this.flake === undefined ? this.flake : this._client.users.get(this.flake.id);
    }
    getVisibilityType() {
        const find = Object.entries(VisibilityTypes).find(element => element[0] === String(this.visibilityType));
        return find ? find[1] : null;
    }
}
exports.Connection = Connection;
exports.default = Integration;
