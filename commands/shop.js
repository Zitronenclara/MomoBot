const misc = require('./../functions/misc.js')
const Discord = require('discord.js')
const shopItems = require('./../inventory/shop/shopItems.js')

module.exports = {
	name: 'shop',
	description: 'Um eine Liste von verschiedenen, für MomoCoins kaufbare, items zu erhalten.',
	options: [
        {
            "name": "kategorie",
            "description": "die kategorie von kaufbaren Items",
            "type": 3,
            "required": true,
            "choices": [
                {"name": "XP-Multiplikatoren", "value": "xpboosters"}
            ]
        }
    ],
	async execute(cP) {
		let category = shopItems[cP?.args[0]?.value]
        if (!category){
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Ein unerwarteter Fehler ist aufgetreten!", cP.author, "0xf52411", cP.interaction)
        }

        let shopString = "`[ID]` | (**Preis**) **`Item Name`**\n\n";
        for (i = 0; i < category.items.length; i++){
            shopString += "`["+(category.id+i)+"]` | (**"+category.items[i].price+"**) **`"+category.items[i].item.getInfo().invname+"`**\n"
        }

        const shopEmbed = new Discord.MessageEmbed()
            .setTitle(category.name)
            .setColor(category.color)
            .setFooter("Items kannst du mit folgendem Befehl kaufen:\n/kaufen ID")
            .setDescription(shopString);
        misc.sendInteraction(cP.client, {"content": "","embeds": [shopEmbed]}, cP.interaction)
	}
};