require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");
const status = require("./background/status.js");
const walter = require("./background/walter.js");

let convoHistory = [{role: "system", content: "You are playing fictional character: Walter White/Heisenberg, you will respond to the following message in context with the character, act like you are this person, do not state their name before your reply."}]



const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('messageCreate', message => {
    if(message.channelId == process.env.CHANNELID && message.author.id != process.env.CLIENTID){
            const prompt = message.content;
            
            walter(client, prompt, convoHistory, message);

    } else {
        return;
    }
});

status(client);

client.login(process.env.TOKEN);

console.log("Bot is online!")