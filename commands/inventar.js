const Discord = require('discord.js')
const misc = require('./../functions/misc.js')

const sub = [{
    "name": "items",
    "execute": require('./subcommands/inventar_items.js')
}]

module.exports = {
    name: 'inventar',
    description: 'Verschiedene Befehle zur Verwaltung deines Inventars',
    options: [
        {
            "name": "einsetzen",
            "description": "Wenn du ein Item deines Inventars einsetzen möchtest",
            "type": 1,
            "options": [
                {
                    "name": "id",
                    "description": "Die ID des Items, kann mit /inventar items abgerufen werden",
                    "type": 4,
                    "required": true
                }
            ]
        },
        {
            "name": "items",
            "description": "Zeigt dir alle Items die du aktuell in deinem Inventar hast",
            "type": 1,
            "options": [
                {
                    "name": "seite",
                    "description": "Die Seite des Inventars, die du abrufen möchtest, beginnt bei 1",
                    "type": 4,
                    "required": false
                },
                {
                    "name": "user",
                    "description": "Wenn du das Inventar eines anderen Users ansteuern willst",
                    "type": 6,
                    "required": false
                }
            ]
        },
        {
            "name": "iteminfo",
            "description": "Wenn du mehr Infos über ein bestimmtes Item in deinem Inventar erhalten möchtest",
            "type": 1,
            "options": [
                {
                    "name": "id",
                    "description": "Die ID des Items, kann mit /inventar items abgerufen werden",
                    "type": 4,
                    "required": true
                }
            ]
        },
    ],
    async execute(cP) {
        let subCommand = sub.find(s => s.name === cP.args[0].name)
        subCommand.execute(cP)
    }
};