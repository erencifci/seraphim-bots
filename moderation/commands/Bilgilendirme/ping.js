const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    message.channel.send(`${Math.round(client.ws.ping)}`);
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: ["p"],
};

exports.help = {
    name: "ping",
    description: "Botun pingini gösterir.",
    usage: "ping",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
