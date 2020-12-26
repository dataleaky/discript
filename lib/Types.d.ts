import type Client from './client/Client';
declare type JSONObjectType = string | number | boolean | JSONObject | JSONObjectType[] | null;
declare type ImageSize = 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 'auto';
declare type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'webp' | 'gif' | 'auto';
declare type DiscordLocales = 'en-US' | 'en-GB' | 'zh-CN' | 'zh-TW' | 'cs' | 'da' | 'nl' | 'fr' | 'de' | 'el' | 'hu' | 'it' | 'ja' | 'ko' | 'no' | 'pl' | 'pt-BR' | 'ru' | 'es-ES' | 'sv-SE' | 'tr' | 'bg' | 'uk' | 'fi' | 'hr' | 'ro' | 'lt';
declare type PartialObject<T> = {
  [key in keyof T]?: T[key];
};
interface JSONObject {
  [key: string]: JSONObjectType;
}
interface UnknownObject {
  [key: string]: unknown;
}
interface ClientObject {
  client: Client;
}
interface ImageParams {
  format?: ImageFormat;
  size?: ImageSize;
}
interface KeyValueParse<T> {
  key: keyof T;
  value: T[KeyValueParse<T>['key']];
}
export type { ClientObject, DiscordLocales, ImageFormat, ImageParams, ImageSize, JSONObject, JSONObjectType, KeyValueParse, PartialObject, UnknownObject };
