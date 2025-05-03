const { spawn, exec } = require("child_process");
const {serverDirectory, ip} = require('./config.json');
const { time } = require("console");

let serverProcess = null;
let timeEmpty = -1;
let stopTime = 900000;


function isRunning(){
    return serverProcess != null;
}

function ping(){
    return new Promise((resolve, reject) => { 
        exec(`nc -vz ${ip} 25565`, (error, stdout, stderr) => {
            if (error) 
                resolve(false);

              if(stderr)
                resolve(true);
        });
    });
}

async function isEmpty () {
    let players = await listPlayers();
    index = players.indexOf("There are");
    if (index != -1){
        if(players.indexOf(" 0 ") != -1){
            return true;
        } else {
            return false;
        }
    }
    return false;
}

function listPlayers() {
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
}

function stopServer() {
    if (!serverProcess){
        return false;
    }

    serverProcess.stdin.write("stop\n");
    return true;
}

function startServer() {
    if(serverProcess)
        return false;
    
    serverProcess = spawn('bash', ['-c', `cd ${serverDirectory} && ./run.sh`]);
    serverProcess.on('close', (code) => {
        console.log(`Minecraft server exited with code: ${code}`);
        serverProcess = null;
    });
    return true;
}

async function autoStop(interval){
    let isOnline = await ping();
    // If server is on
    if(serverProcess && isOnline){
        let empty = await isEmpty();
        if(empty){
            timeEmpty += interval;
            if(timeEmpty >= stopTime){
                stopServer();
            }
        } else {
            timeEmpty = 0;
        }
    }
    else
        timeEmpty = 0;
}


module.exports = {
    /**
     * Checks if server process is running
     * @returns true if server process currently alives
     */
    isRunning,

    /**
     * Spawns the server process and starts the server
     * @returns false if process already exists
     */
    startServer,

    /**
     * @returns false if server process does not exist
     */
    stopServer,

    /**
     * Sends a command to list the players in the server
     * @returns Response from server if server is on
     */
    listPlayers,

    /**
     * Finds the coordinates of a specific user on the server
     * @param {string} player Username
     * @returns coordinates of player as string
     */
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

    /**
     * Finds the current dimension of a specific user on the server
     * @param {string} player Username
     * @returns Dimension of player as string
     */
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
    },

    /**
     * Pings the server ip at port 25565
     * @returns true if successful
     */
    ping,

    /** 
     * Automatically shuts down the server after a certain amount of time
     */
    autoStop
}