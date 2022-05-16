const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs')
const { cId, gId } = require("./config.json")
const token = process.env["token"]
const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
console.log(commandFiles)

commandFiles.forEach(i => {
    let command = require(`./commands/${i}`);
    
    commands.push(command.data.toJSON());
})

console.log(commands)

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(cId, gId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);