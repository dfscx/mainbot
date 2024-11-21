const { Events } = require('discord.js');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) {
                return console.log(`Command ${interaction.commandName} not found`);
            }
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: 'There is an error in command',
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: 'There is an error in command',
                        ephemeral: true
                    });
                };
            };
        } else {
            return;
        };
    }
};