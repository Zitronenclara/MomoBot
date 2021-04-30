const Discord = require('discord.js')
const misc = require('./../../functions/misc.js')

module.exports = async function(cP){
    let text = cP.args[0].options[0].value
    if (text.length >= 2048){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Der Text muss kürzer als 2048 Zeichen lang sein!", cP.author, "0xf52411", cP.interaction)
    }

    let result = "";
    for(i = 0; i < text.length; i++){
        if (i % 2 == 0){
            result += text.charAt(i).toUpperCase()
        }else{
            result += text.charAt(i).toLowerCase()
        }
    }

    const mockEmbed = new Discord.MessageEmbed()
            .setAuthor("MOCK MOCK", "https://cdn.discordapp.com/emojis/833303045860360222.png")
            .setColor("0xded94e")
            .setDescription(result);
    await misc.sendInteraction(cP.client, {"content": "","embeds": [mockEmbed]}, cP.interaction)
}