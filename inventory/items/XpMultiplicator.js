const Item = require("../item");
const timeSpan = require('./../../modules/timeSpan.js')

const data = {
    "name": "XP-Multiplikator",
    "desc": "Dieser XP-Multiplikator erhöht die XP, welche du pro Nachricht pro Minute erhältst, um einen Faktor von **`%factor%`** für `*%duration%h*`",
    "icon": "842392480669499402"
}

module.exports = class XpMultiplicator extends Item {
    constructor(count, factor, duration){
        super(count)
        this.factor = factor
        this.duration = duration
        this.id = (duration/1000)+"XPMULT"+(factor*100)
    }

    static loadFrom(obj) {
        return new this(obj.count, obj.factor);
    }

    getInfo(){
        let info = data
        let d = new timeSpan(this.duration).getSuitableTime()
        info.desc = info.desc.replace("%factor%", this.factor+"x").replace("%duration%", d.amount_fixed+d.unit_shortest)
    }
}