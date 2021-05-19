const config = require('./settings/userdataHandler.json')
const mongoose = require('mongoose')
const User = require('./../models/user.js')

const levelSystem = require('./levelSystem.js')
const economySystem = require('./economySystem.js')
const Inventory = require('./../inventory/inventory.js')

module.exports.load = async function (client, userid){
    var data = await User.findOne({
        userid: userid
    }).then(async function (doc) {
        let userData = await client.users.fetch(userid)
        let userObject = {"username": userData.username, "discriminator": userData.discriminator, "avatar": userData.avatarURL()}
        if (doc == null) {
            let ls = new levelSystem({"new": true})
            let es = new economySystem()
            let inv = new Inventory()
            const newDoc = new User({
                userid: userid,
                userData: userObject,
                levelData: ls,
                economyData: es,
                inventory: inv,
                dataversion: config.dbv,
                ships: []
            })
            await newDoc.save().catch(err => console.log(err));
            return newDoc
        } else {
            if (doc.dataversion != config.dbv){
                doc = await updateData(doc)
            }
            doc.userData = userObject
            doc.markModified("user")
            await doc.save().catch(err => console.log(err));
            return doc
        }
    });

    data.levelData = new levelSystem(data.levelData)
    data.economyData = economySystem.loadFrom(data.economyData)
    data.inventory = Inventory.loadFrom(data.inventory)
    data.markModified("levelData")
    data.markModified("economyData")
    data.markModified("inventory")

    return data
}

async function updateData(data){
    if (data.dataversion === undefined){
        let inv = new Inventory()
        let eS = new economySystem()
        data.dataversion = 2
        data.ships = []
        data.inventory = inv
        data.economyData = eS
    }
    if (data.dataversion === 1){
        let inv = new Inventory()
        let eS = new economySystem()
        data.dataversion = 2
        data.inventory = inv
        data.economyData = eS
    }

    return data
}