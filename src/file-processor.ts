import { Logger } from './logger';
import fs from 'fs';
import { IConfigWithPaths, IFiltered, IParsedArguments } from './interface';

/**
 * Class, that reads files from filesystem and filters it
 */
export class FileProcessor {
  private readonly _config: IConfigWithPaths;
  private readonly _arguments: IParsedArguments;

  constructor(config: IConfigWithPaths, parsedArguments: IParsedArguments) {
    this._config = config;
    this._arguments = parsedArguments;
  }

  /**
   * Gets filtered locale array. If the array of locales is empty throws and error
   */
  private getFilteredLocales() {
    const localesFolder = this._config.runtimePaths.LOCALES_FOLDER;
    const allLocalesInFolder = fs.readdirSync(localesFolder);

    const localesArg = this._arguments.locales;

    const filteredAllLocales = allLocalesInFolder
      .filter(
        (locale) => !this._config.config.skipLocales.includes(locale) && locale !== this._config.config.mainLocale,
      )
      .filter((locale) => (localesArg ? localesArg.includes(locale) : true));

    if (filteredAllLocales.length === 0) {
      Logger.incorrectFilteredLocales(localesArg?.join(',') ?? '', allLocalesInFolder.join(','));
      throw new Error();
    }

    return filteredAllLocales;
  }

  /**
   * Gets filtered files array. If the array of files is empty throws and error
   */
  private getFilteredFiles() {
    const mainLocaleFolder = this._config.runtimePaths.MAIN_LOCALE_FOLDER;
    const allFilesInMainLocaleFolder = fs.readdirSync(mainLocaleFolder);

    const filesArg = this._arguments.files;

    const filteredAllFilesInMainLocaleFolder = allFilesInMainLocaleFolder.filter((file) =>
      filesArg ? filesArg.includes(file) : true,
    );
    if (filteredAllFilesInMainLocaleFolder.length === 0) {
      Logger.incorrectFilteredFiles(filesArg?.join(',') ?? '', allFilesInMainLocaleFolder.join(','));
      throw new Error();
    }

    return filteredAllFilesInMainLocaleFolder;
  }

  /**
   * Gets filtered files and locales array
   */
  getFiltered(): IFiltered {
    const locales = this.getFilteredLocales();

    const files = this.getFilteredFiles();

    return {
      locales,
      files,
    };
  }
}
