const {ip,mapPort} = require('../../config.json');
const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('map')
		.setDescription('Links the server map'),
	async execute(interaction) {
        interaction.reply(`[Map Link](http://${ip}:${mapPort}/#world:-48:0:-32:1500:0:0:0:0:perspective)`); // Sent as hyperlink
	},
};