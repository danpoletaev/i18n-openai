import { Logger } from './logger';
import { ConfigParser } from './parsers/config-parser';
import { ArgumentsParser } from './parsers/arguments-parser';
import { FileProcessor } from './file-processor';
import { IFiltered, ProcessFunction } from './interface';
import { Translator } from './translator';
import { Openai } from './openai';
const figlet = require('figlet');

/**
 * Class used to handle main program flow
 */
export class CLI {
  private readonly _apiKey: string;

  constructor(apiKey: string) {
    this._apiKey = apiKey;
  }

  /**
   * Main method
   */
  async main() {
    console.log(figlet.textSync('i18n OpenAI'));
    const argumentParser = new ArgumentsParser();

    const configParser = new ConfigParser();

    const config = configParser.loadConfig();

    const parsedArguments = argumentParser.getArguments();

    const fileProcessor = new FileProcessor(config, parsedArguments);
    const filtered: IFiltered = await fileProcessor.getFiltered();

    const openAi = new Openai(this._apiKey);
    const translateFn: ProcessFunction = openAi.translateString.bind(openAi);

    const translator = new Translator(filtered, config.runtimePaths, translateFn);
    await translator.translate();
  }

  /**
   * Runs translation
   */
  async execute() {
    return this.main()
      .then(() => Logger.success('Translation completed'))
      .catch(Logger.error);
  }
}
