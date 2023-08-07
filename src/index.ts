#!/usr/bin/env node
import { CLI } from './cli';
require('dotenv').config();

console.log(process.env.OPENAI_API_KEY);

// Execute CLI
new CLI().execute();
