import type { WeakenMap } from './Types';
declare const Collection_base: WeakenMap;
export default class Collection<K, V> extends Collection_base<K, V> {
    protected cacheValues: V[] | null;
    protected cacheKeys: K[] | null;
    constructor();
    static toString(): `[class ${string}]`;
    static valueOf(): `[class ${string}]`;
    toString(): `class ${string} { [native code] }`;
    toJSON(): string;
    cache(): {
        keys: K[];
        values: V[];
    };
    first(amount?: number): V | V[];
    last(amount?: number): V | V[];
    random(amount?: number): V | Collection<K, V> | undefined;
    clear(): this;
    set(key: K, value: V, force?: boolean): V;
    delete(key: K): V;
    get(key: K): V;
    has(key: K): boolean;
    entries(): IterableIterator<[K, V]>;
    every(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): boolean;
    filter(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): Collection<K, V>;
    find(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): V | undefined;
    forEach(callbackfn: (value: V, key: K, map: Collection<K, V>) => void, thisArg?: unknown): this;
    keys(): IterableIterator<K>;
    map<T>(callbackfn: (value: V, key: K, collection: Collection<K, V>) => T, thisArg?: unknown): Collection<K, T>;
    reduce<T>(callbackfn: (accumulator: T | V, value: V, key?: K, collection?: Collection<K, V>) => T, initialValue?: T): V | T | undefined;
    reduceRight<T>(callbackfn: (accumulator: T | V, value: V, key?: K, collection?: Collection<K, V>) => T, initialValue?: T): V | T | undefined;
    some(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): boolean;
    values(): IterableIterator<V>;
}
export {};
