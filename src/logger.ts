export class Logger {
  /**
   * Generic log
   */
  static log(emoji: string, ...text: string[]): void {
    return console.log(emoji, `[i18n-openai]`, ...text);
  }

  /**
   * Generic error logger
   */
  static error(...text: string[]) {
    return this.log(`\x1b[31m`, ` ❌ `, ...text);
  }

  /**
   * Generic warn logger
   */
  static warn(...text: string[]) {
    return this.log('\x1b[33m', `⚠️`, ...text);
  }

  static localeTranslating(...text: string[]) {
    return console.log(`\x1b[36m [i18n-openai]`, '🌐', ...text);
  }

  /**
   * Generic success logger
   */
  static success(...text: string[]) {
    return this.log('\x1b[32m', `✅ `, ...text);
  }

  static incorrectFilteredLocales(locale: string, possibleLocales: string) {
    Logger.error(
      `Make sure you entered correct locale as argument (${locale}) or make sure you specified correct path to locales folder in i18n-openai.config.js (default public/locales). Possible locales - ${possibleLocales}`,
    );
  }

  static incorrectFilteredFiles(files: string, possibleFiles: string) {
    Logger.error(
      `Make sure you entered correct files as arguments (${files}) or make sure you specified correct path to locales folder in i18n-openai.config.js (default public/locales). Possible files - ${possibleFiles}`,
    );
  }

  static noConfigFile() {
    Logger.error('Unable to find i18n-openai.config.js or custom config file.');
  }
}
