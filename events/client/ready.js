const Discord = require("discord.js");

const { owner } = require("../../settings/bot.json");
const emojis = require("../../settings/emojis.json");
const roles = require("../../settings/roles.json");

/**
 *
 * @param {Discord.Client} client
 */

module.exports = async (client) => {
    client.user.setActivity("Developed by KLeesD", { type: "LISTENING" });
    console.log("Seraphim Register Online!");

    // let emoji = (id) => client.emojis.cache.find((emoji) => emoji.id === id);

    // client.guilds.cache
    //     .first()
    //     .channels.fetch()
    //     .then(async (channels) => {
    //         let channel = channels.find(
    //             (channel) => channel.id === "943947250638409758"
    //         );
    //         const message = await channel.send(`***__Burç Rolleri__***

    // **Balık: ${emoji(emojis.balik)}**

    // **Oğlak: ${emoji(emojis.oglak)}**

    // **İkizler: ${emoji(emojis.ikizler)}**

    // **Başak: ${emoji(emojis.basak)}**

    // **Aslan: ${emoji(emojis.aslan)}**

    // **Koç: ${emoji(emojis.koc)}**

    // **Akrep: ${emoji(emojis.akrep)}**

    // **Terazi: ${emoji(emojis.terazi)}**

    // **Yay: ${emoji(emojis.yay)}**

    // **Yengeç: ${emoji(emojis.yengec)}**

    // **Boğa: ${emoji(emojis.boga)}**`);

    //         await message.react(emoji(emojis.balik));
    //         await message.react(emoji(emojis.oglak));
    //         await message.react(emoji(emojis.ikizler));
    //         await message.react(emoji(emojis.basak));
    //         await message.react(emoji(emojis.aslan));
    //         await message.react(emoji(emojis.koc));
    //         await message.react(emoji(emojis.akrep));
    //         await message.react(emoji(emojis.terazi));
    //         await message.react(emoji(emojis.yay));
    //         await message.react(emoji(emojis.yengec));
    //         await message.react(emoji(emojis.boga));
    //     });
};
