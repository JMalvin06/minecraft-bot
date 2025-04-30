const {ip,mapPort} = require('../../config.json');
const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Links the server map'),
	async execute(interaction) {
        interaction.reply(`[Map Link](https://${ip}:${mapPort})`); // Sent as hyperlink
	},
};