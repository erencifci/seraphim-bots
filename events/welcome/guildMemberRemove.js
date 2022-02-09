const Discord = require("discord.js");
const { welcome } = require("../../settings/channels.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.GuildMember} member
 */

module.exports = (client, member) => {
    const welcomeChannel = member.guild.channels.cache.get(welcome);
    if (!welcomeChannel) return console.log("Welcome channel not found");

    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setAuthor({
            name: `${member.user.username}`,
            iconURL: `${member.user.displayAvatarURL()}`,
        })
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**${member} sunucudan ayrıldı.

Sen çıkınca \`${member.guild.memberCount}\` kişi kaldık.**`);

    welcomeChannel.send({ embeds: [embed] });
};
