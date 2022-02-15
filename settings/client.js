const { Intents } = require("discord.js");

const intents = [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
];

const partials = ["MESSAGE", "REACTION", "CHANNEL"];

module.exports = {
    intents,
    partials,
};
