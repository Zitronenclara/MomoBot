const Discord = require('discord.js')
const misc = require('./../functions/misc.js')
const botUser = require('./../modules/userdataHandler.js')

module.exports = {
	name: 'momocoins',
	description: 'Zeigt dir wieviele MomoCoins du oder ein anderer User haben',
	options: [
		{
		"name": "user",
		"description": "Von welchem User du die MomoCoins erfahren möchtest",
		"type": 6,
		"required": false
	}
	],
	async execute(cP) {
        let target;
        if (!cP.args){
            target = cP.author.data
        }else{
            target = await botUser.load(cP.client, cP.args[0].value)
        }

		const coinsEmbed = new Discord.MessageEmbed()
			.setColor("0xddf542")
            .setAuthor(target.userData.username+"#"+target.userData.discriminator, target.userData.avatar)
            .setDescription("**MOMOCOINS:**\n**`"+target.economyData.coins+"`**")
		misc.sendInteraction(cP.client, {"content": "","embeds": [coinsEmbed]}, cP.interaction)
	}
};