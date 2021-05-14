const Discord = require('discord.js')
const misc = require('./../functions/misc.js')
const gifData = require('./../data/gifData.json')

module.exports = {
    name: 'giflist',
    description: 'Zeigt dir alle verfügbaren Gif-Befehle an',
    options: [{
        "name": "Befehl",
        "description": "Wenn du mehr über den spezifizierten Befehl erfahren willst",
        "type": 3,
        "required": false
    }],
    async execute(cP) {
        let specified = cP.args !== undefined

        let info;
        if (specified) {
            info = gifData.find(g => g.name === cP.args[0].value)
        }
        if (!info) {
            specified = undefined
        }

        if (specified) {
            const gifInfoEmbed = new Discord.MessageEmbed()
                .setAuthor("["+info.name+"]")
                .setTitle(info.title)
                .setColor("0x"+info.color)
                .addFields(
                    {name: "Text", value: "**`"+info.text+"`**"}, 
                    {name: "Beschreibung", value: "*"+info.description+"*"});
            misc.sendInteraction(cP.client, {"content": "","embeds": [gifInfoEmbed]}, cP.interaction)
        } else {
            let categories = await misc.getCategories()
            if(categories === null){
                return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Ein unerwarteter Fehler ist aufgetreten, versuche es später erneut.", cP.author, "0xf52411", cP.interaction)
            }

            let action = "";
            let emote = "";
            let count;
            for (i = 0; i < gifData.length; i++){
                count = categories.find(c => c.category === gifData[i].name).count
                if (gifData[i].category === "action"){
                    action += "**`["+count+"] "+gifData[i].name+"`**\n"
                }else{
                    emote += "**`["+count+"] "+gifData[i].name+"`**\n"
                }
            }

            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("GIF-BEFEHLE")
                .setColor("0xa1f77c")
                .addFields(
                    {name: "/fun aktion", value: action, inline: true}, 
                    {name: "/fun emotion", value: emote, inline: true}
                );
            misc.sendInteraction(cP.client, {"content": "","embeds": [infoEmbed]}, cP.interaction)
        }
    }
};