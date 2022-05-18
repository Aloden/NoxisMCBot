const { MessageEmbed, MessageActionRow, MessageButton, Guilds } = require("discord.js")
const mongoose = require("mongoose")
const inviteData = require("../templates/invites.js")

let a = 2
module.exports = {
	name: 'guildMemberAdd',
	once: false,
	async execute(member) {
		main(member)
	},
};

async function main(member) {
    let client = member.client
	let guild = member.guild

    let gInvites = await guild.invites.fetch({cache: false})

    let invite = gInvites.find((inv) => client.invites.get(inv.code).uses < inv.uses)
    let channel = guild.channels.cache.get("966398222719397948")
    if(!invite) return channel.send(`${member.toString()} a rejoint le serveur, mais je n'ai pas reussis a trouver par qui il ete inviter`)
    channel.send(`${member.toString()} a ete inviter par ${invite.inviter.toString()}`)
    client.invites = gInvites

    let inviterData = await inviteData.findOne({"userID": invite.inviter.id})

    if(!inviterData) {
        let newInviter = new inviteData({
            _id: mongoose.Types.ObjectId(),
            userID: invite.inviter.id,
            inviteList: []
        })
        await newInviter.save()
    }
    inviterData = await inviteData.findOne({"userID": invite.inviter.id})

    let filter = {'userID': invite.inviter.id}
    let changeList = inviterData.inviteList
    changeList.push(member.id)
    let change = {"inviteList": changeList}
    data = await inviteData.findOneAndUpdate(filter, change)
    let data2 = await inviteData.findOne(filter)
}
