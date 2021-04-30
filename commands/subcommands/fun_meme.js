const Discord = require('discord.js')
const misc = require('./../../functions/misc.js')
const memeData = require('./../../data/memes.json')

module.exports = async function(cP){
    let sub;
    if (cP.args[0].options === undefined){
        sub = memeData.subs[Math.floor(Math.random()*memeData.subs.length)]
    }else{
        sub = cP.args[0].options[0].value
    }

    if (memeData.blacklist.includes(sub)){
        sub = memeData.subs[Math.floor(Math.random()*memeData.subs.length)]
    }

    let meme = await misc.getMeme(sub)
    if (meme === null){
        return await misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Subreddit konnte nicht gefunden werden.", cP.author, "0xf52411", cP.interaction)
    }
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