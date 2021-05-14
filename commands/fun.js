const misc = require('./../functions/misc.js')
const sub = [
    {
        "name": "aktion",
        "execute": require('./subcommands/fun_aktion.js')
    },
    {
        "name": "emotion",
        "execute": require('./subcommands/fun_emotion.js')
    },
    {
        "name": "mock",
        "execute": require('./subcommands/fun_mock.js')
    },
    {
        "name": "ship",
        "execute": require('./subcommands/fun_ship.js')
    },
    {
        "name": "meme",
        "execute": require('./subcommands/fun_meme.js')
    }
]

module.exports = {
    name: 'fun',
    description: 'Diverse Befehle die einfach nur ein paar Gimicks sind',
    options: [
        {
            "name": "aktion",
            "description": "Um eine Aktion als GIF auszudrücken",
            "type": 1,
            "options": [{
                "name": "art",
                "description": "Die Art der Aktion",
                "type": 3,
                "required": true,
                "choices": [
                    {"name": "baka", "value": "baka"},
                    {"name": "bite", "value": "bite"},
                    {"name": "bonk", "value": "bonk"},
                    {"name": "highfive", "value": "highfive"},
                    {"name": "hug", "value": "hug"},
                    {"name": "kill", "value": "kill"},
                    {"name": "kiss", "value": "kiss"},
                    {"name": "lick", "value": "lick"},
                    {"name": "love", "value": "love"},
                    {"name": "marry", "value": "marry"},
                    {"name": "massage", "value": "massage"},
                    {"name": "pat", "value": "pat"},
                    {"name": "poke", "value": "poke"},
                    {"name": "punch", "value": "punch"},
                    {"name": "slap", "value": "slap"},
                    {"name": "throw", "value": "throw"},
                    {"name": "tickle", "value": "tickle"},
                    {"name": "wave", "value": "wave"},
                    {"name": "yaoihug", "value": "yaoihug"},
                    {"name": "yaoikiss", "value": "yaoikiss"},
                    {"name": "yurihug", "value": "yurihug"},
                    {"name": "yurikiss", "value": "yurikiss"}
                ]
            },
            {
                "name": "User",
                "description": "Der User an den die Aktion gerichtet ist",
                "type": 6,
                "required": true
            },
            {
                "name": "text",
                "description": "Custom Text der mit gesendet werden soll",
                "type": 3,
                "required": false
            }]
        },
        {
            "name": "emotion",
            "description": "Um eine Emotion als GIF auszudrücken",
            "type": 1,
            "options": [{
                "name": "art",
                "description": "Die Art der Emotion",
                "type": 3,
                "required": true,
                "choices": [
                    {"name": "angry", "value": "angry"},
                    {"name": "awkward", "value": "awkward"},
                    {"name": "blush", "value": "blush"},
                    {"name": "bored", "value": "bored"},
                    {"name": "cry", "value": "cry"},
                    {"name": "dance", "value": "dance"},
                    {"name": "facepalm", "value": "facepalm"},
                    {"name": "laugh", "value": "laugh"},
                    {"name": "no", "value": "no"},
                    {"name": "nom", "value": "nom"},
                    {"name": "nosebleed", "value": "nosebleed"},
                    {"name": "pout", "value": "pout"},
                    {"name": "run", "value": "run"},
                    {"name": "shrug", "value": "shrug"},
                    {"name": "sip", "value": "sip"},
                    {"name": "sleep", "value": "sleep"},
                    {"name": "smile", "value": "smile"},
                    {"name": "smug", "value": "smug"},
                    {"name": "stare", "value": "stare"},
                    {"name": "yawn", "value": "yawn"},
                    {"name": "yes", "value": "yes"}
                ]
            },
            {
                "name": "text",
                "description": "Custom Text der mit gesendet werden soll",
                "type": 3,
                "required": false
            }]
        },
        {
            "name": "meme",
            "description": "MEMES",
            "type": 1,
            "options": [{
                "name": "subreddit",
                "description": "Subreddit (random subreddit wenn nicht spezifiziert)",
                "type": 3,
                "required": false
            }]
        },
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
    async execute(cP) {
        let subCommand = sub.find(s => s.name === cP.args[0].name)
        subCommand.execute(cP)
    }
};