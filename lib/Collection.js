"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Collection extends Map {
    constructor() {
        super();
        this.cacheK = null;
        this.cacheV = null;
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
    toCache() {
        if (this.cacheK === null)
            this.cacheK = [...this.keys()];
        if (this.cacheV === null)
            this.cacheV = [...this.values()];
        return { keys: this.cacheK, values: this.cacheV };
    }
    clear() {
        this.cacheK = null;
        this.cacheV = null;
        Map.prototype.clear.call(this);
        return this;
    }
    delete(key) {
        this.cacheK = null;
        this.cacheV = null;
        const element = this.get(key);
        if (element !== undefined)
            Map.prototype.delete.call(this, key);
        return element;
    }
    set(key, value, force) {
        this.cacheK = null;
        this.cacheV = null;
        const element = this.get(key);
        if (element === undefined || force)
            Map.prototype.set.call(this, key, value);
        return element || value;
    }
    forEach(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++)
            callbackfn(values[key], keys[key], these);
        return this;
    }
    first(amount) {
        const values = this.toCache().values;
        if (typeof amount !== 'number' || amount === 0)
            return values[0];
        if (amount < 0)
            return this.last(amount * -1);
        return values.slice(amount);
    }
    last(amount) {
        const values = this.toCache().values;
        if (typeof amount !== 'number' || amount === 0)
            return values[this.size - 1];
        if (amount < 0)
            return this.first(amount * -1);
        return values.slice(-amount);
    }
    random(amount) {
        const values = this.toCache().values, keys = this.toCache().keys;
        if (typeof amount !== 'number' || amount < 0)
            return values[Math.trunc(Math.random() * this.size)];
        const collection = new Collection();
        for (let key = 0; key < amount; key++) {
            const random = Math.trunc(Math.random() * this.size);
            collection.set(keys[random], values[random]);
        }
        return collection;
    }
    every(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++)
            if (!callbackfn(values[key], keys[key], these))
                return false;
        return true;
    }
    some(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++)
            if (callbackfn(values[key], keys[key], these))
                return true;
        return false;
    }
    filter(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        const collection = new Collection();
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++) {
            const cacheV = values[key], cacheK = keys[key];
            if (callbackfn(cacheV, cacheK, these))
                collection.set(cacheK, cacheV);
        }
        return collection;
    }
    find(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++) {
            const cacheV = values[key];
            if (callbackfn(cacheV, keys[key], these))
                return cacheV;
        }
        return undefined;
    }
    map(callbackfn, thisArg) {
        if (thisArg !== undefined)
            callbackfn = callbackfn.bind(thisArg);
        const collection = new Collection();
        for (let key = 0, size = this.size, values = this.toCache().values, keys = this.toCache().keys, these = this; key < size; key++) {
            const cacheK = keys[key];
            collection.set(cacheK, callbackfn(values[key], cacheK, these));
        }
        return collection;
    }
    reduce(callbackfn, initialValue) {
        let values = this.toCache().values, accumulator = (initialValue === undefined ? values[0] : initialValue);
        for (let key = 0, size = this.size, keys = this.toCache().keys, these = this; key < size; key++)
            accumulator = callbackfn(accumulator, values[key], keys[key], these);
        return accumulator;
    }
    reduceRight(callbackfn, initialValue) {
        let values = this.toCache().values, key = this.size, accumulator = (initialValue === undefined ? values[key - 1] : initialValue);
        for (let keys = this.toCache().keys, these = this; key > 0; key--)
            accumulator = callbackfn(accumulator, values[key - 1], keys[key - 1], these);
        return accumulator;
    }
}
exports.default = Collection;
