const config = require('./settings/economySystem.json')
const misc = require('./../functions/misc.js')
const timeSpan = require('./timeSpan.js')

module.exports = class economySystem {
    constructor() {
        this.coins = 0
        this.coinsGained = 0
        this.coinsSpent = 0
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

    async doDaily(lvlSys) {
        let nowStamp = + new Date()
        let nextDailyStamp = new timeSpan(this.dailyStamp).getNextMidnightStamp()
        if (lvlSys.gainsToday < 5){
            return {success: false, message: "Du musst **mindestens 5 Minuten aktiv im Chat** geschrieben haben, um deine täglichen MomoCoins für heute abzuholen!"}
        }
        if (nowStamp < nextDailyStamp){
            let remainingTime = new timeSpan(nextDailyStamp - nowStamp).getBeautifiedTime()
            return {success: false, message: "Du musst noch **`"+remainingTime+"`** warten, bevor du deine nächsten täglichen MomoCoins abholen kannst!"}
        }
        this.checkStreak()
        let coinsGain = this.calcDailyGain(lvlSys)
        coinsGain += Math.round(coinsGain * (0.025*this.dailyStreak))
        this.coins += coinsGain
        this.coinsGained += coinsGain
        this.dailyStamp = nowStamp
        return {success: true, amount: coinsGain, streak: this.dailyStreak}
    }

    checkStreak() {
        let lastDaily = new timeSpan(this.dailyStamp).getCurrentMidnightStamp()
        let nowStamp = + new Date()

        // bigger than 2 days in milliseconds
        if (nowStamp - lastDaily > 172800000){
            this.dailyStreak = 1
            if (this.maxStreak === 0){
                this.maxStreak = 1
            }
        }else{
            this.dailyStreak += 1
            if (this.dailyStreak > this.maxStreak){
                this.maxStreak = this.dailyStreak
            }
        }
    }

    calcDailyGain(lvlSys) {
        return Math.round(lvlSys.calcRequiredXP() / 10)
    }

    remove(count) {
        if (count > this.coins){
            return false
        }else{
            this.coins -= count
            this.coinsSpent += count
            return true
        }
    }
}