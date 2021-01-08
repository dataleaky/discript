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
        const ObjectProps = (thisArg) => {
            const getProps = (o) => o ? { ...getProps(Object.getPrototypeOf(o)), ...Object.getOwnPropertyDescriptors(o) } : Object.create(null);
            const keyToValue = (prop) => {
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
                        const key = keyToValue.call(prop, element);
                        return key === undefined ? null : key;
                    });
                return ObjectProps.call(null, prop);
            };
            const o = {};
            for (const [key, value] of Object.entries(getProps(thisArg)).filter(value => !value[0].startsWith('_')).sort().map(([value]) => [value, keyToValue(thisArg[value])]))
                Object.defineProperty(o, key, { value, enumerable: true });
            return o;
        };
        return JSON.stringify(ObjectProps(this), null, 2);
    }
}
exports.default = Base;
