const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const mongoose = require('mongoose');
const misc = require('./functions/misc.js')
const botUser = require('./modules/userdataHandler')
const games = require('./data/games.json')
const XpBooser = require('./inventory/items/XpMultiplicator.js')

mongoose.connect(config.dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) throw err;
    console.log('successfully connected to database');
});

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', async () => {
    //misc.getGuildCommands(config.applicationID, config.mainGuildID)
    //misc.enableCommandOwnerOnly(config.applicationID, config.mainGuildID, "845024145884577793")
    //let cmd = client.commands.get("fun")
    //misc.createGuildCommand(config.applicationID, config.mainGuildID, {name: cmd.name, description: cmd.description, options: cmd.options})
    console.log('Bot Online!');

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const commandName = interaction.data.name.toLowerCase();
        const args = interaction.data.options;
        const author = interaction.member.user
        const channel = await client.channels.fetch(interaction.channel_id)

        let authorData = await botUser.load(client, author.id)
        
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        try {
            command.execute({"client": client, "author": {"info": author, "data": authorData}, "channel": channel, "args": args, "interaction": interaction});
        } catch (error) {
            console.error(error);
            channel.send("Beim Ausführen des Befehls ist ein Fehler aufgetreten.");
        }
    });

    client.user.setActivity(games[Math.floor(Math.random() * games.length)], {
        type: 'PLAYING'
    })

    setInterval (function () {
		client.user.setActivity(games[Math.floor(Math.random() * games.length)], {
            type: 'PLAYING'
        })
   }, 300000);
});

client.on('message', async (message) => {
    if (message.author.bot){
        return
    }

    let authorData = await botUser.load(client, message.author.id)
    let saving = await authorData.levelData.gainXP(message.channel.id)
    if(saving){
        if (authorData.levelData.roleReward !== "/"){
            let role = message.member.guild.roles.cache.find(role => role.id === authorData.levelData.roleReward);
            message.member.roles.add(role)
            authorData.levelData.roleReward = "/"
        }
        if (authorData.levelData.boosterReward !== "/"){
            let booster = new XpBooser(1, authorData.levelData.boosterReward)
            authorData.inventory.addItem(booster, 1)
            authorData.levelData.boosterReward = "/"

            const rewardEmbed = new Discord.MessageEmbed()
                .setAuthor(message.author.username+"#"+message.author.discriminator, message.author.displayAvatarURL())
                .setTitle("BELOHNUNG VERFÜGBAR")
                .setColor("0x79BF63")
                .setDescription("Weil du Level **`"+authorData.levelData.lvl+"`** erreicht hast, erhältst du folgenden XP-Booster:\n\n**`"+booster.getInfo().invname+"`**\n\nDu kannst deine XP-Booster in #Bot-Befehle mit *`/inventar items`* nachschauen und mit *`/inventar einsetzen`* verwenden.");
            message.channel.send(rewardEmbed)
        }
        await authorData.save().catch(err => console.log(err));
    }
})

client.login(config.token)