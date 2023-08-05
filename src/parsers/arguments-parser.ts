const { Command } = require('commander');

/** Class for parsing program arguments */
export class ArgumentsParser {
  private readonly _locales: string[];
  private readonly _files: string[];

  constructor() {
    const program = new Command();

    program
      .version('1.0.0')
      .description('An example CLI for managing a directory')
      .option('-locales  [value]', 'List of locales to translate')
      .option('-file  [value]', 'List of files to translate')
      .parse(process.argv);

    const options = program.opts();
    const localeString = options?.Locale?.split(',') ?? [];
    const filesString = options?.Files?.split(',') ?? [];

    this._locales = localeString;
    this._files = filesString;
  }

  /** Returns locales provided as arguments */
  get locales(): string[] {
    return this._locales;
  }

  /** Returns files provided as arguments */
  get files(): string[] {
    return this._files;
  }
}