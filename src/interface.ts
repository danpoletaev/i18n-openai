export type ObjectType = { [key: string]: string | any[] | any };

export type ObjectArrayOrString = ObjectType | string | any[];

export type ProcessFunction = (str: string) => Promise<string>;

export type Locales =
  | 'ar'
  | 'cs'
  | 'de'
  | 'es'
  | 'fr'
  | 'id'
  | 'it'
  | 'ja'
  | 'ko'
  | 'nl'
  | 'pl'
  | 'pt'
  | 'ru'
  | 'sk'
  | 'th'
  | 'tr'
  | 'uk'
  | 'vi'
  | 'zh';

export interface IConfig {
  test: string;
}