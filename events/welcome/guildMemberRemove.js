const Discord = require("discord.js");
const { gelenGiden } = require("../../settings/channels.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.GuildMember} member
 */

module.exports = async (client, member) => {
    const guild = member.guild;
    const ggChannel = guild.channels.cache.get(gelenGiden);
    if (!ggChannel) return console.log("gg channel not found");

    ggChannel.send(`${member} sunucudan ayrıldı.`);
};
