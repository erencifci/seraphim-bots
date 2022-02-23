const Discord = require("discord.js");
const prettyMs = require("pretty-ms");
const ms = require("ms");

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

    if (
        message.member.id != message.guild.ownerId &&
        (!member.bannable || member.permissions.has("ADMINISTRATOR"))
    ) {
        let embed = new Discord.MessageEmbed()
            .setDescription(`**Bu kullanıcıyı banlayamazsın!**`)
            .setColor("RED");
        return message.channel.send({ embeds: [embed] });
    }

    if (!args[1]) {
        let embed = new Discord.MessageEmbed()
            .setDescription(
                `**Süre belirtilmemiş!\n\nDoğru kullanım: ${this.help.usage}**`
            )
            .setColor("RED");
        return message.channel.send({ embeds: [embed] });
    }

    let time = ms(args[1]);

    if (isNaN(time) && args[1] != 0) {
        let embed = new Discord.MessageEmbed()
            .setDescription(
                `**Süre geçersiz! Örnek: (1 dakika: 1m), (1 saat: 1h), (1 gün: 1d)**`
            )
            .setColor("RED");
        return message.channel.send({ embeds: [embed] });
    }

    let reason = args.slice(2).join(" ");
    if (!reason) reason = "Herhangi bir sebep belirtilmedi.";

    let pretty = prettyMs(time, { verbose: true });
    if (pretty.includes(".")) {
        let index = pretty.indexOf(".");
        pretty = pretty.substring(0, index) + pretty.substring(index + 2);
    }

    pretty = pretty.replace("days", "gün");
    pretty = pretty.replace("day", "gün");
    pretty = pretty.replace("hours", "saat");
    pretty = pretty.replace("hour", "saat");
    pretty = pretty.replace("minutes", "dakika");
    pretty = pretty.replace("minute", "dakika");
    pretty = pretty.replace("seconds", "saniye");
    pretty = pretty.replace("second", "saniye");
    pretty = pretty.replace("milliseconds", "milisaniye");
    pretty = pretty.replace("millisecond", "milisaniye");
    pretty = pretty.replace("millisaniye", "milisaniye");

    let embed = new Discord.MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setThumbnail(message.member.displayAvatarURL())
        .setAuthor({
            name: `${client.user.username} • Jail Sistemi`,
            iconURL: client.user.displayAvatarURL(),
        }).setDescription(`**Jaile atan yetkili:
${message.member}

Jaile atılan kullanıcı:
${member}

Jaile atıldığı zaman:
${new Date().toLocaleString()}

Jail süresi:
${time == 0 ? "Sınırsız" : pretty}

Jail sebebi:
${reason}
**`);

    let date = new Date();
    let expireAt;
    if (args[1] == 0)
        expireAt = new Date(date.setFullYear(date.getFullYear() + 5));
    if (args[1] != 0)
        expireAt = new Date(
            date.setMilliseconds(date.getMilliseconds() + time)
        );

    try {
        let oldRoles = [];
        member.roles.cache.forEach((role) => {
            oldRoles.push(role.id);
        });
        let db = await Jail.findOneAndUpdate(
            { userID: member.id },
            { reason, oldRoles, expireAt }
        );
        if (!db) {
            await Jail.create({
                reason,
                oldRoles,
                expireAt,
                userID: member.id,
            });
        }
        await member.roles.remove(member.roles.cache, "Jaile Atıldı.");
        await member.roles.add(jailed, "Jaile Atıldı.");

        message.channel.send({ embeds: [embed] });
    } catch (err) {
        message.channel.send(`**Bir hata oluştu!**`);
        return console.log(err);
    }
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "MANAGE_MEMBERS",
    aliases: [],
};

exports.help = {
    name: "jail",
    description: "Kullanıcıyı jaile atar.",
    usage: "jail <kullanıcı> <süre (sınırsız 0)> [sebep]",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
