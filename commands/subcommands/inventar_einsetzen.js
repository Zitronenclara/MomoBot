const botUser = require('./../../modules/userdataHandler.js')
const items = require('./../../inventory/items/items.js')
const misc = require('./../../functions/misc.js')
const Discord = require('discord.js')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let idArg = args?.find(t => t.name === "id")?.value

    if (args === undefined){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Du musst eine ID spezifizieren. Benutze `/inventar items`, um die ID's deiner Items nachzuschauen.", cP.author, "0xf52411", cP.interaction)
    }

    let index = idArg;
    let target = cP.author.data
    if (index + 1 > target.inventory.items.length || index < 0){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Das angegebene Item wurde nicht gefunden. Prüfe die ID erneut mit `/inventar items`.", cP.author, "0xf52411", cP.interaction)
    }

    let itemClass = items[target.inventory.items[index].name]
    let item = itemClass.loadFrom(target.inventory.items[index])
    
    let success = await item.use({targetData: target, client: cP.client})
    if (success.finished){
        success.target.inventory.removeItem(item, 1)
        success.target.save().catch(err => console.log(err));
        return await misc.generateEmbed(cP.client, "✅ Item Aktiviert ✅", success.message, cP.author, "0x9eeb34", cP.interaction)
    }else{
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", success.message, cP.author, "0xf52411", cP.interaction)
    }
}