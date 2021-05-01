const Discord = require('discord.js')
const misc = require('./../../functions/misc.js')
const botUser = require('./../../modules/userdataHandler.js')
const gifData = require('./../../data/gifData.json')

module.exports = async function(cP){
    let args = cP.args[0].options
    let hasText = args.length === 3

    if (args[1].value === cP.author.info.id){
        return await misc.generateEmbed(cP.client, "😴 Gääääääähn... 😴", "Laaaaaaaaangweilig... Imagine sich selbst als User angeben...", cP.author, "0x02245c", cP.interaction)
    }
    if (hasText && args[2].value.length > 2048){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Der Text muss kürzer als 2048 Zeichen lang sein!", cP.author, "0xf52411", cP.interaction)
    }

    let gif = await misc.getGif(args[0].value)
    if (gif === null){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Ein unerwarteter Fehler ist aufgetreten, versuche es später erneut.", cP.author, "0xf52411", cP.interaction)
    }

    let image = "https://images.stefftek.de/"+gif.url
    let target = await botUser.load(cP.client, args[1].value)
    let info = gifData.find(g => g.name === gif.category)
    
    let desc;
    if (hasText){
        desc = args[2].value
    }else{
        desc = info.text.replace("{user}", "**`"+cP.author.data.userData.username+"`**").replace("{target}", "**`"+target.userData.username+"`**")
    }

    const aktionEmbed = new Discord.MessageEmbed()
            .setAuthor(cP.author.data.userData.username+"#"+cP.author.data.userData.discriminator, cP.author.data.userData.avatar)
            .setTitle(info.title)
            .setDescription(desc)
            .setColor("0x"+info.color)
            .setImage(image);
    await misc.sendInteraction(cP.client, {"content": "","embeds": [aktionEmbed]}, cP.interaction)
}