const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process");
const serverManager = require('../../serverManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Will show the coords of a specific player on the server')
		.addStringOption(option => option.setName('username')
        .setDescription('The player to find').setRequired(true)),
	async execute(interaction) {
		if (!serverManager.isRunning()){
			interaction.reply("Server is currently off");
			return;
		}
		let player = interaction.options.getString('username');
		let coords = await serverManager.findPlayer(player);
		console.log(coords)
		if(coords == `${player} not found in server`){
			interaction.reply(coords);
			return;
		}
		if(coords != "Error, please try again"){
			let dimension = await serverManager.getDimension(player);
			let output = `${player} is at ${coords} in ${dimension}`;
			output = output.trim();
			interaction.reply(output);
			return;
		}
        interaction.reply(coords);
	},
};