import OpenAI from 'openai';
import { ChatCompletionCreateParamsNonStreaming } from 'openai/resources/chat/completions/completions';

import { Locales } from './interface';
import { localeToLanguageMap } from './resources/languages';
import defaultConfig from './resources/default-config';
import { Logger } from './logger';
import { ChatModel } from 'openai/resources/chat/chat';

const EMPTY_MESSAGE = null;
const LANGUAGE_REPLACEMENT = '{0}';

interface OpenaiProps {
  apiKey?: string; // process.env.OPENAI_API_KEY is also the default value now, can be omitted
  customPrompt?: string;
  model?: ChatModel;
}

/**
 * Class for making requests to openai
 */
export class Openai {
  private readonly _openai: OpenAI;
  private readonly _prompt: string;
  private readonly _model: ChatModel;

  constructor({apiKey, customPrompt, model}: OpenaiProps) {
    this._openai = new OpenAI({
      apiKey,
    });
    this._prompt = customPrompt ?? defaultConfig.customPrompt;
    this._model = model ?? defaultConfig.model;
  }

  /**
   * Creates request for openai chat completion
   */
  private createRequest(value: string, locale: Locales): ChatCompletionCreateParamsNonStreaming {
    const language = localeToLanguageMap[locale];

    return {
      model: this._model,
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
   * Gets langauge code from locale. Ex: en-US -> en, en -> en, en_US ->
   */
  private getLanguageLocale(locale: string): Locales {
    if (locale.includes('-')) {
      return locale.split('-')[0] as Locales;
    } else if (locale.includes('_')) {
      return locale.split('_')[0] as Locales;
    } else {
      return locale as Locales;
    }
  }

  /**
   * Translates given value
   */
  async translateString(value: string, locale: string) {
    try {
      const translatedResponse = await this._openai.chat.completions.create(
        this.createRequest(value, this.getLanguageLocale(locale)),
      );

      const firstChoice = translatedResponse.choices?.[0];
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
    } catch (err) {
      /* eslint-disable  @typescript-eslint/no-explicit-any*/
      if ((err as any).response.status === 401) {
        Logger.error('Unauthorized. Check your api key.');
        return process.exit(1);
      }
      Logger.warn('Network error. Trying to continue translation');
      return EMPTY_MESSAGE;
    }
  }
}
