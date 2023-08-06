import { IConfigWithPaths, IParsedArguments } from '../src';
import { assert, expect } from 'chai';
import { FileProcessor } from '../src/file-processor';
// @ts-ignore
import mock from 'mock-fs';

describe('getFiltered', () => {
  beforeEach(() => {
    mock({
      'public/locales': {
        en: {
          'test.json': '',
          'test2.json': '',
          'test3.json': '',
        },
        cs: {},
        de: {},
        es: {},
      },
    });
  });

  afterEach(() => {
    mock.restore();
  });

  const config: IConfigWithPaths = {
    config: {
      skipLocales: ['default'],
      pathToLocalesFolders: 'public/locales',
      mainLocale: 'en',
      customPrompt: '',
    },
    runtimePaths: {
      LOCALES_FOLDER: 'public/locales',
      MAIN_LOCALE_FOLDER: 'public/locales/en',
    },
  };

  context('when args are undefined', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      locales: undefined,
      files: undefined,
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      const filtered = fileProcessor.getFiltered();
      assert.equal(JSON.stringify(['cs', 'de', 'es']), JSON.stringify(filtered.locales));
    });
  });

  context('when locale is selected', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      locales: ['es'],
      files: undefined,
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      const filtered = fileProcessor.getFiltered();
      assert.equal(JSON.stringify(args.locales), JSON.stringify(filtered.locales));
    });
  });

  context('when filtered locales are empty', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      locales: ['ar'],
      files: undefined,
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      expect(() => fileProcessor.getFiltered()).to.throw();
    });
  });

  context('when file arg is not provided', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      locales: undefined,
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      const filtered = fileProcessor.getFiltered();
      assert.equal(JSON.stringify(['test.json', 'test2.json', 'test3.json']), JSON.stringify(filtered.files));
    });
  });

  context('when file arg is provided', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      locales: undefined,
      files: ['test.json', 'test2.json'],
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      const filtered = fileProcessor.getFiltered();
      assert.equal(JSON.stringify(args.files), JSON.stringify(filtered.files));
    });
  });

  context('when filtered files are empty', () => {
    let fileProcessor: FileProcessor;
    const args: IParsedArguments = {
      files: ['noexists.json'],
    };

    before(() => {
      fileProcessor = new FileProcessor(config, args);
    });
    it('should be equal', () => {
      expect(() => fileProcessor.getFiltered()).to.throw();
    });
  });
});
