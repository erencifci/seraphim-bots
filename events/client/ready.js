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

    let emoji = (id) => client.emojis.cache.find((emoji) => emoji.id === id);

    client.guilds.cache
        .first()
        .channels.fetch()
        .then(async (channels) => {
            let channel = channels.find(
                (channel) => channel.id === "940666640775938101"
            );
            const message = await channel.send(`***__İlişki Rolleri__***

    **Evli: ${emoji(emojis.evli)}**
    
    **Sevgilim Var: ${emoji(emojis.sevgilimvar)}**
    
    **Sevgilim Yok: ${emoji(emojis.sevgilimyok)}**
    
    **Sevdiğim Var: ${emoji(emojis.sevdigimvar)}**
    
    **Sevgili Yapmıyorum: ${emoji(emojis.sevgiliyapmiyorum)}**
    `);

            await message.react(emoji(emojis.evli));
            await message.react(emoji(emojis.sevgilimvar));
            await message.react(emoji(emojis.sevgilimyok));
            await message.react(emoji(emojis.sevdigimvar));
            await message.react(emoji(emojis.sevgiliyapmiyorum));
        });
};
