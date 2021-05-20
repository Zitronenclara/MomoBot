const misc = require('./../functions/misc.js')
const Discord = require('discord.js')
const infos = require('./../data/infos.json')

module.exports = {
	name: 'info',
	description: 'Gibt dir mehr Informationen über bestimmte Bot-Mechaniken',
	options: [{
        "name": "thema",
        "description": "Das Thema, worüber du mehr wissen möchtest",
        "type": 3,
        "required": true,
        "choices": [
            {"name": "Währung", "value": "waehrung"},
            {"name": "Levelsystem", "value": "levelsystem"},
            {"name": "XP-Booster", "value": "xpbooster"}
        ]}
    ],
	async execute(cP) {
		let info = infos.find(i => i.name === cP.args[0].value)
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle(info.title)
            .setColor(info.color)
            .addFields(info.fields);
        misc.sendInteraction(cP.client, {"content": "","embeds": [infoEmbed]}, cP.interaction)
	}
};