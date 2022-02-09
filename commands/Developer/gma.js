const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *@param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    client.emit("guildMemberAdd", message.mentions.members.first());
};

exports.settings = {
    enabled: true,
    onlyOwner: true,
    perm: "",
    aliases: [],
};

exports.help = {
    name: "gma",
    description: "Guild Member Add Emit",
    usage: "gma @üye",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
