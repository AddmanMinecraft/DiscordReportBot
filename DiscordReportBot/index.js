const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const Commando = require('discord.js-commando');

let bottoken = botconfig.bottoken

//==========================================================================


const bot = new Discord.Client({disableEveryone: true});

const client = new Commando.Client({
  admin: '138492292594925568'
});

//==========================================================================
// Changing Status
function changing_status() {
  let status = ['Minecraft', 'Talking to people', 'Watching Chat', 'Creating Commands', 'Handleing Requests', 'Sleeping', 'Solving Questions', '>report @[username]']
  let random = status[Math.floor(Math.random() * status.length)]
  bot.user.setActivity(random)
}

bot.on("ready", () => {
  console.log('AresBot is online!');
  setInterval(changing_status, 20000);
})

//==========================================================================
// Member Count
client.on('guildMemberAdd', member => {
  member.guild.channels.get('577639899931475970').setName(`Total Users: ${member.guild.memberCount}`);
});

client.on('guildMemberRemove', member => {
  member.guild.channels.get('577639899931475970').setName(`Total Users: ${member.guild.memberCount}`);
});

//==========================================================================
// Defines 
bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let version = 'Current Version 0.1'

//==========================================================================
// Verify Command
  if (cmd === `${prefix}verify`) {

    let rUser = args[0];
    if (!rUser) return message.channel.send("**Usage:  >verify @username#0000 {PACKAGE}**");
    let rreason = args.join(" ");

    let verificationEmbed = new Discord.RichEmbed()
      .setDescription("Verification")
      .setColor("#15f153")
      .addField("Requester", `${rUser}`)
      //.addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Requested Rank", rreason);
      

    let reportschannel = message.guild.channels.find(`name`, "verification");
    if (!reportschannel) return message.channel.send("Couldn't find verification channel.");

    message.delete().catch(()=>{});
    reportschannel.send(verificationEmbed)
    
    .then(msg => {
    msg.react('✅')
    client.on('messageReactionAdd', (reaction, rUser) => {
      reaction.message.guild.member(rUser).addRole('570671712929054776');
    });
})

    return;
  }

//==========================================================================
// Botinfo Command
  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addBlankField(true)
    .setFooter(version);

    return message.channel.send(botembed);
  }
  
//==========================================================================
//Reports

//==========================================================================
// Rules Command
  if(cmd === `${prefix}rules`){
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Sorry you do not have permissions to preform this command!");

            let rules = new Discord.RichEmbed()
            .setTitle("-=( General Information )=-")
            .addField('» 1. General Info:\n', 'Welcome to AresPvP offical Discord server! When you join the server you have the option to join any any of our many servers')
            .addField('» 2. The Purpose of this Discord:\n', ' - The Purpose of this discord is to bring the community of AresPvP together and to notify you of upcomming events or changes accuring on the server. ')
            .setColor('#00FFFF');

            let rules2 = new Discord.RichEmbed()
            .setTitle("-=( AresPvp Rules and Regulations )=-")
            .addField('» 1. General discussion:\n', ' - Please keep chats to English only.\n - Do not use excessive caps.\n - Do not advertise other discords on the discord channels.\n - Do not send peoples personal information.\n - Do not joke about suicide.\n - Do not disrespect staff it will lead to a mute or ban!\n - Please try to keep chat Family friendly.')
            .addField('» 2. Channel specific:\n', ' - Do not play annoying music in the #music Channel.\n - Do not play music in any other channel other than #music unless everyone is ok with it.\n - Do not make annoying sounds in the voice chats!')
            .addField('» 3. User specific:\n', ' - Do not set an inappropriate name/avatar and playing title.\n - Do not bypass mutes or bans.\n - Do not scam other players.\n - Do not report people with the report bot for no reason.\n - Do not @ staff without a proper reason.\n - Staff impersonation is not allowed!')
            .setColor('#00FFFF')
            .setFooter("*Rules can be added and removed at any time. Punishments can include mutes, kicks, and bans if rules are contravened, and are decided by staff on a case by case basis.");

            let rules3 = new Discord.RichEmbed()
            .setTitle("-=( Other Important Information )=-")
            .addField('» 1. Server Ip:\n', ' - Server IP: play.arespvp.org:25589')
            .addField('» 2. Regarding Links and outside the server:\n', ' - We do not recommend clicking on links sent to you by other users, if you do, it is at your own risk and we cannot do anything about it.\n - We will not deal with anything outside of the server.')
            .addField('» 3. Regarding User Support:\n', 'Need to get into contact with a staff member about something? you can file a report on the forums or directly message one of our staffmembers.')
            .addField('» 4. Important Links:\n', ' - Forums: https://arespvp.org/\n - Store:  ')
            .setColor('#00FFFF');

            let ruleschannel = message.guild.channels.find(`name`, "rules");
            if (!ruleschannel) return message.channel.send("Couldn't find rules channel.");
            ruleschannel.send(rules);
            ruleschannel.send(rules2);
            ruleschannel.send(rules3);

            message.delete().catch(()=>{});
}});

//==========================================================================
// Chat Filter
client.on('message', message => {
  if (message.channel.type == "dm") return;
  if (message.member.hasPermission('ADMINISTRATOR')) return;
  const swearWords = ["cunt", "nigger", "nigga", "niga", "clit", "kys", "kill your self"];
  if (swearWords.some(word => message.content.toLowerCase().includes(word))) {
    message.delete();
    message.channel.send(`Hey ${message.author}! That word is not allowed here, please don't use it!`).then(m => m.delete(3000));
    embed = new Discord.RichEmbed()
    embed.setAuthor(name = `${message.author.tag}`, icon = message.author.avatarURL)
    embed.setDescription('Offensive or curse word found in message, in ' + message.channel)
    embed.setColor(0xff0000)
    embed.addField(name = "Message:", value = message.content)
    embed.setFooter(name = `ID: ${message.author.id}`)
    embed.setTimestamp()


    let logschannel = message.guild.channels.find(`name`, "logs");
    if (!logschannel) return message.channel.send("Couldn't find logs channel.");

    message.delete().catch(()=>{});
    logschannel.send(embed);
  }
});

    bot.login(bottoken);
    client.login(bottoken);