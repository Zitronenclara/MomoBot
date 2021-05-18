const Discord = require('discord.js')
const misc = require('./../functions/misc.js')
const botUser = require('./../modules/userdataHandler.js')
const timeSpan = require('./../modules/timeSpan.js')

module.exports = {
	name: 'level',
	description: 'Zeigt dir dein Level oder optional das Level eines anderen Users an.',
	options: [
		{
		"name": "user",
		"description": "Wenn du das Level eines anderen Users nachschauen möchtest.",
		"type": 6,
		"required": false
	}
	],
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

		let reqXP = data.levelData.calcRequiredXP()
		let xp = data.levelData.xp
		let percent = ((xp/reqXP)*100).toFixed(2)

		let boosterText;
		data.levelData.checkIfMultExpired()
		if (data.levelData.multActive){
			let stamp = + new Date()
			let remaining = data.levelData.multStamp - stamp
			let time = new timeSpan(remaining).getSuitableTime()
			let timeString = time.amount_fixed+time.unit_shortest
			boosterText = "**`"+data.levelData.factor+"-fache XP für "+timeString+"`**"
		}else{
			boosterText = "**`Kein XP-Booster Aktiv`**"
		}

		const levelembedd = new Discord.MessageEmbed()
			.setThumbnail(target.avatarURL())
			.setTitle(target.username+"#"+target.discriminator+"'s Levelinfo")
			.setColor("0xffbb4b")
			.addFields(
				{name: "LEVEL", value: "**`"+data.levelData.lvl+"`**"},
				{name: "ERFAHRUNG", value: "**`"+xp+"/"+reqXP+"XP`** Gesamt: **`"+data.levelData.xpGes+"XP`**"},
				{name: "FORTSCHRITT `("+percent+"%)`", value: data.levelData.generateProgressBar()},
				{name: "XP-BOOST", value: boosterText}
			);
		misc.sendInteraction(cP.client, {"content": "","embeds": [levelembedd]}, cP.interaction)
	}
};