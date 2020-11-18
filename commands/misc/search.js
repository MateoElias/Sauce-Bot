const NanaAPI = require('nana-api');
const nhentai = new NanaAPI;
const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "search",
    description: "Searches shit, what else do you think?",
    run: async(client, message, args) => {
        //DEFINITION OF VARIABLES
        const query = args[0];
        const content = message.content.split(" ").slice(2).join(" ");
        var result;

        var embed = new MessageEmbed()
        .setColor('EC2854')

        //PRE-CONDITIONS
        if(!content) return message.channel.send("Please state what you are looking for.")

        switch(query.toLowerCase()){
            case 'tag':
                result = await nhentai.tag(content.toLowerCase())
                break;
            case 'artist':
                result = await nhentai.artist(content.toLowerCase())
                break;
            case 'character':
                result = await nhentai.character(content.toLowerCase())
                break;
            case 'parodies':
                result = await nhentai.parody(content.toLowerCase())
                break;
            default:
                message.channel.send("Please state what you are looking for. \n I.E `tag / artist / character`")
                break;
        }
        if(result == 'No book founded!') return message.channel.send("No results found.")
        embed.addFields(
            {name: `\`#\`${result.results[0].id}`, value: `[${result.results[0].title}](https://www.nhentai.net/g/${result.results[0].id})`},
            {name: `\`#\`${result.results[1].id}`, value: `[${result.results[1].title}](https://www.nhentai.net/g/${result.results[1].id})`},
            {name: `\`#\`${result.results[2].id}`, value: `[${result.results[2].title}](https://www.nhentai.net/g/${result.results[2].id})`},
            {name: `\`#\`${result.results[3].id}`, value: `[${result.results[3].title}](https://www.nhentai.net/g/${result.results[3].id})`},
            {name: `\`#\`${result.results[4].id}`, value: `[${result.results[4].title}](https://www.nhentai.net/g/${result.results[4].id})`}
        )
        embed.setFooter(`Showing 5 results out of ${result.num_results}`)
        embed.setAuthor(`Searching for character ${content.toLowerCase()}:`, "https://cdn.discordapp.com/attachments/657043167279054898/764912603679293480/nhentai_1.png")
        message.channel.send(embed)
    }
}