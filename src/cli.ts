import { Logger } from './logger';
import { ConfigParser } from './parsers/config-parser';
import { ArgumentsParser } from './parsers/arguments-parser';
const figlet = require('figlet');

/**
 * Class used to handle main program flow
 */
export class CLI {
  /**
   * Main method
   */
  async main() {
    console.log(figlet.textSync('i18n OpenAI'));
    const argumentParser = new ArgumentsParser();

    const configParser = new ConfigParser();
    await configParser.loadConfig();
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
