import { assert } from 'chai';
import { isLocaleCorrect } from '../../src/utils/langauges';
import { Locales } from '../../src';

describe('language', () => {
  context('when passed correct locales', () => {
    it('should return true', () => {
      assert.equal(isLocaleCorrect('en' as Locales), true);
    });
  });

  context('when passed incorrect locales', () => {
    it('should return false', () => {
      assert.equal(isLocaleCorrect('sss' as Locales), false);
    });
  });

  context('when passed undefined or null', () => {
    it('should return false', () => {
      assert.equal(isLocaleCorrect(undefined as unknown as Locales), false);
      assert.equal(isLocaleCorrect(null as unknown as Locales), false);
    });
  });
});
