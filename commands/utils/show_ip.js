const { ip } = require('../../config.json');
const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ip')
		.setDescription('Display the server ip'),
	async execute(interaction) {
        interaction.reply(`The ip of the server is: \`\`\`${ip}\`\`\``); // Sent as copyable text
	},
};