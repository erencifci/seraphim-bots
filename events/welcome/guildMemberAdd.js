const Discord = require("discord.js");
const { welcome, gelenGiden } = require("../../settings/channels.json");
const { unRegistered } = require("../../settings/roles.json");
const momentz = require("moment-timezone");

/**
 * @param {Discord.Client} client
 * @param {Discord.GuildMember} member
 */

module.exports = async (client, member) => {
    const guild = member.guild;
    const ggChannel = guild.channels.cache.get(gelenGiden);

    if (!ggChannel) return console.log("gg channel not found");
    ggChannel.send(`${member} sunucuya katıldı.`);

    const welcomeChannel = guild.channels.cache.get(welcome);
    if (!welcomeChannel) return console.log("Welcome channel not found");

    let date = momentz(member.user.createdTimestamp)
        .tz("Europe/Istanbul")
        .format("DD MMMM YYYY HH:mm");

    date = date.replace("January", "Ocak");
    date = date.replace("February", "Şubat");
    date = date.replace("March", "Mart");
    date = date.replace("April", "Nisan");
    date = date.replace("May", "Mayıs");
    date = date.replace("June", "Haziran");
    date = date.replace("July", "Temmuz");
    date = date.replace("August", "Ağustos");
    date = date.replace("September", "Eylül");
    date = date.replace("October", "Ekim");
    date = date.replace("November", "Kasım");
    date = date.replace("December", "Aralık");

    const embed = new Discord.MessageEmbed()
        .setColor("BLUE")
        .setAuthor({
            name: `${member.user.username}`,
            iconURL: `${
                member.user.avatarURL()
                    ? member.user.avatarURL()
                    : member.user.defaultAvatarURL
            }`,
        })
        .setThumbnail(member.user.displayAvatarURL())
        .setDescription(`**${member} sunucuya katıldı.

Seninle birlikte \`${member.guild.memberCount}\` kişiyiz.

Hesap oluşturulma tarihi: \`${date}\`**`);

    welcomeChannel.send({ embeds: [embed] });
    member.roles.add(unRegistered);
};
