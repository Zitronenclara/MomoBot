const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

module.exports = {
    name: 'umfrage',
    description: 'Zum Erstellen von Umfragen mit passenden Reaktionen',
    options: [
        {
            "name": "frage",
            "description": "Die Frage, die du stellen möchtest",
            "type": 3,
            "required": true
        },
        {
            "name": "art",
            "description": "Die Art der Umfrage",
            "required": true,
            "type": 3,
            "choices": [
                {"name": "Ja/Nein ohne Enthaltung", "value": "ohne_enthaltung"},
                {"name": "Ja/Nein mit Enthaltung", "value": "mit_enthaltung"}
            ]
        }
    ],
    async execute(cP) {
        if(cP.args[0].value.length > 2048){
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Die Frage muss kürzer als 2048 Zeichen lang sein!", cP.author, "0xf52411", cP.interaction)
        }

        const pollEmbed = new Discord.MessageEmbed()
            .setAuthor("UMFRAGE")
            .setColor("0x8afff3")
            .setDescription(cP.args[0].value);
        let message = await misc.sendInteraction(cP.client, {"content": "","embeds": [pollEmbed]}, cP.interaction)

        if(cP.args[1].value === "ohne_enthaltung"){
            message.react('👍')
            message.react('👎')
        }else if(cP.args[1].value === "mit_enthaltung"){
            message.react('👍')
            message.react('✋')
            message.react('👎')
        }
    }
};