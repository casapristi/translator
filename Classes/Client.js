const Discord = require("discord.js");
const Command = require("./Command");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");

class Client extends Discord.Client {
  constructor() {
    const intents = [
      Discord.IntentsBitField.Flags.Guilds,
      Discord.IntentsBitField.Flags.GuildWebhooks
    ]

    super({ intents });

    /** @type {Discord.Collection<string, Command>} */
    this.commands = new Discord.Collection();
  }

  start(token) {
    const rest = new REST({ version: "9" }).setToken(token);
    this.login(token);

    const commandFiles = fs.readdirSync("./Commands");
    const eventFiles = fs.readdirSync("./Events");

    for (const file of commandFiles) {
      const command = require(`../Commands/${file}`);
      this.commands.set(command.data.name, command);
    }

    for (const file of eventFiles) {
      const { event, execute } = require(`../Events/${file}`);
      this.on(event, (...args) => execute(this, ...args));
    }

    this.once("ready", async (client) => {
      console.log(`Logged in as ${client.user.tag}`);

      await rest.put(
        Routes.applicationGuildCommands(client.user.id, "973949535359475814"),
        {
          body: this.commands.toJSON().map((command) => command.data)
        }
      );
    });
  }
}

module.exports = Client;