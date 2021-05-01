const config = require('./settings/userdataHandler.json')
const mongoose = require('mongoose')
const User = require('./../models/user.js')

const levelSystem = require('./levelSystem.js')

module.exports.load = async function (client, userid){
    var data = await User.findOne({
        userid: userid
    }).then(async function (doc) {
        let userData = await client.users.fetch(userid)
        let userObject = {"username": userData.username, "discriminator": userData.discriminator, "avatar": userData.avatarURL()}
        if (doc == null) {
            let ls = new levelSystem({"new": true})
            const newDoc = new User({
                userid: userid,
                userData: userObject,
                levelData: ls,
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
    data.markModified("levelData")

    return data
}

async function updateData(data){
    if (data.dataversion === undefined){
        data.dataversion = 1
        data.ships = []
    }

    return data
}