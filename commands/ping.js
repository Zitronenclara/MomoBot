const misc = require('./../functions/misc.js')

module.exports = {
	name: 'ping',
	description: 'Ping!',
	options: [],
	async execute(cP) {
		await misc.generateEmbed(cP.client, "📡 PONG 📡", "Bot Latenz: **`" + Math.round(cP.client.ws.ping) + "ms`**", cP.author, "0xFF964F", cP.interaction)
	}
};