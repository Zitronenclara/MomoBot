const misc = require('./../functions/misc.js')
let items = require('./items/items.js')

module.exports = class Inventory {
    constructor(){
        this.items = []
    }

    static loadFrom(obj) {
        let inv = new this();
        inv.items = obj.items;
        return inv;
    }

    addItem(cls, count) {
        let index = this.checkForItem(cls)

        if (index === null){
            this.items.push(cls)
        }else{
            this.items[index] = items[this.items[index].name].loadFrom(this.items[index])
            this.items[index].add(count)
        }
    }

    removeItem(cls, count) {
        let index = this.checkForItem(cls)

        if (index === null){
            return false
        }else{
            if (count > this.items[index].count){
                return false
            }

            this.items[index] = items[this.items[index].name].loadFrom(this.items[index])
            this.items[index].remove(count)
            if (this.items[index].count == 0){
                this.items.splice(index, 1)
            }
            return true
        }
    }

    checkForItem(cls){
        let item = this.items.find(i => i.id === cls.id)
        if(!item){
            return null
        }else{
            return this.items.indexOf(item)
        }
    }
}