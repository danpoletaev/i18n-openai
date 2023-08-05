import { assert, expect } from 'chai';
import { IConfig, Locales } from '../../src';
import { ConfigParser } from '../../src/parsers/config-parser';

describe('ConfigParser', () => {
  context('when mainLocale exist', () => {
    it('should return true', () => {
      const config: IConfig = {
        mainLocale: 'en',
        skipLocales: ['default'],
        pathToLocalesFolders: 'src',
      };
      assert.ok(new ConfigParser(config));
    });
  });

  context('when mainLocale does not exist', () => {
    it('should return true', () => {
      const config: IConfig = {
        mainLocale: 'sada' as Locales,
        skipLocales: ['default'],
        pathToLocalesFolders: 'src',
      };
      expect(() => new ConfigParser(config)).to.throw();
    });
  });
});
