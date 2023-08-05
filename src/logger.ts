export class Logger {
  /**
   * Generic log
   */
  static log(emoji: string, ...text: string[]): any {
    return console.log(emoji, `[i18n-openai]`, ...text);
  }

  /**
   * Generic error logger
   */
  static error(...text: string[]) {
    return this.log(`\x1b[31m`, `❌`, ...text);
  }

  /**
   * Generic warn logger
   */
  static warn(...text: string[]) {
    return this.log('\x1b[33m', `⚠️`, ...text);
  }

  /**
   * Generic success logger
   */
  static success(...text: string[]) {
    return this.log('\x1b[32m', `✅ `, ...text);
  }

  static noConfigFile() {
    Logger.error('Unable to find i18n-openai.config.js or custom config file.');
  }
}
