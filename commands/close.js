const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('close')
		.setDescription('Ferme un ticket')
    .setDefaultPermission(false)
    .addStringOption(option =>
		  option.setName('message')
			  .setDescription('Le message de fermeture du ticket')
			  .setRequired(true)),
	async execute(interaction) {
    let user = interaction.client.users.cache.get(interaction.channel.topic)
		if(user) {
          let client = interaction.client
          if(!interaction.member.roles.cache.find(r => r.id === client.staffID)){
            let r = await interaction.reply({embeds: [client.noPerm]})
            setTimeout(() => {
              interaction.deleteReply()
            }, 3000)
            return
          }
          let serverIcon = interaction.guild.iconURL()
          
            let message = interaction.options.getString("message")
            let embed = new MessageEmbed()
                .setColor('#cf8911')
		            .setDescription('\n**»** ✅  Le salon va etre fermer...')
            let embed2 = new MessageEmbed()
                .setColor('#cf8911')
                .setDescription(`**»** ✅ Votre ticket a ete fermer par \*\*${interaction.user.username}\*\* \n\n  \*\*Note:\*\* \`${message}\``)
                .setAuthor({ name: "Ticket Fermer", iconURL: serverIcon })
            
            
            interaction.reply({ embeds: [embed]})
            setTimeout(() => {
              try {
                user.send({embeds:[embed2]})
              } catch (e) {
                return;
              }
              interaction.channel.delete()
            }, 3000)
        } else {
          let client = interaction.client
          let r = await interaction.reply({embeds: [client.wrongChannel]})
          setTimeout(() => {
            interaction.deleteReply()
          }, 3000)
        }
	},
};