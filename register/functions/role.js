const roles = require("../settings/roles.json");
const channels = require("../settings/channels.json");
const emojis = require("../settings/emojis.json");

module.exports = {
    check: async (reaction, user, channel) => {
        const guild = reaction.message.guild;
        const member = await guild.members.fetch(user.id);
        if (!member) return console.log("Member not found!");
        if (member.user.bot) return;
        if (reaction.message.channel.id != channels[channel]) return;

        const emojiName = reaction.emoji.name.toLowerCase();

        if (!emojis[emojiName])
            return console.log(`${emojiName} is not a valid emoji.`);

        const role = guild.roles.cache.get(roles[emojiName]);

        if (!role) return console.log(`Role not found for ${emojiName}`);

        return role;
    },
};
