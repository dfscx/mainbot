const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Get the member informations')
		.addUserOption(option => option.setName('tag').setDescription('Enter the member tag(@) to show his information').setRequired(true)),
	async execute(interaction) {
		try {
			const user = interaction.options.getUser('tag');
			const member = await interaction.guild.members.fetch(user.id);
			const userAvatar = user.displayAvatarURL({ size: 128 });
			const nick = member.displayName || 'None';
			const botStatus = user.bot ? 'Yes' : 'No';

			const embed = new EmbedBuilder()
				.setTitle(`@${user.tag}'s informations`)
				.setColor('Red')
				.setThumbnail(userAvatar)
				.setTimestamp()
				.setFooter({ text: `User ID: ${user.id}` })
				.addFields({ name: 'Joined Discord', value: `<t:${Math.floor(user.createdAt.getTime() / 1000)}:R>`, inline: true })
				.addFields({ name: 'Joined Server', value: `<t:${Math.floor(member.joinedAt.getTime() / 1000)}:R>`, inline: true })
				.addFields({ name: 'Nick', value: nick, inline: false })
				.addFields({ name: 'Booster', value: member.premiumSince ? 'Yes' : 'No' })
				.addFields({ name: 'Bot', value: botStatus, inline: false });
			await interaction.reply({ embeds: [embed] });
		} catch (error) {
			await interaction.reply({ content: 'An error ocurred while execute this command', ephemeral: true });
			console.error(error);
		};
	},
};