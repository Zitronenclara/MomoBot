const misc = require('./../functions/misc.js')
const Discord = require('discord.js')

module.exports = {
	name: 'daily',
	description: 'Hiermit kannst du deine täglichen MomoCoins abholen!',
	options: [],
	async execute(cP) {
		let daily = await cP.author.data.economyData.doDaily(cP.author.data.levelData)

		let dailyGain = cP.author.data.economyData.calcDailyGain(cP.author.data.levelData)
		let dailyStreak = cP.author.data.economyData.dailyStreak
		let maxStreak = cP.author.data.economyData.maxStreak
		if (!daily.success){
			return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", daily.message+"\n\n`Tägliche Belohnung:` **`"+dailyGain+" MomoCoins`**\n`aktuelle Daily-Streak:` **`"+dailyStreak+" (+"+(dailyStreak*2.5)+"% tägliche MomoCoins)`**\n`maximale Daily-Streak:` **`"+maxStreak+"`**", cP.author, "0xf52411", cP.interaction)
		}else{
			await cP.author.data.save().catch(err => console.log(err));
			return await misc.generateEmbed(cP.client, "✅ Tägliche MomoCoins abgeholt ✅", "Du hast **`"+daily.amount+" MomoCoins`** erhalten c:"+"\n\n`Tägliche Belohnung:` **`"+dailyGain+" MomoCoins`**\n`aktuelle Daily-Streak:` **`"+dailyStreak+" (+"+(dailyStreak*2.5)+"% tägliche MomoCoins)`**\n`maximale Daily-Streak:` **`"+maxStreak+"`**", cP.author, "0xe1ff00", cP.interaction)
		}
	}
};