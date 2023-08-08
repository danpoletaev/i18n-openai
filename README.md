[![npm version](https://badge.fury.io/js/i18n-openai.svg)](https://badge.fury.io/js/i18n-openai)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/danpoletaev/i18n-openai/pulls)
![Github Actions](https://github.com/danpoletaev/i18n-openai/actions/workflows/npm-publish.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://opensource.org/licenses/MIT)
![Coverage](https://img.shields.io/badge/Coverage-85%25-83A603.svg?prefix=$coverage$)

## Table of contents

- [Getting started](#getting-started)
    - [Installation](#installation)
    - [Create config file](#create-config-file-optional)
    - [Add API key](#add-openaai-api-key-to-env)
    - [Translate](#translate)
- [Arguments](#possible-arguments)
- [Configuration Options](#configuration-options)
- [Custom prompt](#custom-prompt)

## Getting started

### Installation
There is two variants of installing a package. Either install it for a certain project to dev dependencies or install it globally.
#### Installing to dev dependencies:
Install using yarn:
```shell
yarn add i18n-openai -D
```
Install using npm:
```shell
npm i i18n-openai --save-dev
```

### Create config file (optional)

You can add your custom config by creating `i18n-openai.config.json`. If no config file would be provided, default config would be used 👇

```js
module.exports = {
    skipLocales: [], // (optional)
    mainLocale: 'en', // (optional)
    pathToLocalesFolders: 'public/locales', // (optional)
    customPrompt:
    'Return content translated to {0}. Keep all sequences /n. Keep all special characters. Do not return any additional information, return only translated text.', // (optional)
}
```
If config file is provided, but some of the variables from config are not provided, then default values would be used.

### Add OpenaAI API key to .env
In order to use OpenAI translation, the key must be provided in .env file.
```js
OPENAI_API_KEY=<your_api_key>
```

### Translate
If you have installed package in dev dependencies, then run:
```shell
npx i18n-openai 
```
:warning: If no arguments are provided. `i18n-openai` will translate all files for all locales, except mainLocale provided in config.

### Possible arguments
#### Locales

Use `-locales` to specify locales for translation. The separator is `,`:
```shell
npx i18n-openai -locales ar,cs,de
npx i18n-openai -locales de
```
#### Files
Use `-files` to specify files for translation(files are being taken from main locale folder). The separator is `,`:
```shell
npx i18n-openai -files firstFile.json,secondFile.json
npx i18n-openai -files test.json
```
#### To see list of all available arguments in terminal use `-h`
```shell
npx i18n-openai -h
```
#### Arguments can be combined (order of arguments does not matter):
```shell
npx i18n-openai -files firstFile.json,secondFile.json -locales ar,de
```
## Configuration Options

| property                                            | description                                                                                                                                                                                                                                                                                                                                                                                                                          | type                                                                                                                     |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| skipLocales(optional)                                             | Locales which will not be translated(Default: [])                                                                                                                                                                                                                                                                                                                                                                                                             | string[]                                                                                                                   |
| mainLocale (optional)                                   | From what locale translation would be. (Default: en)                                                                                                                                                                                                                                                                                                                      | string                                                                                                   |
| pathToLocalesFolders (optional)                               | Relative path to locales folder (Default: public/locales)                                                                                                                                                                                                                                                                                                                                                                                                    | string                                                                                                                   |
| customPrompt(optional)                                 | [see section custom prompt](#custom-prompt)                                                                                                                                                                                                                                                                                                                                                                                                              | string                                                                                                                   |

## Custom prompt

You can specify your custom prompt to use with OpenAI for translation. Custom prompt should contain `{0}` sequence. Language is being replaced by `${0}` once request to OpenaAI is being made.

Default custom prompt: `Return content translated to {0}. Keep all sequences /n. Keep all special characters. Do not return any additional information, return only translated text.`

## Contribution

All PRs are welcome :)
