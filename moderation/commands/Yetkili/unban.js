const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *@param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    let noMemberEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`**Böyle bir kullanıcı banlanmamış!**`);
    if (!args[0]) return message.channel.send({ embeds: [noMemberEmbed] });

    const bans = await message.guild.bans.fetch();

    let bannedUser = bans.find((b) => b.user.id == args[0]);
    if (!bannedUser) return message.channel.send({ embeds: [noMemberEmbed] });

    try {
        await message.guild.members.unban(bannedUser.user);
    } catch (err) {
        console.log(err);
        return message.channel.send(`**Ban kaldırılırken bir hata oluştu!**`);
    }

    let embed = new Discord.MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setAuthor({
            name: member.client.user.username,
            iconURL: member.client.user.displayAvatarURL(),
        })
        .setTimestamp()
        .setDescription(
            `**${member.user.tag} adlı kullanıcının sunucudaki banı kaldırıldı.**`
        );

    message.channel.send({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "BAN_MEMBERS",
    aliases: [],
};

exports.help = {
    name: "unban",
    description: "ID'si girilen kullanıcının banını kaldırır.",
    usage: "unban <ID>",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
