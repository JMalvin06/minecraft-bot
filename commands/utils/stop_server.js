const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")
const serverManager = require("../../serverManager");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Will stop the minecraft server'),
	async execute(interaction) {
        if(serverManager.stopServer()){
            interaction.reply("Stopping server..");
        } else {
            interaction.reply("Server already off");
        }
	},
};