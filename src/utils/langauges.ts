import { allLanguages } from '../resources/languages';
import { Locales } from '../interface';

export const isLocaleCorrect = (locale: Locales) => allLanguages.includes(locale);
