const config = require('./settings/economySystem.json')
const misc = require('./../functions/misc.js')

module.exports = class economySystem {
    constructor() {
        this.coins = 0
    }

    static loadFrom(obj) {
        let eS = new this()
        eS.coins = obj.coins
        return eS
    }
}