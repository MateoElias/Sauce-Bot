const nhentai = require('nhentai-js');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "doujin",
    description: "Shows the info of a doujin",
    run: async(client, message, args) => {

        //DOUJIN ID & ID LENGHT
        const id = message.content.split(" ").slice(1).join(" ");
        const length = id.toString().length;

        //CONDITIONS
        if(!message.channel.nsfw && message.guild) return message.channel.send("NSFW is not enabled in this channel"); //CHECKS IF THE CHANNEL IS NSFW
        if(!id) return message.channel.send("Please input an ID"); //CHECKS IF THERE IS AN ID
        if(isNaN(id)) return message.channel.send("Please input a numeric ID."); // CHECKS IF THE ID IS NUMERIC
        if(length > 6) return message.channel.send("The Doujin's ID must not be greater than 6 digits."); //CHECKS IF THE ID IS EQUAL OR LESSER TO 6 DIGITS
        if(!await nhentai.exists(id)) return message.channel.send("That Doujin does not exist."); //CHECKS IF THE DOUJIN EXISTS

        //GATHERS DOUJIN
        var doujin = await nhentai.getDoujin(id)
        const embed = new MessageEmbed()
        .setColor('EC2854')
        .setTitle(doujin.title)
        .setURL(doujin.link)
        .setImage(doujin.pages[0])
        if(doujin.details.tags) {embed.addField("Tags:", `\`${doujin.details.tags.join("` `")}\``)}
        embed.addField("Pages:", `**\`${doujin.details.pages}\`**`, true)
        embed.addField("Uploaded:", `${doujin.details.uploaded}`, true)
        embed.addField("Languages:", `- ${doujin.details.languages.join("\n- ")}`, true)
        if(doujin.details.artists)      {embed.addField("Artists:", `__- ${doujin.details.artists.join("\n - ")}__`, true)}
        if(doujin.details.parodies)     {embed.addField("Parodies", `${doujin.details.parodies}`, true)}

        //SENDS DOUJIN    
        message.channel.send(embed)
        }
    }