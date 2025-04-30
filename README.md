# Minecraft Server Discord Bot
A simple Discord bot for managing a Minecraft server.

## Usage
**Currently only works with Unix systems** </br>
### Prerequisites
- [Node.js v22](https://nodejs.org/en/download/)
- You will need to host this bot on the same machine as the minecraft server

### Installation
1. Download the release unzip the file
2. Create a config.json file in the minecraft_bot directory with the following parameters:
```json
"token" : "BOT_TOKEN",
"clientId" : "APP_ID",
"guildId" : "SERVER_ID",
"serverDirectory" : "SERVER_DIRECTORY",
"ip" : "SERVER_IP",
"mapPort" : "BLUEMAP_PORT"
```
3. Add the bot to your server (register through [Discord Developer Portal](https://discord.com/developers/applications))
4. Run ```node deploy-commands```
5. Run ```node index```
