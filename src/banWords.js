db = require('../database');
data = require('./banWords.json');
require('dotenv').config();

module.exports = (message) => {
    data.forEach(banWord => {
        if(message.content.toLowerCase().includes(banWord)) {
            message.delete();
            message.member.send(`Attention ${message.author.username} tu as dit ${banWord} c'est pas bien`)
        }
    });
}
