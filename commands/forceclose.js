const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder()
		.setName('forceclose')
		.setDescription('Ferme un ticket de force')
    .setDefaultPermission(false),
	async execute(interaction) {
		if(interaction.channel.name.startsWith("enjeux") || interaction.channel.name.startsWith("boutique") || interaction.channel.name.startsWith("autre")) {
          let client = interaction.client
          if(!interaction.member.roles.cache.find(r => r.id === client.respID)){
            let r = await interaction.reply({embeds: [client.noPerm]})
            setTimeout(() => {
              interaction.deleteReply()
            }, 3000)
            return
          }
          let serverIcon = interaction.guild.iconURL()
            let embed = new MessageEmbed()
                .setColor('#cf8911')
		            .setDescription('\n**»** ✅  Le salon va etre fermer...')
            let embed2 = new MessageEmbed()
                .setColor('#cf8911')
                .setDescription(`**»** ✅ Votre ticket a ete fermer par \*\*${interaction.user.username}\*\*`)
                .setAuthor({ name: "Ticket Fermer", iconURL: serverIcon })
            let user = interaction.client.users.cache.get(interaction.channel.topic)
            interaction.reply({ embeds: [embed]})
            setTimeout(() => {
              try {
                user.send({embeds:[embed2]})
              } catch (e) {
                return;
              }
              interaction.channel.delete()
            }, 1)
        } else {
          let client = interaction.client
          let r = await interaction.reply({embeds: [client.wrongChannel]})
          setTimeout(() => {
            interaction.deleteReply()
          }, 3000)
        }
	},
};