const Discord = require('discord.js');
require('dotenv').config();
const db = require('../database')

module.exports = async (message) => {
    db.executeQuery(`SELECT * FROM xp WHERE user_id=${message.author.id} AND server_id=${message.guild.id}`).then(res => {
        if (res.length == 0) {
            db.executeQuery(`INSERT INTO xp (user_id, xp_count, xp_level, server_id) VALUES (${message.author.id}, 1, 0, ${message.guild.id})`);
        }
        else {
            db.executeQuery(`UPDATE xp SET xp_count = xp_count + 1 WHERE user_id=${message.author.id} AND server_id=${message.guild.id}`);
            if (res[0].xp_count >= res[0].xp_level + 4) {
                db.executeQuery(`UPDATE xp SET xp_count = 0, xp_level = xp_level + 1 WHERE user_id=${message.author.id} AND server_id=${message.guild.id}`);
                db.executeQuery(`SELECT xp_level FROM xp WHERE user_id=${message.author.id} AND server_id=${message.guild.id}`).then(lvl => {
                    const level = lvl[0]['xp_level'];
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(message.author.username)
                    embed.setDescription(`Félicitation, vous êtes passé niveau ${level}`)
                
                    message.channel.send({ embeds: [embed] })
                })

                message.guild.roles.fetch().then((roles) => {
                    roleFound = null
                    roles.forEach(role => {
                        if (role.name == `A-LVL-${res[0].xp_level + 1}`) {
                            roleFound = role
                        }
                    });

                    if (roleFound) {
                        message.member.roles.add(roleFound).catch((err) => { })
                    } else {
                        message.guild.roles.create({
                            name: `A-LVL-${res[0].xp_level + 1}`,
                            color: 'FUSCHIA',
                        }).then((newRole) => {
                            message.member.roles.add(newRole)
                        })
                    }
                })
            }
        }
    })
}
