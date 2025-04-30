const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process");
const serverManager = require('../../serverManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Will list the players on the server'),
	async execute(interaction) {
        interaction.reply(await serverManager.listPlayers());
	},
};