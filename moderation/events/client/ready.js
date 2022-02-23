const { jailed, muted } = require("../../settings/roles.json");
const Mute = require("../../models/Mute");
const Jail = require("../../models/Jail");

module.exports = async (client) => {
    client.user.setActivity("Developed by KLeesD", { type: "LISTENING" });
    console.log("Seraphim Moderation Online!");

    setInterval(async () => {
        {
            let jailDb = await Jail.find();
            if (!jailDb) return;

            jailDb.forEach(async (data) => {
                const date = new Date();
                const expireAt = new Date(data.expireAt);
                let userID = await data.userID;

                if (date >= expireAt) {
                    let roles = [];
                    await data.oldRoles.forEach((r) => {
                        roles.push(r);
                    });
                    const member = await client.guilds.cache
                        .get("940666639286956032")
                        .members.fetch()
                        .then((members) =>
                            members.find((member) => member.id == userID)
                        );

                    setTimeout(async () => {
                        await Jail.deleteOne({ userID: userID });
                        if (!member) return console.log("member bulunamadı");

                        try {
                            await member.roles.add([...roles], "Jail Bitti.");
                            await member.roles.remove(jailed, "Jail Bitti.");
                        } catch (err) {
                            console.error(err);
                        }
                    }, 500);
                }
            });
        }

        {
            let muteDb = await Mute.find();
            if (!muteDb) return;

            muteDb.forEach(async (data) => {
                const date = new Date();
                const expireAt = new Date(data.expireAt);
                let userID = await data.userID;

                if (date >= expireAt) {
                    const member = await client.guilds.cache
                        .get("940666639286956032")
                        .members.fetch()
                        .then((members) =>
                            members.find((member) => member.id == userID)
                        );

                    setTimeout(async () => {
                        await Mute.deleteOne({ userID: userID });
                        if (!member) return console.log("member bulunamadı");

                        try {
                            await member.roles.remove(muted, "Mute Bitti.");
                        } catch (err) {
                            console.error(err);
                        }
                    }, 500);
                }
            });
        }
    }, 300000);
};
