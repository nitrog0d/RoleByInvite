import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { config } from '../../../utils/config';
import { savedInvites } from '../../../utils/globals';

export default class GuildCreateListener extends Listener {
  constructor() {
    super('guildCreate', {
      emitter: 'client',
      event: 'guildCreate'
    });
  }

  public async exec(guild: Guild) {
    if (config.Guilds.find(configGuild => configGuild.GuildID === guild.id)) {
      savedInvites.set(guild.id, await guild.fetchInvites());
    }
  }
}
