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

    // insert obj = {name: itemName, count: itemCount, other: {other things}} or obj = {preset: presetName}
    let obj = JSON.parse(objectArg)
    if (obj.preset){
        obj = presets.find(p => p.name === obj.preset).object
    }
    let itemClass = items[obj.name]
    
    let item;
    try {
        item = new itemClass(obj.count, obj.other)
    } catch (err){
        return misc.generateEmbed(cP.client, "⚠️ Fehler ⚠️", "Itemklasse nicht gefunden!", cP.author, "0xf52411", cP.interaction)
    }

    let userMode = !roleArg && userArg !== undefined
    if (userMode){
        let userData = await botUser.load(cP.client, userArg)
        userData.inventory.addItem(item, obj.count)
        await userData.save().catch(err => console.log(err));

        let info = item.getInfo()
        return misc.generateEmbed(cP.client, "✅ Item wurde gegeben ✅", "**`mode:`** **USER** [ID: `"+userArg+"`]\n**`item:`** **"+info.name+"**\n**`count:`** **"+obj.count+"**\n**`desc:`** *"+info.desc+"*", cP.author, "0x2436ff", cP.interaction)
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
                mData.inventory.addItem(item, obj.count)
                mData.markModified("inventory")
                await mData.save().catch(err => console.log(err));
            }
        })

        let info = item.getInfo()
        return misc.generateEmbed(cP.client, "✅ Items wurden gegeben ✅", "**`mode:`** **ROLE** (<@&"+roleArg+">) [ID: `"+roleArg+"`]\n**`users:`** **"+members.size+"**\n**`item:`** **"+info.name+"**\n**`count:`** **"+obj.count+"**\n**`desc:`** *"+info.desc+"*", cP.author, "0x2436ff", cP.interaction)
    }
}