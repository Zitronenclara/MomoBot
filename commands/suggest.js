const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

module.exports = {
	name: 'suggest',
	description: 'Wenn du einen Vorschlag einsenden möchstest, Missbrauch wird bestraft!',
	options: [
		{
            "name": "Vorschlag",
            "description": "Dein Vorschlag",
            "type": 3,
            "required": true
        }
	],
	permission: 0,
	async execute(cP) {
        let suggestion = cP.args[0].value
        if (suggestion.length > 2048){
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Dein Vorschlag muss kürzer als 2048 Zeichen lang sein!", cP.author, "0xf52411", cP.interaction)
        }
        await misc.sendLog(cP.client, cP.author.data, "VORSCHLAG", suggestion, "0x5ea340")
        await misc.generateEmbed(cP.client, "✅ Danke ✅", "Danke für deinen Vorschlag! Konstruktive Kritik, Ideen, etc. helfen mir den Bot immer weiter zu verbessern c:", cP.author, "0x5ea340", cP.interaction)
	}
};