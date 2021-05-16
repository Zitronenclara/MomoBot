const botUser = require('./../../modules/userdataHandler.js')

module.exports = async function(cP) {
    let args = cP.args[0].options
    let targetArg = args?.find(t => t.name === "user")?.value
    let pageArg = args?.find(t => t.name === "seite")?.value

    let target;
    let page;
    if (args === undefined){
        target = cP.author.data
        page = 1
    }else{
        if (!targetArg){
            target = cP.author.data
        }else{
            target = await botUser.load(cP.client, targetArg)
        }

        if (!pageArg){
            page = 1
        }else{
            page = pageArg
        }
    }
}