const misc = require('./../functions/misc.js')
const sub = [
    {
        "name": "mock",
        "execute": require('./subcommands/fun_mock.js')
    },
    {
        "name": "ship",
        "execute": require('./subcommands/fun_ship.js')
    }
]

module.exports = {
    name: 'fun',
    description: 'Diverse Befehle die einfach nur ein paar Gimicks sind',
    options: [
        {
            "name": "mock",
            "description": "IrGeNdEiNeN tExT sO mAcHeN wIe DeR hIeR",
            "type": 1,
            "options": [{
                "name": "text",
                "description": "Der Text, den du Umwandeln willst",
                "type": 3,
                "required": true
            }]
        },
        {
            "name": "ship",
            "description": "Verkuppel dich oder andere mit irgendeiner anderen Person uwu",
            "type": 1,
            "options": [{
                    "name": "User_1",
                    "description": "Den User, den du verkuppeln möchtest",
                    "type": 6,
                    "required": true
                },
                {
                    "name": "User_2",
                    "description": "Den User, den du mit User 1 verkuppeln möchtest (weglassen, wenn du ich selbst verkuppeln willst)",
                    "type": 6,
                    "required": false
                }
            ]
        }
    ],
    permission: 0,
    async execute(cP) {
        let subCommand = sub.find(s => s.name === cP.args[0].name)
        subCommand.execute(cP)
    }
};