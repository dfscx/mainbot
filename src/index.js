const { Client, GatewayIntentBits, Partials } = require('discord.js');
const { token } = require('./botconfig.json');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
});

client.login(token);