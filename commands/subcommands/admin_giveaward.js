const misc = require('./../../functions/misc.js')
const items = require('./../../inventory/items/items.js')
const botUser = require('./../../modules/userdataHandler.js')
const presets = require('./../../data/itemPresets.json')
const config = require('./../../config.json')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let roleArg = args?.find(t => t.name === "role")?.value
    let userArg = args?.find(t => t.name === "user")?.value
    let objectArg = args?.find(t => t.name === "object")?.value

    // insert obj = {name: awardName, rank: awardRank (0 if it has no rank)}
    let obj = JSON.parse(objectArg)

    let userMode = !roleArg && userArg !== undefined
    if (userMode){
        let userData = await botUser.load(cP.client, userArg)
        userData.awards.push({name: obj.name, rank: obj.rank, stamp: + new Date()})
        await userData.save().catch(err => console.log(err));
        return misc.generateEmbed(cP.client, "✅ Award wurde gegeben ✅", "**`mode:`** **USER** [ID: `"+userArg+"`]\n**`award:`** **("+obj.rank+".) "+obj.name+"**", cP.author, "0x2436ff", cP.interaction)
    }else{
        const guild = await cP.client.guilds.fetch(config.mainGuildID)
        const role = await guild.roles.fetch(roleArg)
        
        let members;
        if (role.name === "@everyone"){
            members = await guild.members.fetch()
        }else{
            members = role.members
        }

        let mData;
        await members.forEach(async member => {
            if(!member.user.bot){
                mData = await botUser.load(cP.client, member.id)
                mData.awards.push({name: obj.name, rank: obj.rank, stamp: + new Date()})
                await mData.save().catch(err => console.log(err));
            }
        })
        return misc.generateEmbed(cP.client, "✅ Awards wurden gegeben ✅", "**`mode:`** **ROLE** (<@&"+roleArg+">) [ID: `"+roleArg+"`]\n**`users:`** **"+members.size+"**\n**`award:`** **("+obj.rank+".) "+obj.name+"**", cP.author, "0x2436ff", cP.interaction)
    }
}