const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChannelType } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

require('dotenv').config();

client.on('ready', () => {
    console.log(`Bot is online as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!createpanel') {
        const embed = new EmbedBuilder()
            .setTitle('🌟 Support System')
            .setDescription(`
Welcome to our Support Center!

**Need assistance? We're here to help!**

Create a ticket for:
> 📝 General Support
> ⚡ Technical Issues
> 🔍 Questions & Inquiries

*URC is ready to assist you!* ✨
            `)
            .setColor('#5a048b')
            .setThumbnail(message.guild.iconURL())
            .setFooter({ text: 'Support Experience • URC Support', iconURL: message.guild.iconURL() })
            .setTimestamp();

const button = new ButtonBuilder()
    .setCustomId('create_ticket')
    .setLabel('Create Ticket')
    .setStyle(ButtonStyle.Primary)
    .setEmoji('💫');
        const row = new ActionRowBuilder()
            .addComponents(button);

        await message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;
    
    if (interaction.customId === 'create_ticket') {
        try {
            const ticketChannel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: process.env.TICKET_CATEGORY,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ['ViewChannel']
                    },
                    {
                        id: interaction.user.id,
                        allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory']
                    },
                    {
                        id: client.user.id,
                        allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'ManageChannels']
                    }
                ]
            });

            const closeButton = new ButtonBuilder()
                .setCustomId('close_ticket')
                .setLabel('Close Ticket')
                .setStyle(ButtonStyle.Danger)
                .setEmoji('🔒');

            const row = new ActionRowBuilder()
                .addComponents(closeButton);

            const welcomeEmbed = new EmbedBuilder()
                .setTitle('🌟 Welcome to Support!')
                .setDescription(`
Dear ${interaction.user},

**How can we assist you today?**

Please provide the following details:
> 📝 Describe your issue
> ⚡ Describe your case
> 🔍 Share any error messages /ss

*URC will respond as quickly as possible!*
💡 **Priority Support Available 24/7**
                `)
                .setColor('#5a048b')
                .setThumbnail(interaction.guild.iconURL())
                .setFooter({ text: 'Premium Support Experience • URC Support', iconURL: interaction.guild.iconURL() })
                .setTimestamp();

            await ticketChannel.send({
                embeds: [welcomeEmbed],
                components: [row]
            });

            const successEmbed = new EmbedBuilder()
                .setDescription(`✅ **Success!** Your ticket has been created: ${ticketChannel}`)
                .setColor('#5a048b');

            await interaction.reply({ 
                embeds: [successEmbed],
                ephemeral: true 
            });
            
        } catch (error) {
            console.error('Error details:', error);
            const errorEmbed = new EmbedBuilder()
                .setDescription('❌ **Error!** Failed to create ticket. Please try again.')
                .setColor('#5a048b');
            
            await interaction.reply({ 
                embeds: [errorEmbed],
                ephemeral: true 
            });
        }
    }

    if (interaction.customId === 'close_ticket') {
        const closeEmbed = new EmbedBuilder()
            .setDescription(`
🔒 **Closing this ticket in 5 seconds...**

*Thank you for using our support system!*

            `)
            .setColor('#5a048b')
            .setFooter({ text: 'URC Support System', iconURL: interaction.guild.iconURL() });
        
        await interaction.channel.send({ embeds: [closeEmbed] });
        
        setTimeout(() => {
            interaction.channel.delete();
        }, 5000);
    }
});

client.login(process.env.TOKEN);
