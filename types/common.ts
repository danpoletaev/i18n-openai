export type ObjectType = { [key: string]: string | any[] | any };

export type ObjectArrayOrString = ObjectType | string | any[];

export type ProcessFunction = (str: string) => Promise<string>;
