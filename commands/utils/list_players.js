const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('list')
		.setDescription('Will list the players on the server'),
	async execute(interaction) {
        exec(`tmux send-keys -t minecraft "list" C-m`, (error, stdout, stderr) => {
            if(error){
                if(error.message.indexOf("no server") != -1){
                    interaction.reply(`Cannot list players when server is off`);
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
            setTimeout(() => {
            exec('tmux capture-pane -t minecraft -p -S -1', (captureError, captureOutput, captureStderr) => {
                var index = captureOutput.indexOf("There are", captureOutput.length-60);
                var info = captureOutput.substring(index, captureOutput.length-3);
                info = info.replace("\n", "");
                interaction.reply(`${info.trim()}`);
            });
        }, 2000)
        });
	},
};