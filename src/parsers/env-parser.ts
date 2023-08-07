import { Logger } from '../logger';

export class EnvParser {
  private readonly _apiKey: string | undefined;
  constructor(apiKey?: string) {
    this._apiKey = apiKey ?? process.env.OPENAI_API_KEY;
  }

  loadEnv() {
    if (this._apiKey) {
      return this._apiKey;
    } else {
      Logger.error('No api key was found in .env. Please, provide an api key');
      process.exit(1);
    }
  }
}
