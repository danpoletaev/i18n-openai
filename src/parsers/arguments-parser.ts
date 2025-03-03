import { ChatModel } from 'openai/resources/chat/chat';
import { IParsedArguments } from '../interface';
import { Command } from 'commander';

/** Class for parsing program arguments */
export class ArgumentsParser {
  private readonly _locales: string[];
  private readonly _files: string[];
  private readonly _model?: ChatModel;
  private readonly _apiKey?: string;

  constructor() {
    const program = new Command();

    program
      .version('1.0.1')
      .description('An example CLI for managing a directory')
      .option('-locales  [value]', 'List of locales to translate')
      .option('-files  [value]', 'List of files to translate')
      .option('-model  [value]', 'Optional model to use for translation')
      .option('-apiKey  [value]', 'Optional API key for openai')
      .parse(process.argv);

    const options = program.opts();
    const localeString = options?.Locales?.split(',');
    const filesString = options?.Files?.split(',');
    const model = options?.Model;
    const apiKey = options?.ApiKey;

    this._locales = localeString;
    this._files = filesString;
    this._model = model;
    this._apiKey = apiKey;
  }

  /**
   * Gets parsed arguments provided by user
   */
  getArguments(): IParsedArguments {
    return {
      locales: this._locales,
      files: this._files,
      model: this._model,
      apiKey: this._apiKey,
    };
  }

  /** Returns locales provided as arguments */
  get locales(): string[] {
    return this._locales;
  }

  /** Returns files provided as arguments */
  get files(): string[] {
    return this._files;
  }

  /** Returns model provided as arguments */
  get model(): ChatModel | undefined {
    return this._model;
  }

  /** Returns api key provided as arguments */
  get apiKey(): string | undefined  {
    return this._apiKey;
  }
}
