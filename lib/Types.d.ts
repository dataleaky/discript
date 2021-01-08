import type Client from './client/Client';
export declare type JSONObjectType = string | number | boolean | JSONObject | JSONObjectType[] | null;
export declare type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 'auto';
export declare type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'auto';
export declare type DiscordLocales = 'en-US' | 'en-GB' | 'zh-CN' | 'zh-TW' | 'cs' | 'da' | 'nl' | 'fr' | 'de' | 'el' | 'hu' | 'it' | 'ja' | 'ko' | 'no' | 'pl' | 'pt-BR' | 'ru' | 'es-ES' | 'sv-SE' | 'tr' | 'bg' | 'uk' | 'fi' | 'hr' | 'ro' | 'lt';
export declare type PartialObject<T> = {
    [key in keyof T]?: T[key];
};
export declare type WeakenMap = new <K, V>() => {
    [P in Exclude<keyof Map<K, V>, 'clear' | 'set' | 'delete' | 'forEach' | 'entries' | 'get' | 'has' | 'keys' | 'values'>]: Map<K, V>[P];
};
export interface JSONObject {
    [key: string]: JSONObjectType;
}
export interface UnknownObject {
    [key: string]: unknown;
}
export interface ClientObject {
    _client: Client;
}
export interface ImageParams {
    format?: ImageFormat;
    size?: ImageSize;
}
export interface KeyValueParse<T> {
    key: keyof T;
    value: T[KeyValueParse<T>['key']];
}
