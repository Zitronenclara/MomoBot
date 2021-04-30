const Discord = require('discord.js')
const misc = require('./../../functions/misc.js')
const shipData = require('./../../data/shipData.json')
const botUser = require('./../../modules/userdataHandler.js')

module.exports = async function(cP){
    let self = cP.args[0].options.length === 1

    if(self && cP.author.info.id === cP.args[0].options[0].value){
        return await misc.generateEmbed(cP.client, "😭 Nawww 😭", "Bist du wirklich so verzweifelt? qwq Armes tuck tuck :C Verkuppel dich doch nicht mit dir selbst, es gibt so viele tolle Menschen hier ;-;", cP.author, "0x244a87", cP.interaction)
    }

    let personA = cP.args[0].options[0].value
    let personB;
    if (self){
        personB = cP.author.info.id
    }else{
        personB = cP.args[0].options[1].value
    }

    let dataA = await botUser.load(cP.client, personA)
    let dataB = await botUser.load(cP.client, personB)

    let hasShip = dataA.length === 0
    if (!hasShip){
        hasShip = dataA.ships.find(s => s.id === dataB.userid) != undefined
    }

    let percent;
    if (hasShip){
        percent = dataA.ships.find(s => s.id === dataB.userid).percent
    }else{
        percent = generateShipPercent()
        dataA.ships.push({id: dataB.userid, percent: percent})
        dataB.ships.push({id: dataA.userid, percent: percent})
        await dataA.save().catch(err => console.log(err));
        await dataB.save().catch(err => console.log(err));
    }

    let info = shipData.find(s => s.factor === Math.round(percent/10))

    const shipEmbed = new Discord.MessageEmbed()
            .setAuthor(info.emoji+generateName(dataA, dataB)+info.emoji)
            .setTitle(percent+"%")
            .setColor("0x"+info.color)
            .setDescription(info.texts[Math.floor(Math.random()*info.texts.length)]);
    await misc.sendInteraction(cP.client, {"content": "","embeds": [shipEmbed]}, cP.interaction)
}

function generateName(dataA, dataB){
    let A = dataA.userData.username
    let B = dataB.userData.username
    let nameA = A.substring(0, A.length - Math.floor(A.length / 2));
    let nameB = B.substring(Math.floor(B.length / 2))

    return (nameA+nameB).replace(/\s/g, '');
}

function generateShipPercent(){
    return percent = parseFloat((misc.randomInt(1, 10000) / 100).toFixed(2))
}