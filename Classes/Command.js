const Discord = require("discord.js");
const Client = require("./Client");
const Interaction = require("./Interaction");
const Language = require("../Languages/en.json");
const { QuickDB } = require("quick.db");
const { SlashCommandBuilder } = require("@discordjs/builders");

/**
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @param {Language} lang
 * @param {QuickDB} db
 */
function ExecuteFunction(client, interaction, lang, db) {}

/**
 * @param {Client} client 
 * @param {Interaction} interaction 
 * @param {Language} lang
 * @param {QuickDB} db
 */
 function AutocompleteFunction(client, interaction, lang, db) {}

class Command {

  /**
   * @param {{
   * data: SlashCommandBuilder
   * execute: ExecuteFunction
   * autocomplete: AutocompleteFunction
   * }} param0 
   */
  constructor({ data, execute, autocomplete }) {
    this.data = data;
    this.execute = execute;
    this.autocomplete = autocomplete || function() {};
  }
}

module.exports = Command;