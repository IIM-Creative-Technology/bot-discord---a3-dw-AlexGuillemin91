const Discord = require('discord.js');
require('dotenv').config();

module.exports.addRoleToNewMember = async (member) => {
    member.guild.roles.fetch().then((roles) => {
        roleFound = null
        roles.forEach(role => {
          if (role.name == `A-NEW-MEMBER`) {
            roleFound = role
          }
        });

        if (roleFound) {
          member.roles.add(roleFound).catch((err) => { })
        } else {
          member.guild.roles.create({
            name: `A-NEW-MEMBER`,
            color: 'FUSCHIA'
          }).then((newRole) => {
            member.roles.add(newRole)
          })
        }
      })
}