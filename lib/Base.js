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
        const ObjectProps = () => {
            const GetAllProps = (object) => object ? {
                ...GetAllProps(Object.getPrototypeOf(object)), ...Object.getOwnPropertyDescriptors(object)
            } : Object.create(null);
            const FromEntries = (object) => {
                const entries = {};
                for (const [key, value] of object)
                    Object.defineProperty(entries, key, { value, writable: true, enumerable: true, configurable: true });
                return entries;
            };
            const KeyToValue = (prop) => {
                if (prop === undefined || typeof prop === 'function')
                    return undefined;
                else if (typeof prop === 'bigint' || typeof prop === 'symbol')
                    return prop.toString();
                else if (typeof prop !== 'object' || prop === null)
                    return prop;
                else if ('toJSON' in prop) {
                    let json = prop.toJSON();
                    try {
                        return JSON.parse(json);
                    }
                    catch (error) {
                        return json;
                    }
                }
                else if (Array.isArray(prop))
                    return prop.map((element) => {
                        const key = KeyToValue.call(prop, element);
                        return key === undefined ? null : key;
                    });
                return ObjectProps.call(prop);
            };
            return FromEntries(Object.entries(GetAllProps(this)).filter((element) => !element[0].startsWith('_') && element[0] !== 'client').sort().map((element) => [element[0], KeyToValue(this[element[0]])]));
        };
        return JSON.stringify(ObjectProps(), null, 2);
    }
}
exports.default = Base;
