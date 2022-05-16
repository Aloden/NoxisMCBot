const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports = {
	name: 'interactionCreate',
	once: false,
	execute(interaction) {
		main(interaction)
	},
};
let choseRole = new MessageEmbed()
         .setColor('#cf8911')
let embed2 = new MessageEmbed()
		  .setColor('#cf8911')
let embed3 = new MessageEmbed()
		  .setColor('#cf8911')
let channelEmbed = new MessageEmbed()
  .setColor('#cf8911')
const Boutons = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('Close')
            .setLabel('🔒')
            .setStyle('SECONDARY'))

async function main(interaction) {
    let client = interaction.client
    
    if (interaction.isCommand()) {
	    if (!interaction.isCommand()) return;

	    let command = client.commands.get(interaction.commandName);
	    if (!command) return;

	    try {
		    await command.execute(interaction);
	    } catch (error) {
		    console.error(error);
		    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	    }
    } else if(interaction.isButton()) {
	  let staffRole = interaction.guild.roles.cache.find(r => r.id === client.staffID);
    let supportRole = interaction.guild.roles.cache.find(r => r.id === client.supportID)
	  let channel1 = interaction.guild.channels.cache.find(c => c.name === `enjeux-${interaction.user.username.toLowerCase()}`)
	  let channel2 = interaction.guild.channels.cache.find(c => c.name === `boutique-${interaction.user.username.toLowerCase()}`)
	  let channel3 = interaction.guild.channels.cache.find(c => c.name === `autre-${interaction.user.username.toLowerCase()}`)
    if(interaction.customId === "EnJeux") {
      channelEmbed.setDescription(`Merci d'avoir créer un **ticket en jeux** ${interaction.user.toString()}!\n \nPour une expérience rapide et agreable, veuillez indiquer ci-dessous:\n\n1. **Pseudo** du joueur concernés\n2. Votre pseudo **In-Game**\n3. **Raison** du ticket, accompagner de preuves si appliquable`)
		  if(channel1) {
			  embed3.setDescription(`\n**»**  ⛔ Vous avez deja un ticket ${channel1}`)
			  interaction.reply({embeds: [embed3]})
        setTimeout(() => {
				  interaction.deleteReply()
          console.log("channel deleted")
			  }, 5000)
        return;
		  }
      let ticketName = `enjeux-${interaction.user.username}`
		  let category = interaction.guild.channels.cache.get("970644209126211614")
      await interaction.guild.channels.create(ticketName, {
        type: "GUILD_TEXT",
      }).then(async c => {
			  c.setParent(category)
			  c.setTopic(interaction.user.id)
        c.send({embeds: [channelEmbed], components:[Boutons], content: supportRole.toString()})
			  embed2.setDescription(`\n**»** ✅ Ton ticket à bien été créer : ${c}`)
			  await interaction.reply({embeds: [embed2]})
			  await c.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true})
			  await c.permissionOverwrites.edit(staffRole.id, { VIEW_CHANNEL: true})
			  setTimeout(() => {
				  interaction.deleteReply()
          console.log("1")
			  }, 5000)
      })
    } else if(interaction.customId === "Boutique") {
      channelEmbed.setDescription(`Merci d'avoir créer un **ticket boutique** ${interaction.user.toString()}!\n \nPour une expérience rapide et agreable, veuillez indiquer ci-dessous:\n\n1. **Informations **concernant votre achat (Contenu, ID)\n2. Votre pseudo **In-Game**\n3. **Raison** du ticket, explication du probleme`)
      if(channel2) {
			  embed3.setDescription(`\n**»**  ⛔ Vous avez deja un ticket ${channel1}`)
			  await interaction.reply({embeds: [embed3]})
        setTimeout(() => {
				  interaction.deleteReply()
			  }, 5000)
        return;
		  }
		  let answer = await interaction.deferReply();
		  let ticketName = `boutique-${interaction.user.username}`
		  let category = interaction.guild.channels.cache.get("970644209126211614")
      await interaction.guild.channels.create(ticketName, {
        type: "GUILD_TEXT",
      }).then(async c => {
			  c.setParent(category)
			  c.setTopic(interaction.user.id)
        c.send({embeds: [channelEmbed], components:[Boutons], content: supportRole.toString()})
			  embed2.setDescription(`\n**»** ✅ Ton ticket à bien été créer : ${c}`)
			  await interaction.editReply({embeds: [embed2]})
			  await c.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true})
			  setTimeout(() => {
				  interaction.deleteReply()
			  }, 5000)
		  })
	  } else if(interaction.customId === "Autre") {
      channelEmbed.setDescription(`Merci d'avoir créer un **ticket** ${interaction.user.toString()}!\n \nPour une expérience rapide et agreable, veuillez indiquer ci-dessous:\n\n1. Une explication clair du probleme\n2. Votre pseudo **In-Game**`)
      if(channel3) {
			  embed3.setDescription(`\n**»**  ⛔ Vous avez deja un ticket ${channel1}`)
			  await interaction.reply({embeds: [embed3]})
        setTimeout(() => {
				  interaction.deleteReply()
			  }, 5000)
        return;
		  }
		  let answer = await interaction.deferReply();
		  let ticketName = `autre-${interaction.user.username}`
		  let category = interaction.guild.channels.cache.get("970644209126211614")
      await interaction.guild.channels.create(ticketName, {
        type: "GUILD_TEXT",
      }).then(async c => {
			c.setParent(category)
			  c.setTopic(interaction.user.id)
        c.send({embeds: [channelEmbed], components:[Boutons]})
			  embed2.setDescription(`\n**»** ✅ Ton ticket à bien été créer : ${c}`)
			  await interaction.editReply({embeds: [embed2]})
			  await c.permissionOverwrites.edit(interaction.user.id, { VIEW_CHANNEL: true})
			  await c.permissionOverwrites.edit(staffRole.id, { VIEW_CHANNEL: true})
		  })
      setTimeout(() => {
			  interaction.deleteReply()
		  }, 5000)
	  } else if(interaction.customId === 'Close') {
      client.commands.get("forceclose").execute(interaction)
    } else if(interaction.customId === 'staffrole') {
      if(interaction.member.roles.cache.find(c => c.id === staffRole.id)) {
        interaction.member.roles.remove(staffRole)
        choseRole.setDescription(`Vous n'avez plus le role ${staffRole}`)
        interaction.reply({embeds: [choseRole]})
      } else {
        interaction.member.roles.add(staffRole)
        choseRole.setDescription(`Vous avez reçu le role ${staffRole}`)
        interaction.reply({embeds: [choseRole]})
      }
      setTimeout(() => {
        interaction.deleteReply()
      }, 3000)
    } else if(interaction.customId === 'supportrole') {
      if(interaction.member.roles.cache.find(r => r.id === supportRole.id)) {
        interaction.member.roles.remove(supportRole)
        choseRole.setDescription(`Vous n'avez plus le role ${supportRole}`)
        interaction.reply({embeds: [choseRole]})
      } else {
        interaction.member.roles.add(supportRole)
        choseRole.setDescription(`Vous avez reçu le role ${supportRole}`)
        interaction.reply({embeds: [choseRole]})
      }
      setTimeout(() => {
        interaction.deleteReply()
      }, 3000)
    }
  }
}
