import { localeToLanguageMap } from '../resources/languages';
import { Locales } from '../interface';

/**
 * Checks if passed locale exists
 */
export const isLocaleCorrect = (locale: Locales) => !!localeToLanguageMap?.[locale];
