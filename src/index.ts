import chalk from 'chalk';
import path from 'path';
import dotenv from 'dotenv';
import { cleanPathsInError } from './utils/utils';
import { discordManager } from './utils/globals';
import { loadConfig } from './utils/config';

// Set up dotenv
dotenv.config({
  path: path.join(__dirname, '../.env')
});

// Handles uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error(`${chalk.red(`Uncaught Exception.`)}\n${error.stack}`);
  discordManager.log(`Uncaught Exception.\n${cleanPathsInError(error.stack!)}`);
});

// Handles unhandled rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error(`${chalk.red(`Unhandled Rejection.`)}\n${(reason as any).stack}`);
  discordManager.log(`Unhandled Rejection.\n${cleanPathsInError((reason as any).stack)}`);
});

async function start() {
  loadConfig();
  await discordManager.start();
}

start();
