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
	}
};