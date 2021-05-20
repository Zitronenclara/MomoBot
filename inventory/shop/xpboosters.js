const XpMultiplicator = require('./../items/XpMultiplicator.js')

module.exports = {
    name: "XP-BOOSTER",
    color: "61338a",
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
            price: 400
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 1.5}),
            price: 600
        },
        {
            item: new XpMultiplicator(1, {duration: 1800000, factor: 2}),
            price: 800
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 2}),
            price: 1200
        },
        {
            item: new XpMultiplicator(1, {duration: 1800000, factor: 3}),
            price: 1500
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 3}),
            price: 2400
        },
        {
            item: new XpMultiplicator(1, {duration: 1800000, factor: 5}),
            price: 3000
        },
        {
            item: new XpMultiplicator(1, {duration: 3600000, factor: 5}),
            price: 4800
        }
    ]
}