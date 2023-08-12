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

  private fileLoading = (file: string) => {
    const frames = ['\\', '|', '/', '-'];

    let i = 0;
    return setInterval(() => {
      const frame = frames[i++ % frames.length];
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
      process.stdout.write(`\x1b[33m     [i18n-openai] ⏳ Translating file ${file}: ${frame}`);
    }, 100);
  };

  private fileLoaded = (file: string, isSuccess: boolean, locale: string) => {
    process.stdout.cursorTo(0);
    process.stdout.clearLine(0);
    if (isSuccess) {
      process.stdout.write(`\x1b[32m     [i18n-openai] ✅ File ${file} translated successfully` + '\n');
    } else {
      process.stdout.write(
        `\x1b[31m     [i18n-openai] ❌ There was a problem translating file: ${file}. Try again with arguments: -locales ${locale} -files ${file}` +
          '\n',
      );
    }
  };

  /**
   * Translates given filtered files for filtered locales and saves them
   */
  async translate() {
    for (const locale of this._filtered.locales) {
      const currentLocaleFolder = getPath(this._runtimePaths.LOCALES_FOLDER + '/' + locale);

      Logger.localeTranslating(`Translating files for ${locale} locale:`);
      for (const file of this._filtered.files) {
        const fileLoading = this.fileLoading(file);
        const currentMainLocaleFile = getPath(this._runtimePaths.MAIN_LOCALE_FOLDER + '/' + file);
        try {
          const translateObject = await this.getTranslatedObject(currentMainLocaleFile, locale);
          const path = getPath(currentLocaleFolder + '/' + file);
          fs.writeFileSync(path, JSON.stringify(translateObject));
          clearInterval(fileLoading);
          this.fileLoaded(file, true, locale);
        } catch (err) {
          clearInterval(fileLoading);
          this.fileLoaded(file, false, locale);
          throw new Error();
        }
      }
    }
  }
}
