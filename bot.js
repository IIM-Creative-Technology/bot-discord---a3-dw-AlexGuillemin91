const {Discord, Permissions } = require('discord.js');
const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');
const mysql = require('mysql');
const db = require('./database');
const newMember = require('./src/newMember');
const xp = require('./src/xpCount');
const shared = require('./src/shared');
const ban = require('./src/banWords');
require('colors');
require('dotenv').config();

const COMMAND_PREFIX = '!';

clientLoader.createClient([
  'GUILDS',
  'GUILD_MESSAGES',
  'GUILD_MEMBERS'
])
  .then(async (client) => {
    await commandLoader.load(client);
    db.connect();

    client.on('guildMemberAdd', async (member) => {
      newMember.addRoleToNewMember(member);
    })

    client.on('messageCreate', async (message) => {
      if (message.author.bot) return;

      xp(message);
      shared(client, message);
      ban(message);

      // Ne pas tenir compte des messages envoyés par les bots, ou qui ne commencent pas par le préfix
      if (!message.content.startsWith(COMMAND_PREFIX)) return;

      // On découpe le message pour récupérer tous les mots
      const words = message.content.split(' ');

      const commandName = words[0].slice(1); // Le premier mot du message, auquel on retire le préfix
      const arguments = words.slice(1); // Tous les mots suivants sauf le premier

      if (client.commands.has(commandName)) {
        // La commande existe, on la lance
        client.commands.get(commandName).run(client, message, arguments);
      } else {
        // La commande n'existe pas, on prévient l'utilisateur
        await message.delete();
        await message.channel.send(`The ${commandName} does not exist.`);
      }
    })
  });
