import { assert, expect } from 'chai';
import { IConfig, Locales, PartialConfig } from '../../src/interface';
import { ConfigParser } from '../../src/parsers/config-parser';
import mock from 'mock-fs';

describe('loadConfig', () => {
  context('when mainLocale exist', () => {
    it('should return true', () => {
      const config: PartialConfig = {
        mainLocale: 'en',
        skipLocales: ['default'],
        pathToLocalesFolders: 'src',
      };
      assert.ok(new ConfigParser(config));
    });
  });

  context('when mainLocale does not exist', () => {
    it('should return true', () => {
      const config: PartialConfig = {
        mainLocale: 'sada' as Locales,
        skipLocales: ['default'],
        pathToLocalesFolders: 'src',
      };
      expect(() => new ConfigParser(config)).to.throw();
    });
  });

  context('when custom pathToLocale exists', () => {
    const config: PartialConfig = {
      mainLocale: 'en' as Locales,
      skipLocales: ['default'],
      pathToLocalesFolders: 'newFolder/locales',
    };
    before(() => {
      mock({
        'newFolder/locales': {},
      });
    });

    it('should return true', () => {
      const configParser = new ConfigParser(config);
      const loadedConfig = configParser.loadConfig();
      assert.equal(loadedConfig.config.pathToLocalesFolders, config.pathToLocalesFolders);
      assert.ok(new ConfigParser(config));
    });

    afterEach(() => {
      mock.restore();
    });
  });

  context('when custom pathToLocale does not exist', () => {
    const config: IConfig = {
      mainLocale: 'en' as Locales,
      skipLocales: ['default'],
      pathToLocalesFolders: 'newFolder/locales',
      customPrompt: '',
    };
    before(() => {
      mock({
        'public/locales': {},
      });
    });

    it('should return true', () => {
      expect(() => new ConfigParser(config)).to.throw();
    });

    afterEach(() => {
      mock.restore();
    });
  });
});
