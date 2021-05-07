import chalk from 'chalk';
import path from 'path';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import { cleanPathsInError } from '../../utils/utils';
import { config } from '../../utils/config';
import { TextChannel } from 'discord.js';

export class DiscordManager {
  public client!: AkairoClient;
  public commandHandler!: CommandHandler;
  public listenerHandler!: ListenerHandler;
  public ready = false;

  public start() {
    return new Promise<void>(async (resolve, reject) => {
      this.client = new AkairoClient({
        ownerID: config.OwnerIDs
      });

      this.commandHandler = new CommandHandler(this.client, {
        directory: path.join(__dirname, 'commands'),
        prefix: config.BotPrefix || '!',
        blockBots: true,
        commandUtil: true,
        handleEdits: true,
        storeMessages: true,
        allowMention: true,
        ignorePermissions: this.client.ownerID,
        ignoreCooldown: this.client.ownerID,
      });

      this.listenerHandler = new ListenerHandler(this.client, {
        directory: path.join(__dirname, 'listeners')
      });

      /*this.inhibitorHandler = new InhibitorHandler(this.client, {
        directory: path.join(__dirname, 'inhibitors')
      });*/

      this.commandHandler.useListenerHandler(this.listenerHandler);
      // this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

      this.listenerHandler.setEmitters({
        commandHandler: this.commandHandler,
        // inhibitorHandler: this.inhibitorHandler,
        listenerHandler: this.listenerHandler
      });

      this.commandHandler.loadAll();
      this.listenerHandler.loadAll();
      // this.inhibitorHandler.loadAll();

      this.client.once('ready', async () => {
        this.ready = true;
        console.info(`${chalk.bgBlue(`[Discord]`)} Logged in as ${this.client.user!.tag}.`);
        this.log(`\`[Discord]\` Logged in as ${this.client.user!.tag}.`);

        resolve();
      });

      this.client.on('error', (error) => {
        console.error(`${chalk.bgBlue(`[Discord]`)} ${chalk.red(`Error.`)}\n${error.stack}`);
        this.log(`\`[Discord]\` Error.\n${cleanPathsInError(error.stack!)}.`);
      });

      this.commandHandler.on('error', (error) => {
        console.error(`${chalk.bgRedBright(`[Akairo Command Handler]`)} ${chalk.red(`Error.`)}\n${error.stack}`);
        this.log(`\`${chalk.bgRedBright(`[Akairo Command Handler]`)}\` ${chalk.red(`Error.`)}\n${cleanPathsInError(error.stack!)}.`);
      });

      this.client.login(process.env.DISCORD_TOKEN);
    });
  }

  public async log(message: string) {
    if (this.ready && config.LogsChannel !== '') {
      const channel = await this.client.channels.fetch(config.LogsChannel) as TextChannel;
      if (channel) await channel.send(message.length >= 1997 ? message.substring(0, 1997) + '...' : message);
    }
  }
}
