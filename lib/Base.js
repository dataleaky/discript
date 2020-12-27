"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor() { }
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
        const keyToValue = (key) => {
            const unknown = this[key];
            if (unknown === undefined || typeof unknown === 'function')
                return undefined;
            else if (typeof unknown === 'bigint' || typeof unknown === 'symbol')
                return unknown.toString();
            else if (typeof unknown !== 'object' || unknown === null)
                return unknown;
            else if ('toJSON' in unknown)
                return unknown.toJSON();
            else if (Array.isArray(unknown))
                return Object.entries(unknown).map(element => {
                    const key = keyToValue.call(unknown, element[0]);
                    return key === undefined ? null : key;
                });
            const map = {};
            for (const [key, value] of Object.keys(getAllPropertyDescriptors(unknown)).sort().map(element => Object.getOwnPropertyNames(unknown).includes(element) ? [element, undefined] : [element, keyToValue.call(unknown, element)]))
                Object.defineProperty(map, key, { value, writable: true, enumerable: true, configurable: true });
            return map;
        };
        const map = {}, getAllPropertyDescriptors = (value) => value ? { ...getAllPropertyDescriptors(Object.getPrototypeOf(value)), ...Object.getOwnPropertyDescriptors(value) } : Object.create(null);
        for (const [key, value] of Object.keys(getAllPropertyDescriptors(this)).sort().map(element => Object.getOwnPropertyNames(this).includes(element) ? [element, undefined] : [element, keyToValue(element)]).filter(element => !String(element[0]).startsWith('_')))
            Object.defineProperty(map, key, { value, writable: true, enumerable: true, configurable: true });
        return JSON.stringify(map, undefined, 2);
    }
}
exports.default = Base;
