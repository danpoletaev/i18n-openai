import path from 'node:path';
import { IConfig } from '../interface';

/**
 * Return absolute path from path segments
 * @param pathSegment
 * @returns
 */
export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

/**
 * Return absolute runtime paths. Path to locales folder and main locale folder
 * @param config
 * @returns
 */
export const getRuntimePaths = (config: IConfig) => {
  return {
    LOCALES_FOLDER: getPath(config.pathToLocalesFolders),
    MAIN_LOCALE_FOLDER: getPath(config.pathToLocalesFolders + '/' + config.mainLocale),
  };
};

/**
 * Return absolute path to i18n-openai.config.js
 * @returns
 */
export const getConfigFilePath = async () => {
  return getPath('i18n-openai.config.js');
};
