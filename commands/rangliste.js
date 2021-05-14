const misc = require('./../functions/misc.js')
const Discord = require('discord.js')

const User = require('./../models/user.js')

module.exports = {
	name: 'rangliste',
	description: 'Zeigt dir die serverweite Level-Rangliste',
	options: [],
	async execute(cP) {
		let ranking = await User.find({}).sort({'levelData.xpGes': 'desc'})
        let rankObject = ranking.find(r => r.userid === cP.author.info.id)
        let rankIndex = ranking.indexOf(rankObject)

        let rankString = ""
        for(i = 0; i < 15; i++){
            if(i === rankIndex){
                rankString += "**`#"+(i+1)+">> Lvl "+ranking[i].levelData.lvl+" ("+((ranking[i].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[i].levelData.lvl))*100).toFixed(2)+"%)`➦ DU**\n"
            }else{
                rankString += "`#"+(i+1)+">> Lvl "+ranking[i].levelData.lvl+" ("+((ranking[i].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[i].levelData.lvl))*100).toFixed(2)+"%)`➦ "+ranking[i].userData.username+"#"+ranking[i].userData.discriminator+"\n"
            }
        }

		let lastIndex = ranking.length - 1
		let upSpace = rankIndex
		let downSpace = lastIndex - rankIndex
		let topFifteen = upSpace <= 14

		if (topFifteen === false){
			rankString += "`...`\n"
			let startIndex = rankIndex - 2
			let stopIndex = rankIndex + 2

			if (startIndex < 15){
				startIndex = 15
			}
			if (stopIndex > lastIndex){
				stopIndex = lastIndex
			}

			for(i = startIndex; i <= stopIndex; i++){
				if(i === rankIndex){
					rankString += "**`#"+(i+1)+">> Lvl "+ranking[i].levelData.lvl+" ("+((ranking[i].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[i].levelData.lvl))*100).toFixed(2)+"%)`➦ DU**\n"
				}else{
					rankString += "`#"+(i+1)+">> Lvl "+ranking[i].levelData.lvl+" ("+((ranking[i].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[i].levelData.lvl))*100).toFixed(2)+"%)`➦ "+ranking[i].userData.username+"#"+ranking[i].userData.discriminator+"\n"
				}
			}
		}

        const rankembed = new Discord.MessageEmbed()
			.setTitle("LEVEL RANGLISTE")
			.setColor("0xffbb4b")
			.addFields(
				{name: "PLATZIERUNGEN", value: rankString}
			)
            .setTimestamp();
		misc.sendInteraction(cP.client, {"content": "","embeds": [rankembed]}, cP.interaction)
	}
};