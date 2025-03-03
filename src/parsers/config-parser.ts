import { getConfigFilePath, getPath, getRuntimePaths } from '../utils/path';
import { Logger } from '../logger';
import { IConfig, Locales, PartialConfig } from '../interface';
import defaultConfig from '../resources/default-config';
import { isLocaleCorrect } from '../utils/langauges';
import fs from 'fs';

/** Class for parsing config */
export class ConfigParser {
  private readonly _config: IConfig;
  constructor(config?: PartialConfig) {
    const baseConfig = this.loadBaseConfig();
    this._config = this.validateConfig({...baseConfig, ...config});
  }

  /**
   * Returns either default config or config provided by user
   */
  private loadBaseConfig(): IConfig {
    const path = getConfigFilePath();

    Logger.log('✨', `Loading i18n-openai config:`, path);

    try {
      return require(path);
    } catch (err) {
      Logger.warn(`Using default config. i18n-openai.config.js was not found`);
      return defaultConfig as IConfig;
    }
  }

  /**
   * Validates if correct locale provided in config mainLocale
   */
  private validateMainLocale = (locale: Locales) => {
    if (!isLocaleCorrect(locale)) {
      Logger.error(`locale: ${locale} in config is incorrect`);
      throw new Error('Please, specify correct locales in mainLocale');
    }
  };

  /**
   * Validates locales folders exist in provided folder path
   */
  private validatePathToLocalesFolders = (path: string) => {
    if (!fs.existsSync(getPath(path))) {
      Logger.error(`folder at ${path} does not exist`);
      throw new Error('Please, specify correct path in config');
    }
  };

  /**
   * Validates config and adds variables, which were not provided by user
   * @returns config
   */
  private validateConfig(config: PartialConfig): IConfig {
    this.validateMainLocale(config?.mainLocale ?? defaultConfig.mainLocale);
    this.validatePathToLocalesFolders(config?.pathToLocalesFolders ?? defaultConfig.pathToLocalesFolders);

    const { skipLocales, mainLocale, pathToLocalesFolders, customPrompt, model } = defaultConfig;

    return {
      skipLocales: config?.skipLocales ?? skipLocales,
      mainLocale: config?.mainLocale ?? mainLocale,
      pathToLocalesFolders: config?.pathToLocalesFolders ?? pathToLocalesFolders,
      customPrompt: config?.customPrompt ?? customPrompt,
      model: config?.model ?? model,
    };
  }

  /**
   * Loads config provided by user or loads default config
   */
  loadConfig() {
    const runtimePaths = getRuntimePaths(this._config);

    return {
      config: this._config,
      runtimePaths,
    };
  }
}
