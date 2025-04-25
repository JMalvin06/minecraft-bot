const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('status')
		.setDescription('Will show status of the server'),
	async execute(interaction) {
        exec(`tmux ls`, (error, stdout, stderr) => {
            if(error){
                if(error.message.indexOf("no server") != -1){
                    interaction.reply(`Server is off`);
                } else{
                    console.log(`tmux error: ${error}`);
                    interaction.reply(`Unknown error, try again`);
                }
                return;
            }
            if(stderr) {
                console.log(`sterr error: ${stderr}`);
                interaction.reply(`Unknown error, try again`);
                return;
            }
            if(stdout.indexOf("minecraft") != -1)
                interaction.reply(`Server is on`);
            else 
                interaction.reply(`Server is off`);

        });
	},
};