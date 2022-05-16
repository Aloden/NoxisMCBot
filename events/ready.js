const permissions = [
	{
		id: '966724286071054396',
		type: 'ROLE',
		permission: true,
    defaultPermission: false,
	},
];

module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};