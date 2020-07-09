const Discord = require('discord.js');
module.exports = {
    name: 'ping',
    description: 'shows ping!',
    run: async (client, message, args) => {

        message.channel.send("*\*Ahegao Noises*\*")
        message.delete()
    }
}