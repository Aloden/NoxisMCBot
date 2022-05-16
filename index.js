
const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed, Permissions, ReactionCollector, MessageButton, MessageActionRow } = require('discord.js');

const { cId, gId } = require("./config.json")
const token = process.env["token"]
fsdfdsfds
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(token);
client.cId = cId
client.gId = gId
client.staffID = "966724286071054396"
client.respID = "966711912958140457"
client.supportID = "970646777969659914"

client.noPerm = new MessageEmbed()
		  .setColor('#cf8911')
      .setDescription(`\n**»**  ⛔ Vous n'avez pas la permission d'executer cette commande`)
client.wrongChannel = new MessageEmbed()
      .setColor('#cf8911')
      .setDescription(`\n**»**  ⛔ Cette commande ne peux etre executer sur ce channel`)
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

client.on("messageCreate", async(message) => {
  console.log(message.content)
})

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}