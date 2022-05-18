const fs = require('node:fs');
const { Client, Collection, Intents, MessageEmbed, Permissions, ReactionCollector, MessageButton, MessageActionRow, Guilds } = require('discord.js');

const { cId, gId, token, mongo } = require("./config.json")
const mongoose = require("mongoose")

mongoose.connect(mongo, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('error', console.log)

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

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

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
