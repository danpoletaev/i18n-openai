import { getPath } from './utils/path';
import fs from 'fs';
import { Logger } from './logger';
import { processEachStringInObject } from './utils/process-object';
import { IFiltered, IRuntimePaths, ProcessFunction } from './interface';

/**
 * Class, that translates filtered files and locales
 */
export class Translator {
  private readonly _filtered: IFiltered;
  private readonly _runtimePaths: IRuntimePaths;
  private readonly _translateFn: ProcessFunction;

  constructor(filtered: IFiltered, runtimePaths: IRuntimePaths, translateFn: ProcessFunction) {
    this._filtered = filtered;
    this._runtimePaths = runtimePaths;
    this._translateFn = translateFn;
  }

  /**
   * Reads json by path, if file does not exist throws an error
   */
  private async readJSON(filePath: string) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (err) {
      Logger.error(`Error reading or parsing file ${filePath}: ${err}`);
      return null;
    }
  }

  /**
   * Reads json file, translates it and returns translated object
   */
  private async getTranslatedObject(file: string, locale: string) {
    const jsonFile = await this.readJSON(file);
    return processEachStringInObject(jsonFile, this._translateFn, locale);
  }

  /**
   * Translates given filtered files for filtered locales and saves them
   */
  async translate() {
    await Promise.all(
      this._filtered.locales.map(async (locale) => {
        const currentLocaleFolder = getPath(this._runtimePaths.LOCALES_FOLDER + '/' + locale);

        await Promise.all(
          this._filtered.files.map(async (file) => {
            const currentMainLocaleFile = getPath(this._runtimePaths.MAIN_LOCALE_FOLDER + '/' + file);
            try {
              const translateObject = await this.getTranslatedObject(currentMainLocaleFile, locale);
              const path = getPath(currentLocaleFolder + '/' + file);
              fs.writeFileSync(path, JSON.stringify(translateObject));
              Logger.success(`File ${file} successfully translated for ${locale} locale`);
            } catch (err) {
              Logger.error(`Error while translating ${file} for ${locale} locale.`);
              throw new Error();
            }
          }),
        );
      }),
    );
  }
}
