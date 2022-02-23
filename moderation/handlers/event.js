const { readdir, readdirSync } = require("fs");
const ascii = require("ascii-table");
let table = new ascii("Events");
table.setHeading("Event", "Load Status");

module.exports = (client) => {
    readdir(__dirname + "/../events/", (err, dirs) => {
        if (err) return console.log(err);
        dirs.forEach((dir) => {
            const events = readdirSync(__dirname + `/../events/${dir}`).filter(
                (file) => file.endsWith(".js")
            );

            for (let file of events) {
                const event = require(`../events/${dir}/${file}`);
                let eventName = file.replace(".js", "");
                table.addRow(eventName, "Ready");
                client.on(eventName, event.bind(null, client));
            }
        });
        console.log(table.toString());
    });
};
