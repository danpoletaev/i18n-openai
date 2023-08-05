import { isArray, isObject } from '../src/utils';
import { assert } from 'chai';
import 'mocha';

// Testing isObject
describe('utils isObject', () => {
  context('when passing real object', () => {
    it('should return true', () => {
      const toTest = {
        test: 'test',
      };

      assert.equal(isObject(toTest), true);
    });

    context('empty object', () => {
      it('should return true', () => {
        const toTest = {};

        assert.equal(isObject(toTest), true);
      });
    });
  });

  context('when passing array', () => {
    it('should return false', () => {
      const toTest = ['test'];

      assert.equal(isObject(toTest), false);
    });

    context('empty array', () => {
      it('should return false', () => {
        const toTest: any[] = [];

        assert.equal(isObject(toTest), false);
      });
    });
  });

  context('when passing string', () => {
    it('should return false', () => {
      const toTest = 'test';

      assert.equal(isObject(toTest), false);
    });
  });

  context('when passing undefined', () => {
    it('should return false', () => {
      const toTest = undefined;

      assert.equal(isObject(toTest), false);
    });
  });

  context('when passing null', () => {
    it('should return false', () => {
      const toTest = null;
      assert.equal(isObject(toTest), false);
    });
  });
});

// Testing isArray
describe('utils isArray', () => {
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
