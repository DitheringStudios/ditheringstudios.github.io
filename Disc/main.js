const { Client, GatewayIntentBits, SlashCommandBuilder } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const writeToJson = (data, fileName = '../Posts/posts.json') => {
    const jsonData = JSON.stringify(data, null, 2); // Format the JSON
    fs.writeFileSync(fileName, jsonData, 'utf8');
};

const readFromJson = (fileName = '../Posts/posts.json') => {
    if (!fs.existsSync(fileName)) return [];
    const rawData = fs.readFileSync(fileName, 'utf8');
    return JSON.parse(rawData);
};

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


client.on('threadCreate', async (thread) => {
    try {
        const DevlogChannelId = '1289302843269845104';
        const MajorChannelID = 'null';
        if (toString(thread.parent?.id) === DevlogChannelId)

        console.log(`New forum post detected: ${thread.name}`);

        const messages = await thread.messages.fetch({ limit: 1 });
        const firstMessage = messages.first();

        if (firstMessage) {
            const existingData = readFromJson();
            const lastDevLog = existingData.find(post => post.devlog);
            const nextDevLogNumber = lastDevLog
                ? parseInt(lastDevLog.title.match(/DevLog #(\d+)/)?.[1] || 0) + 1
                : 1;

            // Prepare the post data
            const post = {
                date: thread.name, // Forum title as the date
                title: `DevLog #${nextDevLogNumber}`,
                content: firstMessage.content || 'No content',
                devlog: true,
                major: false,
                images: firstMessage.attachments.size,
                image_url: [],
                imageText: [],
            };

            let index = 1;
            firstMessage.attachments.forEach((attachment) => {
                const fileName = `${thread.name}.${index}`;
                post.image_url.push(`/Web/All_Game_Previews/${fileName}`);
                post.imageText.push(fileName);
                index++;
            });

            existingData.unshift(post);
            writeToJson(existingData);

            console.log('Post saved to JSON file:', post);
        }
        else if (toString(thread.parent?.id) === MajorChannelID) {
            console.log(`New forum post detected: ${thread.name}`);

            const messages = await thread.messages.fetch({ limit: 1 });
            const firstMessage = messages.first();

            if (firstMessage) {
                const existingData = readFromJson();
                const lastDevLog = existingData.find(post => post.major);
                const nextDevLogNumber = lastDevLog
                    ? parseInt(lastDevLog.title.match(/DevLog #(\d+)/)?.[1] || 0) + 1
                    : 1;

                // Prepare the post data
                const post = {
                    date: thread.name, // Forum title as the date
                    title: `Major #${nextDevLogNumber}!`,
                    content: firstMessage.content || 'No content',
                    devlog: false,
                    major: true,
                    images: firstMessage.attachments.size,
                    image_url: [],
                    imageText: [],
                };

                let index = 1;
                firstMessage.attachments.forEach((attachment) => {
                    const fileName = `${thread.name}.${index}`;
                    post.image_url.push(`/Web/All_Game_Previews/${fileName}`);
                    post.imageText.push(fileName);
                    index++;
                });

                existingData.unshift(post);
                writeToJson(existingData);

                console.log('Post saved to JSON file:', post);
            }
        }

    } catch (error) {
        console.error('Error processing new forum post:', error);
    }
});
client.login(token)
    .then(() => {
        console.log('Bot logged in and ready.');
    });