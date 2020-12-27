declare type WeakenMap = new <K, V>() => {
    [P in Exclude<keyof Map<K, V>, 'set' | 'delete' | 'clear' | 'forEach'>]: Map<K, V>[P];
};
declare const Collection_base: WeakenMap;
declare class Collection<K, V> extends Collection_base<K, V> {
    protected cacheV: V[] | null;
    protected cacheK: K[] | null;
    constructor();
    static toString(): string;
    static valueOf(): string;
    toString(): string;
    toJSON(): string;
    toCache(): {
        keys: K[];
        values: V[];
    };
    clear(): this;
    delete(key: K): V | undefined;
    set(key: K, value: V, force?: boolean): V;
    forEach(callbackfn: (value: V, key: K, map: Collection<K, V>) => void, thisArg?: unknown): this;
    first(amount?: number): V | V[];
    last(amount?: number): V | V[];
    random(amount?: number): V | Collection<K, V> | undefined;
    every(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): boolean;
    some(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): boolean;
    filter(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): Collection<K, V>;
    find(callbackfn: (value: V, key: K, collection: Collection<K, V>) => boolean, thisArg?: unknown): V | undefined;
    map<T>(callbackfn: (value: V, key: K, collection: Collection<K, V>) => T, thisArg?: unknown): Collection<K, T>;
    reduce<T>(callbackfn: (accumulator: T | V, value: V, key?: K, collection?: Collection<K, V>) => T, initialValue?: T): V | T | undefined;
    reduceRight<T>(callbackfn: (accumulator: T | V, value: V, key?: K, collection?: Collection<K, V>) => T, initialValue?: T): V | T | undefined;
}
export default Collection;
