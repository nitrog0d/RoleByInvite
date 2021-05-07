import { Invite } from 'discord.js';
import { Collection } from 'discord.js';
import { DiscordManager } from '../managers/discord/discordManager';

export const discordManager = new DiscordManager();

export enum CommandCategories {
  Default = 'default',
  Owner = 'owner'
}

export let savedInvites = new Map<string, Collection<string, Invite>>();
