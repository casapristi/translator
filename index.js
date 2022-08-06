require("dotenv").config();
const Client = require("./Classes/Client");

const client = new Client();
client.start(process.env.TOKEN);