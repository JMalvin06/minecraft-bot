/*const { ip } = require('../../config.json');
const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('find')
		.setDescription('Find a specified player by username')
        .addStringOption(option => option.setName('username')
        .setDescription('The user to find').setRequired(true)),
	async execute(interaction) {
        console.log(interaction.options.getString('username'));
        const res = await fetch(`https://api.mojang.com/users/profiles/minecraft/${interaction.options.getString('username')}`);
        if(res.ok){
            const json = await res.json();
            const id = json["id"];
            console.log(id);
            //exec(`tmux ls`, (error, stdout, stderr) => {});
            await interaction.reply(JSON.stringify(json));
            return;
        } else {
            interaction.reply(`Unable to make API call`);
            return;
        }
        interaction.reply(`Did not fetch`);
	},
};*/