const { REST, Routes } = require('discord.js');
const { token, id } = require('./botconfig.json');
const { guildId } = require('./guildconfig.json');

const fs = require('node:fs');
const path = require('node:path');
const commands = [];

const commandsPath = path.join(__dirname, 'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
    } else {
        console.log(`The command in ${filePath} in left the 'data' or 'execute' propertie`);
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Loading ${commands.length} application commands`);
        const data = await rest.put(
            Routes.applicationGuildCommands(id, guildId),
            { body: commands },
        );
        console.log(`${data.length} commands loaded`);
    } catch (error) {
        console.error(error);
    }
})();