const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

const sub = [
    {
        "name": "giveitem",
        "execute": require('./subcommands/admin_giveitem.js')
    },
    {
        "name": "givecoins",
        "execute": require('./subcommands/admin_givecoins.js')
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
		let subCommand = sub.find(s => s.name === cP.args[0].name)
        subCommand.execute(cP)
	}
};