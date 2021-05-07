import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import { CommandCategories } from '../../../utils/globals';

export default class PingCommand extends Command {
  constructor() {
    super('ping', {
      aliases: [ 'ping' ],
      typing: true,
      category: CommandCategories.Default
    });
  }

  public async exec(message: Message) {
    const sent = await message.util!.send('Pong!');
    const timeDiff = (sent.editedAt || sent.createdAt).getMilliseconds() - (message.editedAt || message.createdAt).getMilliseconds();
    message.util!.edit([
      'Pong!',
      `🔂 **RTT**: ${timeDiff}ms`,
      `💟 **Heartbeat**: ${Math.round(this.client.ws.ping)}ms`
    ]);
  }
}
