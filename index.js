const { Client, Collection } = require("discord.js");
const { intents, partials } = require("./settings/client");
const client = new Client({ intents, partials });

require("dotenv").config();

const { readdir } = require("fs");

client.commands = new Collection();
client.aliases = new Collection();

readdir("./handlers", (_, files) => {
    files.map((file) => {
        let handler = file.replace(".js", "");
        require(`./handlers/${handler}`)(client);
    });
});

client.login(process.env.TOKEN);
