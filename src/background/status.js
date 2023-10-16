const { Client, ActivityType } = require("discord.js");

module.exports = (client) => {

let status = [
    {
      name: "with chemistry",
      type: ActivityType.Playing,
    },
    {
      name: "it cook",
      type: ActivityType.Watching,
    },
    {
      name: "Jesse",
      type: ActivityType.Watching,
    },
    {
      name: "to the sounds of my meth lab",
      type: ActivityType.Listening,
    },
  ];

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 20000);

}