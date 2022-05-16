const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
const embed = new MessageEmbed()
	.setColor('#cf8911')
	.setAuthor({ name: 'NoxisMC - play.noxismc.phserv.net' })
	.setFooter({ text: 'NoxisMC - play.noxismc.phserv.net - Staff' });
const Buttons = new MessageActionRow()
   .addComponents(
     new MessageButton()
       .setLabel('Staff')
       .setCustomId('staffrole')
       .setStyle('SECONDARY'),
     new MessageButton()
       .setLabel('Support')
       .setCustomId('supportrole')
       .setStyle('SECONDARY'), 
     new MessageButton()
       .setLabel('Reports')
       .setCustomId('reportrole')
       .setStyle('SECONDARY')
       .setDisabled(true)
   )
module.exports = {
	data: new SlashCommandBuilder()
		.setName('staffchoose')
		.setDescription('setup le choix de role du staff'),
	async execute(interaction) {
		main(interaction)
	},
};

async function main(interaction) {
  let client = interaction.client
  let supportRole = interaction.guild.roles.cache.find(r => r.id === client.supportID)
  let staffRole = interaction.guild.roles.cache.find(r => r.id === client.staffID)
  embed.setDescription(`\nPour vous assignez différents roles, veuillez réagir avec le/les role(s) correspondant\n \n**» Staff :** Donne accès aux tickets **En Jeux** et **Autres**, salons de sanctions et le staff chat - ${staffRole}\n\n** » Support : **Donne le role qui se fait ping à la création d\'un ticket - ${supportRole}\n\n** » Reports : **Donne le role qui se fait ping lors d\'un report **In-Game**`)
  let serverIcon = interaction.guild.iconURL()
  embed.setAuthor({ name: "NoxisMC - Choix de role Staff", iconURL: serverIcon })
  interaction.channel.send({embeds: [embed], components: [Buttons]})
  interaction.deferReply()
  interaction.deleteReply()
}