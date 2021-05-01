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
    permission: 0,
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
            const infoEmbed = new Discord.MessageEmbed()
                .setTitle("GIF-BEFEHLE")
                .setColor("0xa1f77c")
                .addFields(
                    {name: "/fun aktion", value: "`baka; bite; bonk; highfive; hug; kill; kiss; lick; love; marry; massage; pat; poke; punch; slap; throw; tickle; wave; yaoihug; yaoikiss; yurihug; yurikiss`"}, 
                    {name: "/fun emotion", value: "`angry; awkward; blush; bored; cry; dance; facepalm; laugh; no; nom; nosebleed; pout; run; shrug; sip; sleep; smile; smug; stare; yawn; yes`"}
                );
            misc.sendInteraction(cP.client, {"content": "","embeds": [infoEmbed]}, cP.interaction)
        }
    }
};