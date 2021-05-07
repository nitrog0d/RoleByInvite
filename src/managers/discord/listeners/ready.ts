import { Listener } from 'discord-akairo';
import { config } from '../../../utils/config';
import { discordManager, savedInvites } from '../../../utils/globals';

export default class ReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready'
    });
  }

  public exec() {
    config.Guilds.forEach(async configGuild => {
      const guild = await discordManager.client.guilds.fetch(configGuild.GuildID);
      if (guild) {
        if (guild.members.resolve(guild.client.user!.id)!.hasPermission('MANAGE_GUILD')) {
          console.info(`Fetching invites for guild ${guild.name}/${guild.id}.`);
          discordManager.log(`Fetching invites for guild \`${guild.name}\`/\`${guild.id}\`.`);
          const invites = await guild.fetchInvites();
          savedInvites.set(configGuild.GuildID, invites);
        } else {
          console.info(`Can't fetch invites for guild ${guild.name}/${guild.id}, no permission.`);
          discordManager.log(`Can't fetch invites for guild \`${guild.name}\`/\`${guild.id}\`, no permission.`);
        }
      } else {
        console.info(`Can't find guild with ID ${configGuild.GuildID}.`);
        discordManager.log(`Can't find guild with ID \`${configGuild.GuildID}\`.`);
      }
    });
  }
}
