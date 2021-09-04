const Discord = require('discord.js')
const config = require('./../config.json')
const misc = require('./../functions/misc.js')

const sub = [
    {
        "name": "giveitem",
        "execute": require('./subcommands/admin_giveitem.js')
    },
    {
        "name": "givecoins",
        "execute": require('./subcommands/admin_givecoins.js')
    },
    {
        "name": "giveaward",
        "execute": require('./subcommands/admin_giveaward.js')
    }
]

module.exports = {
	name: 'admin',
	description: 'Verschiedene Admin-Befehle',
	options: [
        {
            "name": "giveitem",
            "description": "Einem User ein item geben",
            "type": 1,
            "options": [
                {
                    "name": "role",
                    "description": "Rolle",
                    "type": 8,
                    "required": false
                },
                {
                    "name": "user",
                    "description": "User",
                    "type": 6,
                    "required": false
                },
                {
                    "name": "object",
                    "description": "Object",
                    "type": 3,
                    "required": false
                }
            ]
        },
        {
            "name": "giveaward",
            "description": "Einem User ein award geben",
            "type": 1,
            "options": [
                {
                    "name": "role",
                    "description": "Rolle",
                    "type": 8,
                    "required": false
                },
                {
                    "name": "user",
                    "description": "User",
                    "type": 6,
                    "required": false
                },
                {
                    "name": "object",
                    "description": "Object",
                    "type": 3,
                    "required": false
                }
            ]
        },
        {
            "name": "givecoins",
            "description": "Einem User coins geben",
            "type": 1,
            "options": [
                {
                    "name": "amount",
                    "description": "Amount",
                    "type": 4,
                    "required": true
                },
                {
                    "name": "role",
                    "description": "Rolle",
                    "type": 8,
                    "required": false
                },
                {
                    "name": "user",
                    "description": "User",
                    "type": 6,
                    "required": false
                }
            ]
        }
    ],
	async execute(cP) {
        if(cP.author.info.id === config.ownerid){
            let subCommand = sub.find(s => s.name === cP.args[0].name)
            subCommand.execute(cP)
        }else{
            return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Du hast nicht die nötigen Berechtigungen, um diesen Befehl auszuführen.", cP.author, "0xf52411", cP.interaction)
        }
	}
};