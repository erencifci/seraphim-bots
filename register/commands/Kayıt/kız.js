const Discord = require("discord.js");
const { tag } = require("../../settings/bot.json");
const {
    masculino,
    teyitSorumlusu,
    femina,
    unRegistered,
} = require("../../settings/roles.json");
const { chat } = require("../../settings/channels.json");

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 *@param {Array<String>} args
 */

exports.run = async function (client, message, args) {
    let errEmbed = new Discord.MessageEmbed().setColor("RED").setTimestamp();

    if (!message.member.roles.cache.has(teyitSorumlusu))
        return message.channel.send({
            embeds: [
                errEmbed.setDescription(
                    "**Bu komutu kullanabilmek için 'Teyit Sorumlusu' yetkisine sahip olmalısın.**"
                ),
            ],
        });

    let member = message.mentions.members.first();
    if (!member)
        member = await message.guild.members
            .fetch()
            .then((members) => members.find((member) => member.id == args[0]));

    let isim = args[1];
    let yas = args[2];

    if (!member)
        return message.channel.send({
            embeds: [
                errEmbed.setDescription(
                    `**Böyle bir üye bulamadım!\nKullanımı: \`${this.help.usage}\`**`
                ),
            ],
        });

    if (!isim || !yas)
        return message.channel.send({
            embeds: [
                errEmbed.setDescription(
                    `**İsim veya yaş girmelisin!\nKullanımı: \`${this.help.usage}\`**`
                ),
            ],
        });

    let newNick = `${tag} ${isim} | ${yas}`;

    let embed = new Discord.MessageEmbed()
        .setColor("DARK_PURPLE")
        .setTimestamp()
        .setDescription(
            `**${member} aramıza ${member.guild.roles.cache.get(
                femina
            )} rolüyle katıldı.

• Kayıt eden yetkili
${message.member}**`
        )
        .setThumbnail(member.displayAvatarURL());

    if (member.roles.cache.has(femina))
        return message.channel.send({
            embeds: [
                errEmbed.setDescription(
                    `**${member} zaten ${member.guild.roles.cache.get(
                        femina
                    )} rolü ile kayıtlı!**`
                ),
            ],
        });

    try {
        if (member.roles.cache.has(masculino))
            await member.roles.remove(masculino, "Kayıt");

        await member.roles.remove(unRegistered, "Kayıt");
        await member.roles.add(femina, "Kayıt");

        await member.setNickname(newNick, "Kayıt");

        client.channels.cache
            .get(chat)
            .send(
                `${member} Kayıt Oldu. Aramıza Hoş Geldin! :champagne_glass:`
            );

        message.channel.send({ embeds: [embed] });
    } catch (err) {
        console.log(err);
        message.channel.send({
            embeds: [errEmbed.setDescription(`**Bir hata oluştu!**`)],
        });
    }
};

exports.settings = {
    enabled: true,
    onlyOwner: false,
    perm: "",
    aliases: ["k"],
};

exports.help = {
    name: "kız",
    description: "Kız olarak kayıt eder.",
    usage: "kız <@üye> <İsim> <Yaş>",
    category: __dirname.slice(__dirname.lastIndexOf("\\") + 1),
};
