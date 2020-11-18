const nhentai = require('nhentai-js');
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "popular",
    description: "Shows day's most popular doujins.",
    run: async(client, message, args) => {

        let homepage = await nhentai.getHomepage();

        const embed = new MessageEmbed()
        .setTitle('<:flame2:761310324946370620> Popular Now <:flame2:761310324946370620>')

        const result1 = new MessageEmbed()
        .setTitle(`${homepage.results[0].title}`)
        .setURL(`https://www.nhentai.net/g/${homepage.results[0].bookId}`)
        .setThumbnail(`${homepage.results[0].thumbnail}`)
        message.channel.send(embed)
        message.channel.send(result1)
    }
}