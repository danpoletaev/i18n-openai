import { processEachStringInObject } from '../../src/utils/process-object';
import { assert } from 'chai';
import 'mocha';
import { before } from 'mocha';
import { ProcessFunction } from '../../src/interface';

const PROCESSED_STRING = 'processed';

function getRandomInt(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function generateRandomString(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

describe('processEachStringInObject', () => {
  const processFn: ProcessFunction = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(PROCESSED_STRING);
      }, 10);
    });

  context('when passing object', () => {
    context('empty object', () => {
      it('should return true', () => {
        const emptyObj = {};
        const processed = JSON.stringify(emptyObj);

        processEachStringInObject(emptyObj, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });

    context('random object with [1..10] properties and without nested objects', () => {
      const randomObjectWithProperties: Record<string, string> = {};
      const randomProcessedObject: Record<string, string> = {};

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

        processEachStringInObject(randomObjectWithProperties, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });

    context('object with nested objects', () => {
      it('should return true', async () => {
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

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });

    context('object with nested arrays', () => {
      it('should return true', async () => {
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

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
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

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
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

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });
  });

  context('when passing array', () => {
    context('empty array', () => {
      it('should return true', async () => {
        const toTest: [] = [];
        const processed = JSON.stringify([]);

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });

    context('array of string', () => {
      it('should return true', async () => {
        const toTest = { test: ['test', 'test', 'test', 'test'] };
        const processed = JSON.stringify({
          test: [PROCESSED_STRING, PROCESSED_STRING, PROCESSED_STRING, PROCESSED_STRING],
        });

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });

    context('nested array', () => {
      it('should return true', async () => {
        const toTest = { test: [{ test: ['test'] }] };
        const processed = JSON.stringify({ test: [{ test: [PROCESSED_STRING] }] });

        processEachStringInObject(toTest, processFn, 'en').then((res) =>
          assert.equal(processed === JSON.stringify(res), true),
        );
      });
    });
  });
});
