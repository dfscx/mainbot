const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token } = require('./botconfig.json');

const { getEvents } = require('./handlers/eventHandler');
const { getCommands } = require('./handlers/commandHandler');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
});

client.commands = new Collection();

client.login(token).then(() => {
    getEvents(client);
    getCommands(client);
});