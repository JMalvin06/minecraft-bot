const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process");
const serverManager = require('../../serverManager');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Will show status of the server'),
	async execute(interaction) {
        if(serverManager.isRunning()){
            let pingRes = await serverManager.ping(); // Check if server is online
            if(pingRes){
                interaction.reply("Server is currently on");
            } else {
                interaction.reply(`Server is loading, please wait...`);
            }
        } else {
            interaction.reply("Server is currently off");
        }
	},
};