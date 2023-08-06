import { assert } from 'chai';
import { IConfig } from '../../src';
import { getPath, getRuntimePaths } from '../../src/utils/path';
import * as path from 'node:path';

describe('path', () => {
  context('getPath', () => {
    it('should return correct path', () => {
      assert.equal(getPath('test'), path.resolve(process.cwd(), 'test'));
    });
  });

  context('getRuntimePaths', () => {
    it('should return runtime paths', () => {
      const config: IConfig = {
        skipLocales: ['default'],
        mainLocale: 'en',
        pathToLocalesFolders: 'test',
        customPrompt: '',
      };
      const test = getRuntimePaths(config);
      const shouldBe = {
        LOCALES_FOLDER: path.resolve(process.cwd(), config.pathToLocalesFolders),
        MAIN_LOCALE_FOLDER: path.resolve(process.cwd(), config.pathToLocalesFolders + '/' + config.mainLocale),
      };
      assert.equal(JSON.stringify(test), JSON.stringify(shouldBe));
    });
  });

  context('getConfigFilePath', () => {
    it('should return correct path', () => {
      const configPath = 'i18n-openai.config.js';
      assert.equal(getPath(configPath), path.resolve(process.cwd(), configPath));
    });
  });
});
