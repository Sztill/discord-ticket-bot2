const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, Permissions } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.MessageContent
    ] 
});

client.on('ready', () => {
    console.log(`✅ Verification bot is online as ${client.user.tag}!`);
});

client.on('messageCreate', (message) => {
    console.log(`Received message: ${message.content}`); // Debug log
    
    if (message.content === '!createverify') {
        console.log('Command detected!'); // Debug log
        
        const verifyEmbed = new EmbedBuilder()
            .setTitle('✨ Server Verification')
            .setDescription(`
Welcome to our server!

**To gain access, please verify yourself**

> 🔐 Click the button below to verify
> ⚡ You will be redirected to secure verification page
> 🌟 After verification, you'll get access automatically

━━━━━━━━━━━━━━━━━━━━━━━━
            `)
            .setColor('#5a048b')
            .setThumbnail(message.guild.iconURL())
            .setFooter({ text: 'URC Verification System', iconURL: message.guild.iconURL() })
            .setTimestamp();

        const verifyButton = new ButtonBuilder()
            .setLabel('Verify Here')
            .setURL('https://restorecord.com/verify/URC%20Verify')
            .setStyle(ButtonStyle.Link)
            .setEmoji('✅');

        const row = new ActionRowBuilder()
            .addComponents(verifyButton);

        message.channel.send({
            embeds: [verifyEmbed],
            components: [row]
        }).then(() => {
            console.log('Verification panel sent successfully!'); // Debug log
        }).catch(error => {
            console.error('Error sending panel:', error); // Debug log
        });
    }
});

client.login(process.env.TOKEN);
