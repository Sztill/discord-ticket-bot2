const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('messageCreate', (message) => {
    if (message.content === '!announcement') {
        const announcementEmbed = new EmbedBuilder()
            .setTitle('🎯 Social Media Team Recruitment')
            .setDescription(`
We're looking for content creators! Join our media team!

**Requirements:**
• TikTok: 200+ followers
• Instagram: 200+ followers
• YouTube: 200+ subscribers

*Note: Higher follower counts = reduced weekly content requirements & extended license duration*

**Invite Rewards Program:**
• 3 invites = 1 day license
• 5 invites = 3 days license
• 10 invites = 7 days license
• 15 invites = 14 days license
• 25 invites = 30 days license

**Important Information:**
• Invites are tracked and cleared after reward claim
• Invited members must stay for minimum 24 hours
• Leaving the server will result in license removal/reduction
• All invites must be legitimate and active

Join our team and start creating! 🎥✨
━━━━━━━━━━━━━━━━━━━━━━━━
            `)
            .setColor('#5a048b')
            .setThumbnail(message.guild.iconURL())
            .setFooter({ text: 'URC Media Team', iconURL: message.guild.iconURL() })
            .setTimestamp();

        const applyButton = new ButtonBuilder()
            .setLabel('Apply Now')
            .setURL('https://discord.gg/sTJwFvn6VT')
            .setStyle(ButtonStyle.Link)
            .setEmoji('📝');

        const row = new ActionRowBuilder()
            .addComponents(applyButton);

        message.channel.send({
            embeds: [announcementEmbed],
            components: [row]
        });
    }
});

client.on('ready', () => {
    console.log(`Bot is online as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);
