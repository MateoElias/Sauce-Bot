const {
    MessageEmbed
} = require('discord.js');
const nhentai = require('nhentai-js');
module.exports = {
    name: "random",
    description: "Generates a random doujin",
    run: async (client, message, args) => {
        var id;

        do {
            id = Math.floor(Math.random() * 999999).toString();
        } while (!await nhentai.exists(id))

        if (!message.channel.nsfw && message.guild) return message.channel.send("NSFW is not enabled in this channel"); //CHECKS IF THE CHANNEL IS NSFW

        //SENDS DOUJIN
        const generating = new MessageEmbed()
            .setColor('EC2854')
            .setTitle("Generating doujin ID . . . ")
            .setFooter("This may take a while")

        var doujin = await nhentai.getDoujin(id)
        const embed = new MessageEmbed()
        .setColor('EC2854')
        .setTitle(doujin.title)
        .setURL(doujin.link)
        .setImage(doujin.thumbnails[0])
        .addField("Tags:", `\`${doujin.details.tags.join("` `")}\``)
        .addField("Pages:", `**\`${doujin.details.pages}\`**`, true)
        .addField("Uploaded:", `${doujin.details.uploaded}`, true)
        .addField("Languages:", `- ${doujin.details.languages.join("\n- ")}`, true)
        if(doujin.details.artists)      {embed.addField("Artists:", `__- ${doujin.details.artists.join("\n - ")}__`, true)}
        if(doujin.details.parodies)     {embed.addField("Parodies", `${doujin.details.parodies}`, true)}

        const sending = await message.channel.send(generating)
        sending.edit(embed)
    }
}