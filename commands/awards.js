const misc = require('./../functions/misc.js')
const Discord = require('discord.js')
const botUser = require('./../modules/userdataHandler.js')
const timeSpan = require('./../modules/timeSpan.js')

module.exports = {
	name: 'awards',
	description: 'Um deine Awards oder die eines anderen Users nachzuschauen',
	options: [
        {
		    "name": "seite",
		    "description": "Die Seite der Award-Liste",
		    "type": 4,
		    "required": false
	    },
        {
		    "name": "user",
		    "description": "Wenn du die Awards eines anderen Users nachschauen möchtest.",
		    "type": 6,
		    "required": false
	    }
    ],
	async execute(cP) {
        let targetArg = cP.args?.find(t => t.name === "user")?.value
        let pageArg = cP.args?.find(t => t.name === "seite")?.value
		
        let target;
        if (!targetArg){
            target = cP.author.data
        }else{
            target = await botUser.load(cP.client, cP.args[0].value)
        }

        let page;
        if (!pageArg || pageArg < 1){
            page = 1
        }else{
            page = pageArg
        }

        if (target.awards.length !== 0){
            target.awards.sort(compareStamps)
            let awards = [""]
            let adding;
            let time;
            let index = 0
            for (i = 0; i < target.awards.length; i++){
                time = + new Date() - target.awards[i].stamp
                if (target.awards[i].rank === 0){
                    adding = "**`Teilnahme | "+target.awards[i].name+"`**\n➦`vor "+new timeSpan(time).getBeautifiedTime()+"`\n\n"
                }else{
                    adding = "**`"+target.awards[i].rank+". Platz | "+target.awards[i].name+"`**\n➦`vor "+new timeSpan(time).getBeautifiedTime()+"`\n\n"
                }
                if ((awards[index]+adding).length > 2048){
                    index += 1
                }
                awards[index] += adding
            }

            let pages = awards.length
            if (page > pages){
                page = 1
            }
            let displayAwards = awards[page - 1]

            const awardsEmbed = new Discord.MessageEmbed()
                .setAuthor(target.userData.username+"#"+target.userData.discriminator, target.userData.avatar)
                .setColor("0xC2ED77")
                .setTitle("AWARDS | Seite ("+page+"/"+pages+")")
                .setDescription(displayAwards);
            misc.sendInteraction(cP.client, {"content": "","embeds": [awardsEmbed]}, cP.interaction)
        }else{
            const awardsEmbed = new Discord.MessageEmbed()
                .setAuthor(target.userData.username+"#"+target.userData.discriminator, target.userData.avatar)
                .setColor("0xC2ED77")
                .setTitle("AWARDS")
                .setDescription("`Noch keine Awards vorhanden. Awards erhält man für die Teilnahme an Events.`");
            misc.sendInteraction(cP.client, {"content": "","embeds": [awardsEmbed]}, cP.interaction)
        }
	}
};

function compareStamps (a, b){
    if (a.stamp > b.stamp){
        return -1;
    }
    if (a.stamp < b.stamp){
        return 1;
    }
    return 0;
}