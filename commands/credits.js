const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

module.exports = {
    name: 'credits',
    description: 'Zeigt dir mehr Informationn über den Bot und die Menschen dahinter uwu',
    options: [],
    permission: 0,
    async execute(cP) {
        const creditsEmbed = new Discord.MessageEmbed()
            .setTitle("CREDITS")
            .setColor("0xFF50FF")
            .setDescription("[**MomoBot auf GitHub**](https://github.com/Zitronenclara/MomoBot)")
            .addFields(
                {name: "Erstellt von:", value: "**`Clara#6666`**\n[Discord Server](https://discord.gg/xpt2vCf)\n[Twitter](https://twitter.com/claras_universe)\n[GitHub](https://github.com/Zitronenclara)"},
                {name: "Gif-API von:", value: "**`SteffTek#3664`**\n[Discord Server](https://discord.gg/hYVdWNuJfe)\n[Twitch](https://www.twitch.tv/stefftek)\n[GitHub](https://github.com/SteffTek)"}
            );
        misc.sendInteraction(cP.client, {"content": "","embeds": [creditsEmbed]}, cP.interaction)
    }
};