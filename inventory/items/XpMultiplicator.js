const Item = require("../item");
const timeSpan = require('./../../modules/timeSpan.js')

const data = {
    "name": "XP-Multiplikator",
    "desc": "Dieser XP-Multiplikator erhöht die XP, welche du pro Nachricht pro Minute erhältst, um einen Faktor von **`%factor%`** für **`%duration%`**",
    "icon": "842392480669499402"
}

module.exports = class XpMultiplicator extends Item {
    constructor(count, obj){
        super(count)
        this.factor = obj.factor
        this.duration = obj.duration
        this.id = (obj.duration/1000)+"XPMULT"+(obj.factor*100)
    }

    static loadFrom(obj) {
        return new this(obj.count, {duration: obj.duration, factor: obj.factor});
    }

    getInfo(){
        let d = new timeSpan(this.duration).getSuitableTime()
        let desc = data.desc.replace("%factor%", this.factor+"x").replace("%duration%", d.amount_fixed+d.unit_shortest)
        return {name: data.name, desc: desc, icon: data.icon}
    }
}