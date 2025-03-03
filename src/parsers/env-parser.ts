export class EnvParser {
  private readonly _apiKey: string | undefined;
  constructor(apiKey?: string) {
    this._apiKey = apiKey ?? process.env.OPENAI_API_KEY;
  }

  loadEnv() {
    return this._apiKey;
  }
}
