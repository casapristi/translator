const Command = require("../Classes/Command");
const { SlashCommandBuilder, messageLink } = require("@discordjs/builders");
const { languages } = require("@vitalets/google-translate-api");

module.exports = new Command({
  data: new SlashCommandBuilder()
    .setName("stream")
    .setDescription("To translate every messages of this channel to another one.")
    .addStringOption((option) => option
      .setName("language")
      .setDescription("The language you want to translate this channel in.")
      .setAutocomplete(true)
      .setRequired(true)
    )
    .addChannelOption((option) => option
      .setName("channel")
      .setDescription("The channel you want to stream (leave blank to select this channel).")
      .addChannelTypes(0)
      .setRequired(false)
    ),
  execute: async function(client, interaction, lang, db) {
    const channel = interaction.options.getChannel("channel") || interaction.channel;
    const language = interaction.options.getString("language");

    if (
      !Object.keys(languages)
        .filter((l) => typeof l === "string" && l !== "auto")
        .map((l) => l.toLowerCase())
        .includes(language.toLowerCase())
    ) return interaction.replyError({
      content: lang.ERROR_LANGUAGE,
      ephemeral: true
    });

    await interaction.reply({
      content: lang.CREATING_CHANNEL,
      ephemeral: true
    });

    interaction.guild.channels.create(
      {
        name: interaction.channel.name + "-" + language,
        parent: interaction.channel.parentId,
        type: 0,
        topic: lang.TOPIC
          .replace("%1", languages[language])
          .replace("%2", channel.toString())
      }
    )
    .then(async (channel) => {
      await interaction.editReply({
        content: lang.CREATED_CHANNEL.replace("%1", channel.toString()),
        ephemeral: true
      });

      channel.createWebhook({
        name: client.user.username,
        avatar: client.user.displayAvatarURL()
      })
      .catch(() => {
        interaction.editReplyError({
          content: lang.ERROR_WEBHOOK_CREATE,
          ephemeral: true
        });
      });
    })
    .catch(() => {
      interaction.editReplyError({
        content: lang.ERROR_CHANNEL_CREATE,
        ephemeral: true
      });
    });
  },
  autocomplete: async function(client, interaction, lang, db) {
    const query = interaction.options.getFocused();
    const filtered = Object.entries(languages)
      .filter(([_, name]) =>
        typeof name === "string" &&
        name !== "Automatic" &&
        name.toLowerCase().startsWith(query.toLowerCase())
      );

    await interaction.respond(
      filtered
        .slice(0, 25)
        .map(([value, name]) => ({ value, name }))
    );
  }
});