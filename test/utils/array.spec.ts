import { assert } from 'chai';
import { isArray } from '../../src/utils/array';

describe('array isArray', () => {
  context('when passing real object', () => {
    it('should return false', () => {
      const toTest = {
        test: 'test',
      };

      assert.equal(isArray(toTest), false);
    });

    context('empty object', () => {
      it('should return false ', () => {
        const toTest = {};

        assert.equal(isArray(toTest), false);
      });
    });
  });

  context('when passing array', () => {
    it('should return true', () => {
      const toTest = ['test'];

      assert.equal(isArray(toTest), true);
    });

    context('empty array', () => {
      it('should return true ', () => {
        const toTest: any[] = [];

        assert.equal(isArray(toTest), true);
      });
    });
  });

  context('when passing string', () => {
    it('should return false', () => {
      const toTest = 'test';

      assert.equal(isArray(toTest), false);
    });
  });

  context('when passing undefined', () => {
    it('should return false', () => {
      const toTest = undefined;

      assert.equal(isArray(toTest), false);
    });
  });

  context('when passing null', () => {
    it('should return false', () => {
      const toTest = null;
      assert.equal(isArray(toTest), false);
    });
  });
});
