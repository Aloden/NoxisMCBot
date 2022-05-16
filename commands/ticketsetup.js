const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

const embed = new MessageEmbed()
	.setColor('#cf8911')
	.setAuthor({ name: 'NoxisMC - play.noxismc.phserv.net' })
	.setDescription('\nPour créer un nouveau ticket, **réagissez** avec le bouton qui correspond a votre demande.\n \n**» En Jeux :** Ouvre un ticket pour tous vos problèmes sur Noxis\n\n** » Boutique : **Ouvre un ticket pour tous vos problèmes en rapport avec la Boutique\n\n** » Autre : **Pour tout autres problèmes')
	.setFooter({ text: 'NoxisMC - play.noxismc.phserv.net' });
const Boutons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('EnJeux')
            .setLabel('🏹 En jeux')
            .setStyle('SECONDARY'), 
        new MessageButton()
            .setCustomId('Boutique')
            .setLabel('💳 Boutique ') 
            .setStyle('SECONDARY'),
        new MessageButton()
            .setCustomId('Autre')
            .setLabel('🔎 Autre')
            .setStyle('SECONDARY'),
    )
module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticketsetup')
		.setDescription('Setup les tickets')
  .setDefaultPermission(false),
	async execute(interaction) {
    let client = interaction.client
    if(!interaction.member.roles.cache.find(r => r.id === client.respID)){
      let r = await interaction.reply({embeds: [client.noPerm]})
      setTimeout(() => {
        interaction.deleteReply()
      }, 3000)
      return
    }
        let serverIcon = interaction.guild.iconURL()
        embed.setAuthor({ name: "Ouvrir un ticket d'aide", iconURL: serverIcon }).setThumbnail(serverIcon)
        //if(interaction.user.id !== "510829827880648741" || interaction.user.id !== "787706632489533460") return await interaction.reply("No perm")
        await interaction.channel.send({ embeds: [embed], components: [Boutons]})
	},
};