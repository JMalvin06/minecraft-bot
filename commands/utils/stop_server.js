const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Will stop the minecraft server'),
	async execute(interaction) {

        exec(`tmux send-keys -t minecraft "stop" C-m`, (error, stdout, stderr) => {
            if(error){
                if(error.message.indexOf("no server") != -1){
                    interaction.reply(`Server is already off`);
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
            interaction.reply(`Stopping server...`);
        });
	},
};