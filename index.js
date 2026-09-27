const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
  PermissionFlagsBits,
} = require('discord.js');

const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const ALLOWED_USER_ID = '1254494074619297837';

if (!TOKEN || !CLIENT_ID) {
  throw new Error('Set DISCORD_TOKEN and DISCORD_CLIENT_ID environment variables.');
}

const command = new SlashCommandBuilder()
  .setName('dmall')
  .setDescription('Post a club announcement in the current channel.')
  .addStringOption((option) =>
    option
      .setName('message')
      .setDescription('The announcement to post')
      .setRequired(true),
  );

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  await rest.put(Routes.applicationCommands(CLIENT_ID), {
    body: [command.toJSON()],
  });
  console.log('Registered /dmall.');
})();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isChatInputCommand() || interaction.commandName !== 'dmall') {
    return;
  }

  if (interaction.user.id !== ALLOWED_USER_ID) {
    await interaction.reply({
      content: 'You are not authorized to use this command.',
      ephemeral: true,
    });
    return;
  }

  const message = interaction.options.getString('message', true);
  await interaction.reply({ content: 'Announcement posted.', ephemeral: true });
  await interaction.channel.send(`📣 **Club announcement**\n${message}`);
});

client.login(TOKEN);
