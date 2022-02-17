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

    // client.guilds.cache
    //     .first()
    //     .channels.fetch()
    //     .then(async (channels) => {
    //         let channel = channels.find((c) => c.id === "943947250638409758");
    //         await channel.messages.fetch("943947304661049394").then(msg => msg.edit(''));
    //     });

    //     let emoji = (id) => client.emojis.cache.find((emoji) => emoji.id === id);

    //     client.guilds.cache
    //         .first()
    //         .channels.fetch()
    //         .then(async (channels) => {
    //             let channel = channels.find(
    //                 (channel) => channel.id === "940666639953846314"
    //             );
    //             const message = await channel.send(`***__Bildirim Rolleri__***

    // **Çekiliş Bildirimi: ${emoji(emojis.cekilis)}**

    // **Etkinlik Bildirimi: ${emoji(emojis.etkinlik)}**`);

    //             await message.react(emoji(emojis.cekilis));
    //             await message.react(emoji(emojis.etkinlik));
    //         });
};
