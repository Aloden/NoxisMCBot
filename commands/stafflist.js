const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stafflist')
		.setDescription('Envoie une liste de tout le staff'),
	async execute(interaction) {
		let client = interaction.client
    if(!interaction.member.roles.cache.find(r => r.id === client.respID)){
      let r = await interaction.reply({embeds: [client.noPerm]})
      setTimeout(() => {
        interaction.deleteReply()
      }, 3000)
      return
    }
    let descriptionString = "`Administrateurs\n`"
    let adminListe = interaction.guild.roles.resolve("966394652020326450").members.map(m=>m.user)
    let respListe = interaction.guild.roles.resolve("966711912958140457").members.map(m=>m.user)
    adminListe.forEach(admin => {
      descriptionString = descriptionString + `${admin.toString()}\n`
    })
    descriptionString = descriptionString + `\n \`Responsables\`\n`
    respListe.forEach(resp => {
      descriptionString = descriptionString + `${resp.toString()}\n`
    })
    interaction.reply(descriptionString)
	},
};