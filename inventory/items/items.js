const fs = require("fs");
var items = {}

let files = fs.readdirSync('./inventory/items')
let jsFiles = files.filter((f) => f.split(".").pop() === "js");

if (jsFiles.length <= 0) {
    return;
}

jsFiles.forEach((f, i) => {
    let name = f.split(".")[0];

    if(name == "items") {
        return;
    }

    let pull = require(`./${name}.js`);
    items[name] = pull;
});

module.exports = items;