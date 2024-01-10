
// timestamp.js
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
      .setName('time')
      .setDescription('Get the current timestamp'),
  async execute(interaction) {
      const date = new Date();
      const timestamp = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' ' + date.getFullYear();
      await interaction.reply(timestamp);
  },
};


