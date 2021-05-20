const XpMultiplicator = require('./../items/XpMultiplicator.js')

module.exports = {
    id: "XP",
    items: [
        {
            item: new XpMultiplicator(1, {duration: 1800000, factor: 1.25}),
            price: 150
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 1.25}),
            price: 300
        },
        {
            item: new XpMultiplicator(1, {duration: 1800000, factor: 1.5}),
            price: 350
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 1.5}),
            price: 600
        }
    ]
}