const config = require('./settings/levelSystem.json')
const misc = require('./../functions/misc.js')

class levelSystem {
    constructor(obj) {
        if (obj.new === true) {
            this.xp = 0
            this.xpGes = 0
            this.lvl = 1
            this.roleReward = "/"
            this.nextGainStamp = 0
            this.factor = 1
            this.multActive = false
            this.multStamp = 0
            this.new = false
        } else {
            this.xp = obj.xp
            this.xpGes = obj.xpGes
            this.lvl = obj.lvl
            this.roleReward = obj.roleReward
            this.nextGainStamp = obj.nextGainStamp
            this.new = obj.new

            if (!obj.factor) {
                this.factor = 1
                this.multActive = false
                this.multStamp = 0
            } else {
                this.factor = obj.factor
                this.multActive = obj.multActive
                this.multStamp = obj.multStamp
            }
        }
    }

    gainXP(channelId) {
        if (config.blacklistedChannels.includes(channelId)) {
            return false
        }

        let aktustamp = +new Date()
        if (aktustamp >= this.nextGainStamp) {
            let randomXP = misc.randomInt(config.xpGain.min, config.xpGain.max)
            this.xpGes += randomXP
            this.xp += randomXP
            this.nextGainStamp = aktustamp + config.xpGain.every * 1000
            this.checkForLvlUp()
            return true
        }
        return false
    }

    checkForLvlUp() {
        let reqXP = this.calcRequiredXP()
        if (this.xp >= reqXP) {
            let overshoot = this.xp - reqXP
            this.xp = overshoot
            this.lvl += 1
            this.checkForRoleReward()
        }
    }

    checkForRoleReward() {
        let reward = config.roles.find(r => r.lvl === this.lvl)
        if (reward !== undefined) {
            this.roleReward = reward.id
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
}

module.exports = levelSystem