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
            const value = this[key];
            if (value === undefined || typeof value === 'function')
                return undefined;
            else if (typeof value === 'bigint' || typeof value === 'symbol')
                return value.toString();
            else if (typeof value !== 'object' || value === null)
                return value;
            else if ('toJSON' in value)
                return value.toJSON();
            else if (Array.isArray(value))
                return Object.entries(value).map(element => {
                    const key = keyToValue.call(value, element[0]);
                    return key === undefined ? null : key;
                });
            const keys = Object.keys(getAllPropertyDescriptors(value)).sort().map(element => Object.getOwnPropertyNames(value).includes(element) ? [element, undefined] : [element, keyToValue.call(value, element)]);
            return Object.fromEntries(keys);
        };
        const getAllPropertyDescriptors = (value) => value ? { ...getAllPropertyDescriptors(Object.getPrototypeOf(value)), ...Object.getOwnPropertyDescriptors(value) } : Object.create(null);
        return JSON.stringify(Object.fromEntries(Object.keys(getAllPropertyDescriptors(this)).sort().map(element => Object.getOwnPropertyNames(this).includes(element) ? [element, undefined] : [element, keyToValue(element)]).filter(element => !String(element[0]).startsWith('_'))), undefined, 2);
    }
}
exports.default = Base;
