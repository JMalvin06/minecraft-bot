const { SlashCommandBuilder } = require('discord.js');
const {exec} = require("child_process")
const {serverDirectory} = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('start')
		.setDescription('Will start the minecraft server'),
	async execute(interaction) {
        exec(`tmux new-session -d -s minecraft "bash -c 'cd ${serverDirectory} && ./run.sh'"`, (error, stdout, stderr) => {
            if(error){
                if(error.message.indexOf("duplicate session: minecraft") != -1){
                    interaction.reply(`Server is already running`);
                    return;
                }
                console.log(`tmux error: ${error}`)
                interaction.reply(`Unknown error, try again..`);
                return;
            }
            if(stderr) {
                console.log(`sterr error: ${stderr}`);
                interaction.reply(`Unknown error, try again`);
                return;
            }
            interaction.reply(`Starting server...`);
        });
	},
};