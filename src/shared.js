const Discord = require('discord.js');
require('dotenv').config();
const db = require('../database')

module.exports = (client, message) => {
    if (message.channel.name != 'shared') {return}

    client.guilds.fetch().then(guilds => {
        guilds.forEach(guild => {
            guild.fetch().then(guild => {
                guild.channels.fetch().then(channels => {
                    channels.forEach(channel => {
                        if (channel.name == 'shared' && channel.id != message.channel.id) {
                            const embed = new Discord.MessageEmbed();
                            embed.setTitle(message.author.username)
                            embed.setDescription(message.content)
                            embed.addField('From ', message.guild.name)
                        
                            channel.send({ embeds: [embed] })
                        }
                    })
                })
            })
        });
    })
}
