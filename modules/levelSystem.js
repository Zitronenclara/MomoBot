const config = require('./settings/levelSystem.json')
const misc = require('./../functions/misc.js')
const timeSpan = require('./timeSpan.js')

class levelSystem {
    constructor(obj) {
        if (obj.new === true) {
            this.xp = 0
            this.xpGes = 0
            this.lvl = 1
            this.roleReward = "/"
            this.boosterReward = "/"
            this.nextGainStamp = 0
            this.factor = 1
            this.multActive = false
            this.multStamp = 0
            this.gainsToday = 0
            this.gainsTodayStamp = 0
            this.new = false
        } else {
            this.xp = obj.xp
            this.xpGes = obj.xpGes
            this.lvl = obj.lvl
            this.roleReward = obj.roleReward
            this.nextGainStamp = obj.nextGainStamp
            this.new = obj.new

            if (obj.factor === undefined) {
                this.factor = 1
                this.multActive = false
                this.multStamp = 0
                this.gainsToday = 0
                this.gainsTodayStamp = 0
                this.boosterReward = "/"
            } else {
                this.factor = obj.factor
                this.multActive = obj.multActive
                this.multStamp = obj.multStamp
                this.gainsToday = obj.gainsToday
                this.gainsTodayStamp = obj.gainsTodayStamp
                this.boosterReward = obj.boosterReward
            }
        }
    }

    async gainXP(channelId) {
        if (config.blacklistedChannels.includes(channelId)) {
            return false
        }

        this.checkIfMultExpired()
        let aktustamp = + new Date()
        if (aktustamp >= this.nextGainStamp) {
            let randomXP = Math.round(misc.randomInt(config.xpGain.min, config.xpGain.max)*this.factor)
            this.xpGes += randomXP
            this.xp += randomXP
            this.nextGainStamp = aktustamp + config.xpGain.every * 1000
            this.updateGainsToday()
            this.checkForLvlUp()
            return true
        }
        return false
    }

    updateGainsToday() {
        let nowStamp = + new Date()
        let nextStamp = new timeSpan(this.gainsTodayStamp).getNextMidnightStamp()
        if (nowStamp > nextStamp){
            this.gainsTodayStamp = nowStamp
            this.gainsToday = 1
        }else{
            this.gainsToday += 1
        }
    }

    checkForLvlUp() {
        let reqXP = this.calcRequiredXP()
        if (this.xp >= reqXP) {
            let overshoot = this.xp - reqXP
            this.xp = overshoot
            this.lvl += 1
            this.checkForRoleReward()
            this.checkForBoosterReward()
        }
    }

    checkForRoleReward() {
        let reward = config.roles.find(r => r.lvl === this.lvl)
        if (reward !== undefined) {
            this.roleReward = reward.id
        }
    }

    checkForBoosterReward() {
        let reward = config.boosters.find(b => b.lvl === this.lvl)
        if (reward !== undefined) {
            this.boosterReward = reward.booster
        }
    }

    generateProgressBar() {
        let fullAmount = Math.floor((this.xp / this.calcRequiredXP()) * config.xpBar.amount)
        let emptyAmount = config.xpBar.amount - fullAmount

        if (fullAmount === 0) {
            return config.xpBar.unfilled.repeat(config.xpBar.amount)
        } else if (emptyAmount === 0) {
            return config.xpBar.filled.repeat(config.xpBar.amount)
        } else {
            if (emptyAmount > config.xpBar.amount){
                emptyAmount = 20
            }
            if (emptyAmount < 0){
                emptyAmount = 0
            }
            if (fullAmount > config.xpBar.amount){
                fullAmount = config.xpBar.amount
            }
            if (fullAmount < 0){
                fullAmount = 0
            }
            return config.xpBar.filled.repeat(fullAmount) + config.xpBar.unfilled.repeat(emptyAmount)
        }
    }

    calcRequiredXP() {
        let lvl = this.lvl - 1
        return (5 * (lvl ** 2) + (50 * lvl)) + 100
    }

    calcRemainingXP() {
        return this.calcRequiredXP - this.xp
    }

    addMultiplicator(factor, duration) {
        this.multActive = true
        this.multStamp = + new Date () + duration
        this.factor = factor
    }

    checkIfMultExpired() {
        let stamp = + new Date()
        
        if (this.multActive){
            if (stamp > this.multStamp){
                this.multActive = false
                this.factor = 1
            }
        }
    }
}

module.exports = levelSystem