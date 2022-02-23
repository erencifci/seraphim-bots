const Discord = require("discord.js");

const { muted } = require("../../settings/roles.json");
const Mute = require("../../models/Mute");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *@param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    let member =
        message.mentions.members.first() ||
        (await message.guild.members
            .fetch()
            .then((members) => members.find((member) => member.id == args[0])));

    if (!member) {
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(
                `**Kullanıcı bulunamadı.\n\nDoğru kullanım: ${this.help.usage}**`
            );
        return message.channel.send({ embeds: [embed] });
    }

    if (!member.roles.cache.has(muted)) {
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`**Bu kullanıcı zaten susturulu değil.**`);
        return message.channel.send({ embeds: [embed] });
    }

    await Mute.findOneAndDelete({ userID: member.id });
    await member.roles.remove(muted);

    let embed = new Discord.MessageEmbed()
        .setColor("DARK_BLUE")
        .setTimestamp()
        .setAuthor({
            name: member.client.user.username,
            iconURL: member.client.user.displayAvatarURL(),
        })
        .setDescription(
            `**${member} adlı kullanıcının susturması kaldırıldı!**`
        )
        .setFooter({
            text: `${message.member.displayName} tarafından susturması kaldırıldı.`,
            iconURL: message.member.displayAvatarURL(),
        });

    message.channel.send({ embeds: [embed] });
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "MANAGE_MEMBERS",
    aliases: [],
};

exports.help = {
    name: "unmute",
    description: "Kullanıcının susturmasını kaldırır.",
    usage: "unmute <kullanıcı>",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
