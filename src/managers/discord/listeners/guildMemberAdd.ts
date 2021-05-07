import { Listener } from 'discord-akairo';
import { GuildMember } from 'discord.js';
import { config } from '../../../utils/config';
import { discordManager, savedInvites } from '../../../utils/globals';

export default class GuildMemberAddListener extends Listener {
  constructor() {
    super('guildMemberAdd', {
      emitter: 'client',
      event: 'guildMemberAdd'
    });
  }

  public async exec(member: GuildMember) {
    const configGuild = config.Guilds.find(configGuild => configGuild.GuildID);
    if (configGuild) {
      const newInvites = await member.guild.fetchInvites();
      const oldInvites = savedInvites.get(member.guild.id);

      const invite = newInvites.find(invite => oldInvites.get(invite.code).uses < invite.uses);
      console.info(`Member ${member.user.tag} joined the guild ${member.guild.name}/${member.guild.id}, using the invite ${invite.code}, created by ${invite.inviter.tag}.`);
      discordManager.log(`Member \`${member.user.tag}\` joined the guild \`${member.guild.name}\`/\`${member.guild.id}\`, using the invite \`${invite.code}\`, created by \`${invite.inviter.tag}\`.`);
      const roleToGive = member.guild.roles.resolve(config.Guilds.find(guild => guild.GuildID === invite.guild.id).RolesByInvite.find(configInvite => configInvite.InviteCode === invite.code).RoleID);
      if (!roleToGive) {
        console.info(`Couldn't find the role ${roleToGive} to give to ${member.user.tag}.`);
        discordManager.log(`Couldn't find the role ${roleToGive} to give to \`${member.user.tag}\`.`);
        return;
      }
      if (!member.guild.members.resolve(member.client.user.id).hasPermission('MANAGE_ROLES')) {
        console.info(`Can't give role ${roleToGive.id}/${roleToGive.name} to ${member.user.tag}, no permission.`);
        discordManager.log(`Can't give role \`${roleToGive.id}\`/\`${roleToGive.name}\` to \`${member.user.tag}\`, no permission.`);
        return;
      }
      if (roleToGive.comparePositionTo(member.guild.members.resolve(member.client.user.id).roles.highest) > -1) {
        console.info(`Can't interact with role ${roleToGive.id}/${roleToGive.name}, please give the Bot a higher role.`);
        discordManager.log(`Can't interact with role \`${roleToGive.id}\`/\`${roleToGive.name}\`, please give the Bot a higher role.`);
        return;
      }

      console.info(`Giving role ${roleToGive.id}/${roleToGive.name} to ${member.user.tag}.`);
      discordManager.log(`Giving role \`${member.guild.roles.resolve(roleToGive).name}\`/\`${roleToGive}\` to \`${member.user.tag}\`.`);
      member.roles.add(roleToGive);
    }
  }
}
