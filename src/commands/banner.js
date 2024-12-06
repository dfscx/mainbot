const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { token } = require('../botconfig.json');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('banner')
        .setDescription('Show the profile banner of a user')
        .addUserOption(option => option.setName('user').setDescription('Choose a user to show the banner').setRequired(true)),
    execute(interaction) {
        const { options } = interaction;
        const user = options.getUser('user');

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: { Authorization: `Bot ${token}` },
        }).then((response) => {
            const { banner, accent_color } = response.data;

            if (banner) {
                const extension = banner.startsWith('a_') ? '.gif' : '.png';
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

                const embed = new EmbedBuilder()
                    .setTitle(`${user.tag} profile banner`)
                    .setColor('Aqua')
                    .setImage(url);
                interaction.reply({ embeds: [embed] });
            } else {
                if (accent_color) {
                    const embed = new EmbedBuilder().setDescription('The selected user havent banner').setColor(accent_color);
                    interaction.reply({ embeds: [embed], ephemeral: true });
                }
            }
        });
    }
}