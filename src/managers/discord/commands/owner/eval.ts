import { Message } from 'discord.js';
import { Command } from 'discord-akairo';
import * as util from 'util';
import { CommandCategories } from '../../../../utils/globals';

export default class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: [ 'eval' ],
      args: [
        {
          id: 'code',
          match: 'content'
        }
      ],
      typing: true,
      ownerOnly: true,
      category: CommandCategories.Owner,
      quoted: false
    });
  }

  public async exec(message: Message, args: { code: string }) {
    if (!args.code) return message.util!.reply('No code provided!');
    const evaled: any = {};
    const logs: any = [];

    const token = this.client.token!.split('').join('[^]{0,2}');
    const rev = this.client.token!.split('').reverse().join('[^]{0,2}');
    const tokenRegex = new RegExp(`${token}|${rev}`, 'g');
    const cb = '```';

    try {
      const globals = require('../../../../utils/globals');
      const config = require('../../../../utils/config');
      let output = eval(args.code);
      if (output && typeof output.then === 'function') output = await output;

      if (typeof output !== 'string') output = util.inspect(output, { depth: 0 });
      output = `${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;
      output = output.replace(tokenRegex, '[TOKEN]');

      if (output.length + args.code.length > 1900) output = 'Output too long.';

      const sent = await message.util!.send([
        `📥\u2000**Input**${cb}js`,
        args.code,
        cb,
        `📤\u2000**Output**${cb}js`,
        output,
        cb
      ]);

      evaled.message = sent;
      evaled.errored = false;
      evaled.output = output;

      return sent;
    } catch (err) {
      console.error(err);
      let error = err;

      error = error.toString();
      error = `${logs.join('\n')}\n${logs.length && error === 'undefined' ? '' : error}`;
      error = error.replace(tokenRegex, '[TOKEN]');

      const sent = await message.util!.send([
        `📥\u2000**Input**${cb}js`,
        args.code,
        cb,
        `☠\u2000**Error**${cb}js`,
        error,
        cb
      ]);

      evaled.message = sent;
      evaled.errored = true;
      evaled.output = error;

      return sent;
    }
  };
}
