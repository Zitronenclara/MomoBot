const Discord = require('discord.js')
const misc = require('./../functions/misc.js')
const changelogs = require('./../data/changelogs.json')

module.exports = {
	name: 'changelog',
	description: 'Um mehr über die Änderungen in Bot-Updates zu erfahren.',
	options: [
		{
            "name": "version",
            "description": "Über welche Version du mehr erfahren möchtest",
            "type": 3,
            "required": true,
            "choices": [
                {"name": "v1.1", "value": "1.1"},
                {"name": "v1.2", "value": "1.2"},
                {"name": "v1.3", "value": "1.3"}
            ]
        }
	],
	async execute(cP) {
		let v = cP.args[0].value
        let entry = changelogs.find(c => c.name === v)

        let changes = "";
        for(i = 0; i < entry.changes.length; i++){
            changes+="❥ "+entry.changes[i]+"\n"
        }

        const clEmbed = new Discord.MessageEmbed()
            .setAuthor("Version "+entry.name+" | "+entry.date)
            .setColor("0xb0f542")
            .setDescription(changes);
        misc.sendInteraction(cP.client, {"content": "","embeds": [clEmbed]}, cP.interaction)
	}
};