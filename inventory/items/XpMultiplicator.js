const Item = require("../item");

module.exports = class XpMultiplicator extends Item {
    constructor(count, factor){
        super(count)
        this.factor = factor
        this.id = "XPMULT"+(factor*100)
    }

    static loadFrom(obj) {
        return new this(obj.count, obj.factor);
    }
}