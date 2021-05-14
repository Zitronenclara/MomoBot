const Discord = require('discord.js')
const misc = require('./../functions/misc.js')
const config = require('./../config.json')
const timeSpan = require('./../modules/timeSpan.js');

module.exports = {
	name: 'userinfo',
	description: 'Zeigt dir mehr Informationen über einen User',
	options: [
		{
		"name": "user",
		"description": "Über welchen User du mehr erfahren möchtest",
		"type": 6,
		"required": true
	}
	],
	async execute(cP) {
		let targetU = await cP.client.users.fetch(cP.args[0].value);
        let targetGuild = await cP.client.guilds.fetch(config.mainGuildID)
        let targetM = await targetGuild.members.fetch(targetU.id)

		let timeNow = + new Date()
		let serverTime = new timeSpan(timeNow - targetM.joinedTimestamp).getBeautifiedTime()
		let serverDate = new Date(targetM.joinedAt).toLocaleDateString()
		let discordTime = new timeSpan(timeNow - targetU.createdTimestamp).getBeautifiedTime()
		let discordDate = new Date(targetU.createdTimestamp).toLocaleDateString()

		const infoembed = new Discord.MessageEmbed()
			.setThumbnail(targetU.displayAvatarURL())
			.setColor(targetM.displayHexColor)
			.addFields(
				{name: "Name", value: "`"+targetU.username+" # "+targetU.discriminator+"`"},
				{name: "Anzeigename", value: "`"+targetM.displayName+"`"},
				{name: "Id", value: "`"+targetU.id+"`"},
				{name: "Zeit auf Discord", value: "`seit "+discordDate+"`\n`"+discordTime+"`"},
				{name: "Zeit auf dem Server", value: "`seit "+serverDate+"`\n`"+serverTime+"`"}
			);
		misc.sendInteraction(cP.client, {"content": "","embeds": [infoembed]}, cP.interaction)
	}
};