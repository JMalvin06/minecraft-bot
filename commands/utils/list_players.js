const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process");
const serverManager = require('../../serverManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Will list the players on the server'),
	async execute(interaction) {
		let timeout = new Promise((resolve) => setTimeout(() => resolve("Error, response timed out - Server is likely loading)"), 2000));
		let res = await Promise.race([timeout, serverManager.listPlayers()]);
        interaction.reply(res);
	},
};