"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    constructor() {
        super();
        this.cacheKeys = null;
        this.cacheValues = null;
    }
    static toString() {
        return `[class ${this.name}]`;
    }
    static valueOf() {
        return this.toString();
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        return this.toJSON();
    }
    toString() {
        return `class ${this.constructor.name} { [native code] }`;
    }
    toJSON() {
        return this.constructor.toString();
    }
    cache() {
        if (this.cacheKeys === null)
            this.cacheKeys = [...this.keys()];
        if (this.cacheValues === null)
            this.cacheValues = [...this.values()];
        return { keys: this.cacheKeys, values: this.cacheValues };
    }
    first(amount) {
        const values = this.cache().values;
        if (typeof amount !== 'number' || amount === 0)
            return values[0];
        if (amount < 0)
            return this.last(amount * -1);
        return values.slice(amount);
    }
    last(amount) {
        const values = this.cache().values;
        if (typeof amount !== 'number' || amount === 0)
            return values[this.size - 1];
        if (amount < 0)
            return this.first(amount * -1);
        return values.slice(-amount);
    }
    random(amount) {
        const values = this.cache().values, keys = this.cache().keys;
        if (typeof amount !== 'number' || amount < 0)
            return values[Math.trunc(Math.random() * this.size)];
        const collection = new Collection();
        for (let key = 0; key < amount; key++) {
            const random = Math.trunc(Math.random() * this.size);
            collection.set(keys[random], values[random]);
        }
        return collection;
    }
    clear() {
        this.cacheKeys = null;
        this.cacheValues = null;
        Map.prototype.clear.call(this);
        return this;
    }
    set(key, value, force) {
        this.cacheKeys = null;
        this.cacheValues = null;
        const element = this.get(key);
        if (element === undefined || force)
            Map.prototype.set.call(this, key, value);
        return element || value;
    }
    delete(key) {
        this.cacheKeys = null;
        this.cacheValues = null;
        const element = this.get(key);
        if (element !== undefined)
            Map.prototype.delete.call(this, key);
        return element;
    }
    get(key) {
        return Map.prototype.get.call(this, key);
    }
    has(key) {
        return Map.prototype.has.call(this, key);
    }
    entries() {
        return Map.prototype.entries.call(this);
    }
    every(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++)
            if (!callbackfn(values[key], keys[key], these))
                return false;
        return true;
    }
    filter(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        const collection = new Collection();
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++) {
            const cacheV = values[key], cacheK = keys[key];
            if (callbackfn(cacheV, cacheK, these))
                collection.set(cacheK, cacheV);
        }
        return collection;
    }
    find(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++) {
            const cacheV = values[key];
            if (callbackfn(cacheV, keys[key], these))
                return cacheV;
        }
        return undefined;
    }
    forEach(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++)
            callbackfn(values[key], keys[key], these);
        return this;
    }
    keys() {
        return Map.prototype.keys.call(this);
    }
    map(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        const collection = new Collection();
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++) {
            const cacheK = keys[key];
            collection.set(cacheK, callbackfn(values[key], cacheK, these));
        }
        return collection;
    }
    reduce(callbackfn, initialValue) {
        let values = this.cache().values, accumulator = (initialValue === undefined ? values[0] : initialValue);
        for (let key = 0, size = this.size, keys = this.cache().keys, these = this; key < size; key++)
            accumulator = callbackfn(accumulator, values[key], keys[key], these);
        return accumulator;
    }
    reduceRight(callbackfn, initialValue) {
        let values = this.cache().values, key = this.size, accumulator = (initialValue === undefined ? values[key - 1] : initialValue);
        for (let keys = this.cache().keys, these = this; key > 0; key--)
            accumulator = callbackfn(accumulator, values[key - 1], keys[key - 1], these);
        return accumulator;
    }
    some(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.cache().values, keys = this.cache().keys, these = this; key < size; key++)
            if (callbackfn(values[key], keys[key], these))
                return true;
        return false;
    }
    values() {
        return Map.prototype.values.call(this);
    }
}
exports.default = Collection;
