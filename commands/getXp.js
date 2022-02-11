const Discord = require('discord.js');
require('dotenv').config();
const db = require('../database');

module.exports.run = async (client, message, arguments) => {
    db.executeQuery(`SELECT xp_level FROM xp WHERE user_id=${message.author.id} AND server_id=${message.guild.id}`).then(lvl => {
        const level = lvl[0]['xp_level'];
        const embed = new Discord.MessageEmbed();
        embed.setTitle(message.author.username)
        embed.setDescription(`Vous êtes niveau ${level}`)
    
        message.channel.send({ embeds: [embed] })
    });
};

module.exports.name = 'xp';