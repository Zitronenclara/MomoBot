const misc = require('./../../functions/misc.js')
const botUser = require('./../../modules/userdataHandler.js')
const config = require('./../../config.json')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let roleArg = args?.find(t => t.name === "role")?.value
    let userArg = args?.find(t => t.name === "user")?.value
    let amountArg = args?.find(t => t.name === "amount")?.value

    let userMode = !roleArg && userArg !== undefined
    if (userMode){
        let userData = await botUser.load(cP.client, userArg)
        userData.economyData.coins += amountArg
        await userData.save().catch(err => console.log(err));
        return misc.generateEmbed(cP.client, "✅ Coins wurden gegeben ✅", "**`mode:`** **USER** [ID: `"+userArg+"`]\n**`amount:`** **"+amountArg+"**", cP.author, "0x2436ff", cP.interaction)
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
                mData.economyData.coins += amountArg
                await mData.save().catch(err => console.log(err));
            }
        })
        return misc.generateEmbed(cP.client, "✅ Coins wurden gegeben ✅", "**`mode:`** **ROLE** (<@&"+roleArg+">) [ID: `"+roleArg+"`]\n**`users:`** **"+members.size+"**\n**`amount:`** **"+amountArg+"**", cP.author, "0x2436ff", cP.interaction)
    }
}