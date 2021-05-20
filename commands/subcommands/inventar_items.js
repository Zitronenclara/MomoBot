const botUser = require('./../../modules/userdataHandler.js')
const items = require('./../../inventory/items/items.js')
const misc = require('./../../functions/misc.js')
const Discord = require('discord.js')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let targetArg = args?.find(t => t.name === "user")?.value
    let pageArg = args?.find(t => t.name === "seite")?.value

    let target;
    let page;
    if (args === undefined){
        target = cP.author.data
        page = 1
    }else{
        if (!targetArg){
            target = cP.author.data
        }else{
            target = await botUser.load(cP.client, targetArg)
        }

        if (!pageArg){
            page = 1
        }else{
            page = pageArg
        }
    }

    let invItems = target.inventory.items
    let list = [""]
    let index = 0
    let currentAdd;
    let currentClass;
    let currentItem;
    let currentInfo;
    for(i = 0; i < invItems.length; i++){
        currentClass = items[invItems[i].name]
        currentItem = currentClass.loadFrom(invItems[i])
        currentInfo = currentItem.getInfo()
        currentAdd = "`["+i+"]` ❥ ("+currentItem.count+"x) "+currentInfo.icon+" **`["+currentInfo.invname+"]`**\n"

        if ((list[index] + currentAdd).length > 2000){
            list[index].push(currentAdd)
            index++
        }else{
            list[index] += currentAdd
        }
    }

    let pageIndex;
    if (page > list.length || page < 0){
        pageIndex = 0
    }else{
        pageIndex = page - 1
    }

    let displayItems = list[pageIndex]
    const invEmbed = new Discord.MessageEmbed()
        .setAuthor(target.userData.username+"#"+target.userData.discriminator, target.userData.avatar)
        .setTitle("INVENTAR | Seite ("+(pageIndex+1)+"/"+list.length+")")
        .setColor("0xffbb4b")
        .setFooter("Items kann man mit diesem Befehl einsetzen:\n/inventar einsetzen ID");
    if (displayItems.length === 0){
        invEmbed.setDescription("**`Keine Items im Inventar`**")
    }else{
        invEmbed.setDescription("`[ID]` ❥ (Anzahl) **`[Item Name]`**\n\n"+displayItems)
    }
    misc.sendInteraction(cP.client, {"content": "","embeds": [invEmbed]}, cP.interaction)
}