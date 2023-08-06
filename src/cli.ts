import { Logger } from './logger';
import { ConfigParser } from './parsers/config-parser';
import { ArgumentsParser } from './parsers/arguments-parser';
import { FileProcessor } from './file-processor';
import { IFiltered, ProcessFunction } from './interface';
import { Translator } from './translator';
const figlet = require('figlet');

/**
 * Class used to handle main program flow
 */
export class CLI {
  private processFn: ProcessFunction = (_str: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve('translated');
      }, 10);
    });

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

    const translator = new Translator(filtered, config.runtimePaths, this.processFn);
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
