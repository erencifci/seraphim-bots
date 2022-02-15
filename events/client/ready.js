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

    //     let emoji = (id) => client.emojis.cache.find((emoji) => emoji.id === id);

    //     client.guilds.cache
    //         .first()
    //         .channels.fetch()
    //         .then(async (channels) => {
    //             let channel = channels.find(
    //                 (channel) => channel.id === "940698288598970459"
    //             );
    //             const message = await channel.send(`***__Oyun Rolleri__***

    // **CSGO: ${emoji(emojis.csgo)}**

    // **Valorant: ${emoji(emojis.valorant)}**

    // **PUBG: ${emoji(emojis.pubg)}**

    // **Rainbow Six Siege: ${emoji(emojis.rainbow_six_siege)}**

    // **LoL: ${emoji(emojis.lol)}**

    // **Rust: ${emoji(emojis.rust)}**

    // **Minecraft: ${emoji(emojis.minecraft)}**

    // **ETS 2: ${emoji(emojis.ets2)}**

    // **Fifa 21-22: ${emoji(emojis.FIFA)}**

    // **GTA 5: ${emoji(emojis.gta_5)}**

    // **Apex Legends: ${emoji(emojis.apex_legends)}**

    // **Rocket League: ${emoji(emojis.rocket_league)}**

    // **The Forest: ${emoji(emojis.theForest)}**`);

    //             await message.react(emoji(emojis.csgo));
    //             await message.react(emoji(emojis.valorant));
    //             await message.react(emoji(emojis.pubg));
    //             await message.react(emoji(emojis.rainbow_six_siege));
    //             await message.react(emoji(emojis.lol));
    //             await message.react(emoji(emojis.rust));
    //             await message.react(emoji(emojis.minecraft));
    //             await message.react(emoji(emojis.ets2));
    //             await message.react(emoji(emojis.FIFA));
    //             await message.react(emoji(emojis.gta_5));
    //             await message.react(emoji(emojis.apex_legends));
    //             await message.react(emoji(emojis.rocket_league));
    //             await message.react(emoji(emojis.theForest));
    //         });
};
