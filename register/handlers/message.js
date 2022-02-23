const { readdir, readdirSync } = require("fs");
const ascii = require("ascii-table");
const table = new ascii("Commands");
table.setHeading("Command", "Load Status");

module.exports = (client) => {
    readdir("./commands/", (err, dirs) => {
        if (err) return console.log(err);

        dirs.forEach((dir) => {
            const commands = readdirSync(`./commands/${dir}`).filter((file) =>
                file.endsWith(".js")
            );
            for (let file of commands) {
                let props = require(`../commands/${dir}/${file}`);

                if (!props.help || !props.run || !props.settings) {
                    table.addRow(file, `✘`);
                    continue;
                } else {
                    client.commands.set(props.help.name, props);
                    table.addRow(file, "✔");
                }
                if (
                    props.settings.aliases &&
                    Array.isArray(props.settings.aliases)
                )
                    props.settings.aliases.forEach((alias) => {
                        client.aliases.set(alias, props.help.name);
                    });
            }
        });

        console.log(table.toString());
    });
};
