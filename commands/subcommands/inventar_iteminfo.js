const botUser = require('./../../modules/userdataHandler.js')
const items = require('./../../inventory/items/items.js')
const misc = require('./../../functions/misc.js')
const Discord = require('discord.js')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let targetArg = args?.find(t => t.name === "user")?.value
    let idArg = args?.find(t => t.name === "id")?.value

    if (args === undefined || idArg === undefined){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Du musst eine ID spezifizieren. Benutze `/inventar items`, um die ID's deiner Items nachzuschauen.", cP.author, "0xf52411", cP.interaction)
    }

    let index = idArg;
    let target;
    if (targetArg){
        target = await botUser.load(targetArg)
    }else{
        target = cP.author.data
    }
    if (index + 1 > target.inventory.items.length || index < 0){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Das angegebene Item wurde nicht gefunden. Prüfe die ID erneut mit `/inventar items`.", cP.author, "0xf52411", cP.interaction)
    }

    let itemClass = items[target.inventory.items[index].name]
    let item = itemClass.loadFrom(target.inventory.items[index])
    let info = item.getInfo()
    const infoEmbed = new Discord.MessageEmbed()
        .setAuthor(info.name, "https://cdn.discordapp.com/emojis/"+info.icon_id)
        .setColor(info.color)
        .setDescription("*"+info.desc+"*");
    misc.sendInteraction(cP.client, {"content": "","embeds": [infoEmbed]}, cP.interaction)
}