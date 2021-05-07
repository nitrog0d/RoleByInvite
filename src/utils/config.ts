import fs from 'fs';
import path from 'path';

export interface IRolesByInvite {
  InviteCode: string;
  RoleID: string;
}

export interface IGuild {
  GuildID: string;
  RolesByInvite: IRolesByInvite[];
}

export interface IConfig {
  ConfigVersion: number;
  OwnerIDs: string[];
  BotPrefix: string;
  LogsChannel: string;
  Guilds: IGuild[];
}

export let config: IConfig;

export function loadConfig() {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf8'));
}

export function saveConfig() {
  fs.writeFileSync(path.join(__dirname, '../../config.json'), JSON.stringify(config, null, 2), 'utf8');
}

export function reloadConfig() {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, '../../config.json'), 'utf8'));
}
