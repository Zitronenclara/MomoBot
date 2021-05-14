const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

module.exports = {
	name: 'avatar',
	description: 'Zeigt dir das Profilbild eines Users in groß',
	options: [
		{
		"name": "user",
		"description": "Welchen User du genauer untersuchen möchtest",
		"type": 6,
		"required": true
	}
	],
	async execute(cP) {
		let targetU = await cP.client.users.fetch(cP.args[0].value);

		const avatarembed = new Discord.MessageEmbed()
			.setColor("0xb9e079")
            .setDescription("Avatar von **`"+targetU.username+"#"+targetU.discriminator+"`**")
            .setImage(targetU.avatarURL({dynamic: true, size: 2048}));
		misc.sendInteraction(cP.client, {"content": "","embeds": [avatarembed]}, cP.interaction)
	}
};