const Event = require("../Classes/Event");
const Language = require("../Languages/en.json");
const { QuickDB } = require("quick.db");
const Interaction = require("../Classes/Interaction");
const db = new QuickDB();

module.exports = new Event("interactionCreate", async function (client, interaction) {
  const data = await db.get(interaction.guildId);

  /** @type {Language} */
  const lang = require(`../Languages/${data?.langCode || "en"}.json`);

  interaction.replyError = function(options) {
    options.content = ":x: | " + options.content
    return interaction.reply(options);
  }

  interaction.editReplyError = function(options) {
    options.content = ":x: | " + options.content
    return interaction.editReply(options);
  }

  if (interaction.isCommand()) {
    client.commands.get(interaction.commandName)
      .execute(client, interaction, lang, db);
  } else if (interaction.isAutocomplete()) {
    client.commands.get(interaction.commandName)
      .autocomplete(client, interaction, lang, db);
  }
});