# Minecraft Server Discord Bot
A simple Discord bot for managing a Minecraft server.

## Usage
- ***Currently only works with Unix systems***
### Prerequisites
- [Node.js v22](https://nodejs.org/en/download/)
- You will need to host this bot on the same machine as your Minecraft server
- You may need to run ```chmod -x run.sh``` in your server directory to allow this bot to start your server

### Installation
1. Download the release unzip the file
2. run ```npm install discord.js``` to download the required dependencies
3. Create a config.json file in the minecraft_bot directory with the following parameters:
```json
// Contents of config.json.template
"token" : "BOT_TOKEN",
"clientId" : "APP_ID",
"guildId" : "SERVER_ID", // Discord server ID
"serverDirectory" : "SERVER_DIRECTORY", // Example: Documents/MCServerFolder
"ip" : "SERVER_IP",
"mapPort" : "BLUEMAP_PORT" // Only required if server is using BlueMap
```
4. Add the bot to your server (register through [Discord Developer Portal](https://discord.com/developers/applications))
5. Run ```node deploy-commands```
6. Run ```node index```