const Discord = require("discord.js");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *@param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    let member = message.mentions.members.first();
    if (!member)
        member = await message.guild.members
            .fetch()
            .then((members) => members.find((member) => member.id == args[0]));

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

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "Herhangi bir sebep belirtilmedi.";

    try {
        await member.ban({ reason });

        let embed = new Discord.MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setThumbnail(message.member.displayAvatarURL())
            .setAuthor({
                name: `${client.user.username} • Ban Sistemi`,
                iconURL: client.user.displayAvatarURL(),
            }).setDescription(`**Banlayan yetkili:
${message.member} (${message.member.id})

Banlanan kullanıcı:
${member} (${member.id})

Banlandığı tarih:
${new Date().toLocaleString()}

Banlanma sebebi:
${reason}
**`);
        message.channel.send({ embeds: [embed] });
    } catch (err) {
        message.channel.send(`**Bir hata oluştu lütfen tekrar dene.**`);
        console.log(err);
    }
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "BAN_MEMBERS",
    aliases: [],
};

exports.help = {
    name: "ban",
    description: "Etiketlediğiniz üyeyi banlar.",
    usage: "ban <@üye veya ID> [Sebep]",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
