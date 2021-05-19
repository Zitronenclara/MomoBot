const config = require('./settings/economySystem.json')
const misc = require('./../functions/misc.js')

module.exports = class economySystem {
    constructor() {
        this.coins = 0
        this.dailyStamp = 0
        this.dailyStreak = 0
        this.maxStreak = 0
    }

    static loadFrom(obj) {
        let eS = new this()
        eS.coins = obj.coins
        eS.dailyStamp = obj.dailyStamp
        eS.dailyStreak = obj.dailyStreak
        eS.maxStreak = obj.maxStreak
        return eS
    }

    doDaily(lvlSys) {
        
    }

    calcDailyGain(lvlSys) {
        return Math.round(lvlSys.calcRequiredXP() / 10)
    }
}