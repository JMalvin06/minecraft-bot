const { spawn } = require("child_process");
const {serverDirectory} = require('./config.json');

let serverProcess = null;
module.exports = {
    isRunning: () => {
        return serverProcess != null;
    },

    startServer: () => {
        if(serverProcess)
            return false;
        
        serverProcess = spawn('bash', ['-c', `cd ${serverDirectory} && ./run.sh`]);
        serverProcess.on('close', (code) => {
            console.log(`Minecraft server exited with code: ${code}`);
            serverProcess = null;
        });
        return true;
    },

    stopServer: () => {
        if (!serverProcess){
            return false;
        }

        serverProcess.stdin.write("stop\n");
        return true;
    },

    listPlayers: () => {
        return new Promise((resolve, reject) => { 
            if(!serverProcess) {
                resolve("Server is currently off");
            }
            serverProcess.stdin.write("list\n");
            serverProcess.stdout.on('data', (data) => {
                index = data.toString().indexOf("There are");
                if(index == -1) {
                    resolve("Error, please try again");
                } else{
                    let output = data.toString().substring(index);
                    resolve(output);
                }
            });
    
            serverProcess.stderr.on('data', (data) => {
                reject(`Error: ${data}`)
            });
        })
    },

    findPlayer: (player) => {
        return new Promise((resolve, reject) => { 
            if(!serverProcess) {
                resolve("Server is currently off");
            }
            serverProcess.stdin.write(`execute as ${player} at ${player} run tp ~ ~ ~\n`);
            serverProcess.stdout.on('data', (data) => {
                if(data.toString().indexOf("No entity was found") != -1){
                    resolve(`${player} not found in server`);
                }
                index = data.toString().indexOf(`Teleported ${player} to `);
                if(index == -1) {
                    resolve("Error, please try again");
                } else{
                    let output = data.toString().substring(index + (`Teleported ${player} to `.length));
                    resolve(output);
                }
            });
    
            serverProcess.stderr.on('data', (data) => {
                reject(`Error: ${data}`)
            });
        })
    },

    getDimension: (player) => {
        
        return new Promise((resolve, reject) => { 
            if(!serverProcess) {
                resolve("Server is currently off");
            }
            serverProcess.stdin.write(`execute as ${player} at ${player} run data get entity @s Dimension\n`);
            serverProcess.stdout.on('data', (data) => {
                index = data.toString().indexOf(`${player} has the following entity data: `);
                if(index == -1) {
                    resolve("Error, please try again");
                } else{
                    let output = data.toString().substring(index + (`${player} has the following entity data: `.length));
                    resolve(output);
                }
            });
    
            serverProcess.stderr.on('data', (data) => {
                reject(`Error: ${data}`)
            });
        });
    }


}