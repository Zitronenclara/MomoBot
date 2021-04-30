const Discord = require('discord.js')
const misc = require('./../../functions/misc.js')
const memeData = require('./../../data/memes.json')

module.exports = async function(cP){
    let sub;
    if (cP.args[0].options === undefined){
        sub = memeData[Math.floor(Math.random()*memeData.length)]
    }else{
        sub = cP.args[0].options[0].value
    }

    let meme = await misc.getMeme(sub)
    if (meme.url.length === 0 || meme.nsfw || meme.spoiler){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Meme kann nicht angezeigt werden.", cP.author, "0xf52411", cP.interaction)
    }

    const memeEmbed = new Discord.MessageEmbed()
            .setAuthor("u/"+meme.author+" in r/"+meme.subreddit)
            .setColor("0xff7b00")
            .setTitle(meme.title)
            .setDescription("[Link zum Post]("+meme.postLink+")")
            .setImage(meme.url);
    await misc.sendInteraction(cP.client, {"content": "","embeds": [memeEmbed]}, cP.interaction)
}