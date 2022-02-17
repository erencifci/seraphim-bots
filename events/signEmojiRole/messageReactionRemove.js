const Discord = require("discord.js");

const { check } = require("../../functions/role");

/**
 * @param {Discord.Client} client
 * @param {Discord.MessageReaction} reaction
 */

module.exports = async (client, reaction, user) => {
    check(reaction, user, "signRole").then(async (role) => {
        const guild = reaction.message.guild;
        let member = guild.members.cache.get(user.id);
        if (!member)
            member = await guild.members
                .fetch()
                .then((members) =>
                    members.find((member) => member.id === user.id)
                );

        if (!role) return;

        if (!member.roles.cache.has(role.id)) return;

        await member.roles.remove(role, "Rol Sistemi").catch(console.error);
    });
};
