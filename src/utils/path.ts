import path from 'node:path';
import { IConfig } from '../interface';

/**
 * Return absolute path from path segments
 */
export const getPath = (...pathSegment: string[]): string => {
  return path.resolve(process.cwd(), ...pathSegment);
};

/**
 * Return absolute runtime paths. Path to locales folder and main locales folder
 */
export const getRuntimePaths = (config: IConfig) => {
  return {
    LOCALES_FOLDER: getPath(config.pathToLocalesFolders),
    MAIN_LOCALE_FOLDER: getPath(config.pathToLocalesFolders + '/' + config.mainLocale),
  };
};

/**
 * Return absolute path to i18n-openai.config.js
 */
export const getConfigFilePath = () => {
  return getPath('i18n-openai.config.js');
};
