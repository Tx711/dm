// Import necessary modules
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.commands = new Collection();
const commandFiles = readdirSync(join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
   const command = require(join(__dirname, 'commands', `${file}`));
   client.commands.set(command.data.name, command);
}

client.once('ready', async () => {
   console.log('Bot is online!');

   const commandData = Array.from(client.commands.values()).map(cmd => cmd.data.toJSON());
   await client.guilds.cache.get('1118594802129317979').commands.set(commandData);
});

client.on('interactionCreate', async interaction => {
   if (!interaction.isCommand()) return;

   const command = client.commands.get(interaction.commandName);

   if (!command) return;

   try {
       await command.execute(interaction);
   } catch (error) {
       console.error(error);
       await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
   }
});

// Start the bot
client.login(process.env.BOT_TOKEN);
