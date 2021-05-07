import { Listener } from 'discord-akairo';
import { Guild } from 'discord.js';
import { savedInvites } from '../../../utils/globals';

export default class GuildDeleteListener extends Listener {
  constructor() {
    super('guildDelete', {
      emitter: 'client',
      event: 'guildDelete'
    });
  }

  public async exec(guild: Guild) {
    if (savedInvites.has(guild.id)) savedInvites.delete(guild.id);
  }
}
