#!/usr/bin/env node
import { CLI } from './cli';
import { EnvParser } from './parsers/env-parser';
/* eslint-disable @typescript-eslint/no-var-requires*/
require('dotenv').config();

const apiKey = new EnvParser().loadEnv();

// Execute CLI
new CLI(apiKey).execute();
