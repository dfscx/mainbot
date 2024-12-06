const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('icon')
        .setDescription('Show the profile icon of a user')
        .addUserOption(option => option.setName('user').setDescription('Choose a user to show the icon').setRequired(true)),
    async execute(interaction) {
        const { options } = interaction;
        const user = options.getUser('user');
        const icon = await user.displayAvatarURL({ size: 256, dynamic: true });

        const embed = new EmbedBuilder()
            .setTitle(`${user.tag} profile icon`)
            .setColor('Blue')
            .setImage(icon);
        interaction.reply({ embeds: [embed] });
    }
}