const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
  const embed = new Discord.MessageEmbed();
  embed
    .setTitle('Bonjour')
    .setDescription('wesh la zone');

  message.channel.send({
    embeds: [ embed ]
  })
};

module.exports.name = 'coucou';
