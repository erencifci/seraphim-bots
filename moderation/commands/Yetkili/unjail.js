const Discord = require("discord.js");

const { jailed } = require("../../settings/roles.json");
const Jail = require("../../models/Jail");

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

    if (!member.roles.cache.has(jailed)) {
        let embed = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`**Bu kullanıcı zaten jailde değil.**`);
        return message.channel.send({ embeds: [embed] });
    }

    let db = await Jail.findOneAndDelete({ userID: member.id });

    let roles = [];

    await db?.oldRoles?.forEach((r) => {
        roles.push(r);
    });

    await member.roles.add([...roles]);
    await member.roles.remove(jailed);

    let embed = new Discord.MessageEmbed()
        .setColor("DARK_BLUE")
        .setTimestamp()
        .setAuthor({
            name: member.client.user.username,
            iconURL: member.client.user.displayAvatarURL(),
        })
        .setDescription(`**${member} adlı kullanıcı jailden çıkartıldı!**`)
        .setFooter({
            text: `${message.member.displayName} tarafından jailden çıkartıldı.`,
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
    name: "unjail",
    description: "Kullanıcıyı jailden çıkartır.",
    usage: "unjail <kullanıcı>",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
