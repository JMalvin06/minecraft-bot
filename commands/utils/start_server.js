const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")
const serverManager = require("../../serverManager");


module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Will start the minecraft server'),
	async execute(interaction) {
        if(serverManager.startServer()){
            interaction.reply("Starting server..");
        } else {
            interaction.reply("Server already started");
        }
	},
};