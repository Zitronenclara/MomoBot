const misc = require('./../functions/misc.js')
const Discord = require('discord.js')
let shopItems = require('./../inventory/shop/shopItems.js')
shopItems = Object.entries(shopItems).map(e => e[1])

module.exports = {
	name: 'kaufen',
	description: 'Um eine Liste von verschiedenen, für MomoCoins kaufbare, items zu erhalten.',
	options: [
        {
            "name": "id",
            "description": "Die ID des items, welches du kaufen möchtest (kann mit /shop nachgesehen werden)",
            "type": 3,
            "required": true
        },
        {
            "name": "anzahl",
            "description": "Wie oft du dieses Item kaufen möchtest",
            "type": 4,
            "required": false
        }
    ],
	async execute(cP) {
        let args = cP.args
		let id = args?.find(t => t.name === "id")?.value
        let count = args?.find(t => t.name === "anzahl")?.value
        let name = id.replace(/[0-9]/g, '').toUpperCase();
        let index = parseInt(id.replace(/\D/g,''));

        if (!count){
            count = 1
        }

        let category = shopItems.find(s => s.id === name)
        if (!category || (index + 1) > category?.items.length){
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Item nicht gefunden. Bitte überprüfe die ID mit `/shop` erneut!", cP.author, "0xf52411", cP.interaction)
        }

        let item = category.items[index].item
        let price = category.items[index].price
        let buy = await cP.author.data.economyData.remove(price*count)
        if (buy){
            cP.author.data.inventory.addItem(item, count)
            cP.author.data.save().catch(err => console.log(err));
            return await misc.generateEmbed(cP.client, "💰 Kauf Abgeschlossen 💰", "Du hast das Item **`"+item.getInfo().invname+"`** `"+count+"x` erworben.\nDir wurden **"+(price*count)+" MomoCoins** abgebucht.", cP.author, "0xedf246", cP.interaction)
        }else{
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Du hast **"+((price*count)-cP.author.data.economyData.coins)+" MomoCoins** zu wenig!\nDeine aktuelle Anzahl an Coins kannst du `/momocoins` nachschauen.", cP.author, "0xf52411", cP.interaction)
        }
	}
};