const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

const sub = [
    {
        "name": "items",
        "execute": require('./subcommands/inventar_items.js')
    }
]

module.exports = {
    name: 'inventar',
    description: 'Verschiedene Befehle zur Verwaltung deines Inventars',
    options: [
        {
            "name": "items",
            "description": "Zeigt dir alle Items die du aktuell in deinem Inventar hast",
            "type": 1,
            "options": []
        },
        {
            "name": "einsetzen",
            "description": "Wenn du ein Item deines Inventars einsetzen möchtest",
            "type": 1,
            "options": [{
                "name": "ID",
                "description": "Die ID des Items, kann mit /inventar items abgerufen werden",
                "type": 4,
                "required": true
            }]
        }
    ],
    async execute(cP) {
        let subCommand = sub.find(s => s.name === cP.args[0].name)
        subCommand.execute(cP)
    }
};