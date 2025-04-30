const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process");
const serverManager = require('../../serverManager');
const {ip} = require('../../config.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping the server'),
	async execute(interaction) {
        let res = await serverManager.ping(); // Checks if server is online
        if(res){
            interaction.reply(`Successfully pinged ${ip} at port 25565`)
        } else {
            interaction.reply(`Could not ping ${ip} at port 25565`);
        }
        
	},
};