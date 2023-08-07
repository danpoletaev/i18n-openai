import { Configuration, CreateChatCompletionRequest, OpenAIApi } from 'openai';
import { Locales } from './interface';
import { localeToLanguageMap } from './resources/languages';
import defaultConfig from './resources/default-config';
import { Logger } from './logger';

const EMPTY_MESSAGE = null;
const LANGUAGE_REPLACEMENT = '{0}';

/**
 * Class for making requests to openai
 */
export class Openai {
  private readonly _openai: OpenAIApi;
  private readonly _prompt: string;

  constructor(apiKey: string, customPrompt?: string) {
    const configuration = new Configuration({
      apiKey,
    });
    this._openai = new OpenAIApi(configuration);
    this._prompt = customPrompt ?? defaultConfig.customPrompt;
  }

  /**
   * Creates request for openai chat completion
   */
  private createRequest(value: string, locale: Locales): CreateChatCompletionRequest {
    const language = localeToLanguageMap[locale];

    return {
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: this._prompt.replace(LANGUAGE_REPLACEMENT, language),
        },
        {
          role: 'user',
          content: value,
        },
      ],
      max_tokens: 2048,
    };
  }

  /**
   * Translates given value
   */
  async translateString(value: string, locale: string) {
    try {
      const translatedResponse = await this._openai.createChatCompletion(this.createRequest(value, locale as Locales));

      if (translatedResponse.status === 200) {
        const firstChoice = translatedResponse.data.choices?.[0];
        if (firstChoice.finish_reason === 'stop') {
          const translatedText = firstChoice?.message?.content;
          if (translatedText?.substring(0, 2) === '\n\n') {
            return translatedText.substring(0, 2);
          }
          if (!translatedText) {
            return EMPTY_MESSAGE;
          }
          return translatedText;
        }
      }
      return EMPTY_MESSAGE;
    } catch (err) {
      /* eslint-disable  @typescript-eslint/no-explicit-any*/
      if ((err as any).response.status === 401) {
        Logger.error('Unauthorized. Check your api key.');
        process.exit(1);
      }
      Logger.warn('Network error. Trying to continue translation');
      return EMPTY_MESSAGE;
    }
  }
}
