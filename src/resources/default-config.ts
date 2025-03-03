import { IConfig, Locales } from '../interface';

const defaultConfig: IConfig = {
  skipLocales: ['default'],
  mainLocale: 'en' as Locales,
  pathToLocalesFolders: 'public/locales',
  customPrompt:
    'Return content translated to {0}. Keep all sequences /n. Keep all special characters. Do not return any additional information, return only translated text.',
  model: 'gpt-3.5-turbo',
};

export default defaultConfig;
