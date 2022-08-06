const Discord = require("discord.js");

class Interaction extends Discord.CommandInteraction {
  constructor() {
    super();

    this.replyError = this.reply;
    this.editReplyError = this.editReply;
  }
}

module.exports = Interaction;