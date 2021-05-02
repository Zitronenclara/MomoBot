const misc = require('./../functions/misc.js')

module.exports = class Item {
    constructor(count){
        this.name = this.constructor.toString().split ('(' || /s+/)[0].split (' ' || /s+/)[1];
        this.count = count
    }

    add(count) {
        this.count += count
    }

    remove(count) {
        this.count -= count
    }
}