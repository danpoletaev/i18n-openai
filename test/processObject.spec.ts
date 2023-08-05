import { processEachStringInObject } from '../src/processObject';
import { assert } from 'chai';
import 'mocha';
import { generateRandomString, getRandomInt } from './test-utils';
import { before } from 'mocha';

const PROCESSED_STRING = 'processed';

describe('processEachStringInObject', () => {
  const processFn: (str: string) => string = (str: string) => PROCESSED_STRING;

  context('when passing object', () => {
    context('empty object', () => {
      it('should return true', () => {
        const emptyObj = {};
        const processed = JSON.stringify(emptyObj);

        assert.equal(processed === JSON.stringify(processEachStringInObject(emptyObj, processFn)), true);
      });
    });

    context('random object with [1..10] properties and without nested objects', () => {
      let randomObjectWithProperties: any = {};
      let randomProcessedObject: any = {};

      before(() => {
        const randomNum = getRandomInt(1, 10);
        for (let i = 0; i < randomNum; i++) {
          const key = generateRandomString(10);
          randomObjectWithProperties[key] = generateRandomString(10);
          randomProcessedObject[key] = PROCESSED_STRING;
        }
      });

      it('should return true', () => {
        const processed = JSON.stringify(randomProcessedObject);

        assert.equal(
          processed === JSON.stringify(processEachStringInObject(randomObjectWithProperties, processFn)),
          true,
        );
      });
    });

    context('object with nested objects', () => {
      it('should return true', () => {
        const toTest = {
          test: {
            test: {
              test: 'test',
            },
          },
        };

        const processed = JSON.stringify({
          test: {
            test: {
              test: PROCESSED_STRING,
            },
          },
        });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });

    context('object with nested arrays', () => {
      it('should return true', () => {
        const toTest = {
          test: {
            test: [
              {
                test: ['str'],
                test2: 'string',
              },
              {
                test: ['str'],
                test2: 'string',
              },
            ],
          },
        };

        const processed = JSON.stringify({
          test: {
            test: [
              {
                test: [PROCESSED_STRING],
                test2: PROCESSED_STRING,
              },
              {
                test: [PROCESSED_STRING],
                test2: PROCESSED_STRING,
              },
            ],
          },
        });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });

    context('object with undefined value', () => {
      it('should return true', () => {
        const toTest = {
          test: undefined,
        };

        const processed = JSON.stringify({
          test: null,
        });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });

    context('object with null value', () => {
      it('should return true', () => {
        const toTest = {
          test: null,
        };

        const processed = JSON.stringify({
          test: null,
        });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });
  });

  context('when passing array', () => {
    context('empty array', () => {
      it('should return true', () => {
        const toTest: any[] = [];
        const processed = JSON.stringify([]);

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });

    context('array of string', () => {
      it('should return true', () => {
        const toTest = { test: ['test', 'test', 'test', 'test'] };
        const processed = JSON.stringify({
          test: [PROCESSED_STRING, PROCESSED_STRING, PROCESSED_STRING, PROCESSED_STRING],
        });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });

    context('nested array', () => {
      it('should return true', () => {
        const toTest = { test: [{ test: ['test'] }] };
        const processed = JSON.stringify({ test: [{ test: [PROCESSED_STRING] }] });

        assert.equal(processed === JSON.stringify(processEachStringInObject(toTest, processFn)), true);
      });
    });
  });
});
