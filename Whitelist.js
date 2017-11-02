const Discord = require('discord.js'); // Loads the discord.js library.
const util = require('util'); // Loads the util module.
const bot = new Discord.Client();  // Loads up Tetunus's depression.
const prefix = ">"; //Defines the prefix for the bot.
const BlacklistedID = "someones blacklisted id"
const ID1 = "209111936929890305"
const ID2 = "201848192357236736"
const randomcolor = require('randomcolor');

var cooldownUsers = [];

const checkCooldown = ((userId) => {
  if(cooldownUsers.indexOf(userId) > -1) {
    return true;
  } else {
    return false;
  }
});

const removeCooldown = ((userId, timeInSeconds) => {
  let index = cooldownUsers.indexOf(userId);
  if(index > -1) {
    setTimeout(() => {
      cooldownUsers = cooldownUsers.splice(index, 0);
    }, timeInSeconds * 1000)
  }
});

// Command Handler Start

  bot.on('message', message => {
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    console.log (`[Whitelist Bot] [${message.author.username}] ${command}`); // Logs whenever a command is used and who used it ok thx


if (command === "wl") {
    let hwid = args.join(' ');
    let Whitelist = message.guild.roles.find("name", "Buyer");
    if (message.member.roles.has(Whitelist.id)) {
    if (message.author.id === CodyID) return message.reply("You have been blacklisted from this command").then(message.delete())
    if (hwid.length < 15) return message.reply('You need to provide a valid hwid.').then(message.delete())
    if (hwid.length > 50) return message.reply("You need to provide a valid hwid.").then(message.delete())
    if(checkCooldown(message.author.id)) {
       const fail2 = new Discord.RichEmbed(); // fail embed
      fail2.setColor(randomcolor())
      fail2.addField("Whitelist Bot - Incorrect Permissions" , "You may only use this command once, please contact admistrators if you need further support.") //desc.
      message.channel.sendEmbed(fail2).then(message.delete())
      return;
    }
    cooldownUsers.push(message.author.id);
    removeCooldown(message.author.id, 99999999999999999999999999999999999999999999999);
    bot.users.get(ID1).send("a user has sent in their whitelist request: " + hwid + " | Sent by: " + message.author.username);
    bot.users.get(ID2).send("a user has sent in their whitelist request: " + hwid + " | Sent by: " + message.author.username);
    const success = new Discord.RichEmbed(); // fail embed
    success.setColor(randomcolor())
    success.addField("Whitelist Bot - Whitelist Request" , "Thank you for submitting your whitelist request, we will whitelist you within a maximum of 24 hours.") //desc.
    message.channel.sendEmbed(success).then(message.delete())
  } else {
      const fail = new Discord.RichEmbed(); // fail embed
      fail.setColor(randomcolor())
      fail.addField("Whitelist Bot - Incorrect Permissions" , "You must have the role buyer.") //desc.
      message.channel.sendEmbed(fail)
  }
}

  });

bot.login("discord bot token")
