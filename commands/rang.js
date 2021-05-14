const misc = require('./../functions/misc.js')
const Discord = require('discord.js')
const botUser = require('./../modules/userdataHandler.js')

const User = require('./../models/user.js')

module.exports = {
	name: 'rang',
	description: 'Um nachzuschauen wo jemand auf der Levelrangliste steht',
	options: [{
		"name": "user",
		"description": "Wenn du den Rang eines anderen Users nachschauen möchtest",
		"type": 6,
		"required": false
	}],
	async execute(cP) {
        let target;
		let data;
		if (cP.args === undefined){
			target = await cP.client.users.fetch(cP.author.info.id)
			data = cP.author.data
		}else{
			target = await cP.client.users.fetch(cP.args[0].value)
			data = await botUser.load(cP.client, target.id)
		}

		let ranking = await User.find({}).sort({'levelData.xpGes': 'desc'})
        let rankObject = ranking.find(r => r.userid === data.userid)
        let rankIndex = ranking.indexOf(rankObject)

        let nearString = "";

        let overI = rankIndex-1
        if(rankIndex === 0){
            nearString += "**[Drüber]**\n**`NIEMAND`**\n\n"
        }else{
            nearString += "**[Drüber]**\n**`"+ranking[overI].userData.username+"#"+ranking[overI].userData.discriminator+" Lvl "+ranking[overI].levelData.lvl+" ("+((ranking[overI].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[overI].levelData.lvl))*100).toFixed(2)+"%)`**\n**`"+(ranking[overI].levelData.xpGes - rankObject.levelData.xpGes)+"XP mehr`**\n\n"
        }

        let underI = rankIndex+1
        if(rankIndex === ranking.length - 1){
            nearString += "**[Drunter]**\n**`NIEMAND`**"
        }else{
            nearString += "**[Drunter]**\n**`"+ranking[underI].userData.username+"#"+ranking[underI].userData.discriminator+" Lvl "+ranking[underI].levelData.lvl+" ("+((ranking[underI].levelData.xp/misc.calcRequiredXpTillLvlup(ranking[underI].levelData.lvl))*100).toFixed(2)+"%)`**\n**`"+(rankObject.levelData.xpGes - ranking[underI].levelData.xpGes)+"XP weniger`**"
        }

        const levelembedd = new Discord.MessageEmbed()
			.setThumbnail(target.avatarURL())
			.setTitle(target.username+"#"+target.discriminator+"'s Ranginfo")
			.setColor("0xffbb4b")
			.addFields(
				{name: "RANG", value: "**`#"+(rankIndex+1)+"`**"},
                {name: "NAHE USER", value: nearString}
			);
		misc.sendInteraction(cP.client, {"content": "","embeds": [levelembedd]}, cP.interaction)
	}
};