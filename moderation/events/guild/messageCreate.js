const settings = require("../../settings/bot.json");

let talkedRecently = new Set();

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(settings.prefix)) return;
    if (!message.guild) return;

    if (talkedRecently.has(message.author.id))
        return message.channel.send("**Komutları çok hızlı kullanıyorsun!**");

    let command = message.content.split(" ")[0].slice(settings.prefix.length);
    let args = message.content.split(" ").slice(1);

    let cmd;
    if (client.commands.has(command)) cmd = client.commands.get(command);
    else if (client.aliases.has(command))
        cmd = client.commands.get(client.aliases.get(command));

    if (!cmd) return;

    let cmdName = cmd.help.name;

    if (message.author.id != settings.owner)
        talkedRecently.add(message.author.id);

    setTimeout(() => {
        talkedRecently.delete(message.author.id);
    }, 1500);

    if (!cmd.settings.enabled && message.author.id != settings.owner)
        return message.channel.send(
            `:x: **${cmdName}** isimli komut geçici olarak kullanıma kapalıdır!`
        );

    if (cmd.settings.onlyOwner && message.author.id !== settings.owner)
        return message.channel.send(
            `:x: **${cmdName}** isimli komutu sadece bot sahibi kullanabilir.`
        );

    if (
        message.guild &&
        cmd.settings.perm &&
        !message.member.permissions.has(cmd.settings.perm)
    )
        return message.channel.send(
            `:x: **${cmdName}** isimli komutu kullanmak için \`${cmd.settings.perm}\` yetkisine sahip olmalısın!.`
        );

    cmd.run(client, message, args);
};
