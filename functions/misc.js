const Discord = require('discord.js')
const axios = require('axios')
const config = require('./../config.json')

module.exports.generateEmbed = async function (client, title, desc, trigger, color, interaction) {
    if (!color) {
        color = "0xFFEC49"
    }
    const embed = new Discord.MessageEmbed()
        .setAuthor(title, trigger.displayAvatarURL)
        .setColor(color)
        .setDescription(desc);
    client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: 4,
            data: {
                content: "",
                embeds: [embed]
            }
        }
    })
}

module.exports.sendInteraction = async function (client, data, interaction, type) {
    if (!type) {
        type = 4
    }

    await client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
            type: type,
            data: data
        }
    })

    let m = await client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({data: {}})
    return new Discord.Message(client, m, client.channels.cache.get(m.channel_id))
}

module.exports.editInteraction = async function (client_id, interaction_token, data) {
    let http_config = {
        headers: {
            "Authorization": "Bot " + config.token
        }
    }
    axios.patch(`https://discordapp.com/api/v8/webhooks/${client_id}/${interaction_token}/messages/@original`, data, http_config)
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.createGuildCommand = async function (application_id, guild_id, data) {
    let http_config = {
        headers: {
            "Authorization": "Bot " + config.token
        }
    }

    axios.post(`https://discordapp.com/api/v8/applications/${application_id}/guilds/${guild_id}/commands`, data, http_config)
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.getGuildCommands = async function (application_id, guild_id) {
    let http_config = {
        headers: {
            "Authorization": "Bot " + config.token
        }
    }

    axios.get(`https://discordapp.com/api/v8/applications/${application_id}/guilds/${guild_id}/commands`, http_config)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.deleteGuildCommand = async function (application_id, guild_id, command_id) {
    let http_config = {
        headers: {
            "Authorization": "Bot " + config.token
        }
    }

    axios.delete(`https://discordapp.com/api/v8/applications/${application_id}/guilds/${guild_id}/commands/${command_id}`, http_config)
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.randomInt = function (min, max) {
    return parseInt(Math.floor(Math.random() * (max - min) + min))
}

module.exports.calcRequiredXpTillLvlup = function (lvl) {
    lvl = lvl - 1
    return (5*(lvl**2) + (50*lvl)) + 100
}

module.exports.getMeme = async function(reddit) {
    let url = "https://meme-api.herokuapp.com/gimme" + (reddit == "" ? "" : "/" + reddit);
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return null;
    }
}

module.exports.getGif = async function(category) {
    let url = "https://images.stefftek.de/" + category
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        return null;
    }
}