// dmchannel.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
 data: new SlashCommandBuilder()
     .setName('dmchannel')
     .setDescription('DM a message to a specific channel')
     .addStringOption(option =>
         option.setName('message')
             .setDescription('The message to send')
             .setRequired(true))
     .addStringOption(option =>
         option.setName('channel')
             .setDescription('The channel to send the message to')
             .setRequired(true)),
 async execute(interaction) {
     const message = interaction.options.getString('message');
     const channelName = interaction.options.getString('channel');

     const targetChannel = interaction.guild.channels.cache.find(channel => channel.name === channelName);
     if (!targetChannel) {
         await interaction.reply('Channel not found.');
         return;
     }

     try {
         await targetChannel.send(message);
         await interaction.reply('Message sent successfully.');
     } catch (error) {
         console.error(error);
         await interaction.reply('Failed to send message.');
     }
 },
};
