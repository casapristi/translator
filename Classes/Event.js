const Discord = require("discord.js");
const Client = require("./Client");

/**
 * @template {keyof Discord.ClientEvents} K
 * @param {Client} client 
 * @param {Discord.ClientEvents[K]} eventArgs
 */
function ExecuteFunction(client, ...eventArgs) {}

/**
 * @template {keyof Discord.ClientEvents} K
 */
class Event {

  /**
   * @param {K} event 
   * @param {ExecuteFunction<K>} executeFunction 
   */
  constructor(event, executeFunction) {
    this.event = event;
    this.execute = executeFunction;
  }
}

module.exports = Event;