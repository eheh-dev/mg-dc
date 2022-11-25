const Discord = require("discord.js");
const {Client, Routes, GatewayIntentBits, ActivityType, EmbedBuilder} = require("discord.js");
const var_dump = require("var_dump");

const client = new Discord.Client({   
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates
  ] 
});

config = require('./config');
const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;

const {REST} = require("@discordjs/rest");
const rest = new REST({Version: '10'}).setToken(config.app.token)

const {commands, commandsDev} = require('./modules/commands');
const {actionsPlayer} = require("./modules/actions");
const {botReady, actionsInteraction} = require("./modules/interaction");

botReady(client);
actionsPlayer(client)
actionsInteraction(client)

async function registerFunctions() {
    commands
    try{
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(settings.clientID), { body: commands });
    
        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
}
registerFunctions();

client.login(config.app.token);