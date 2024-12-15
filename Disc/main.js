const { Client, GatewayIntentBits} = require('discord.js');
const { DISCORD_TOKEN } = require('./config.json');
const { GITHUB_TOKEN } = require('./config');
const fs = require('fs');
const axios = require('axios');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const OWNER = 'DitheringStudios';
const REPO = 'ditheringstudios.github.io';
const BRANCH = 'main';

const commitFileToGitHub = async (filePath, repoPath, commitMessage) => {
    const getSha = async () => {
        try {
            const { data } = await axios.get(
                `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
                {
                    headers: { Authorization: `token (GITHUB_TOKEN}` },
                }
            );
            return data.sha;
        } catch (error) {
            if (error.response?.status === 404) return null;
            throw error;
        }
    };
    try {
        const fileContent = fs.readFileSync(filePath);
        const sha = await getSha();

        await axios.put(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
            {
                message: commitMessage,
                content: fileContent.toString('base64'),
                sha: sha,
                branch: BRANCH,
            },
            {
                headers: { Authorization: `token ${GITHUB_TOKEN}` },
            }
        );

        console.log(`Committed ${repoPath} successfully.`);
    } catch (error) {
        console.error(`Error committing ${repoPath}:`, error.response?.data || error.message);
    }
};

const getSha = async () => {
    try {
        const { data } = await axios.get(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
            {
                headers: { Authorization: `token ${GITHUB_TOKEN}` },
            }
        );
        return data.sha;
    } catch (error) {
        if (error.response?.status === 404) return null;
        throw error;
    }
};

const writeToJson = async (data, fileName = '../Posts/posts.json') => {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(fileName, jsonData, 'utf8');

    const repoPath = 'Posts/posts.json';
    const commitMessage = 'New Post Added';
    await commitFileToGitHub(fileName, repoPath, commitMessage);
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
        if (String(thread.parent?.id) === DevlogChannelId)
            console.log(`New forum post detected: ${thread.name}`);

        const messages = await thread.messages.fetch({ limit: 1 });
        const firstMessage = messages.first();

        if (firstMessage) {
            const existingData = readFromJson();
            const lastDevLog = existingData.find(post => post.devlog);
            const nextDevLogNumber = lastDevLog
                ? parseInt(lastDevLog.title.match(/DevLog #(\d+)/)?.[1] || 0) + 1
                : 1;

            const post = {
                date: thread.name,
                title: `DevLog #${nextDevLogNumber}`,
                content: firstMessage.content || 'No content',
                devlog: true,
                major: false,
                images: firstMessage.attachments.size,
                image_url: [],
                imageText: [],
            };

            let index = 1;
            for (const attachment of firstMessage.attachments.values()) {
                const fileName = `${thread.name}.${index}`;
                const localPath = `../All_Game_Previews/post_images/`;
                const repoPath = `All_Game_Previews/post_images/`;

                try {
                    const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
                    fs.writeFileSync(localPath, response.data);
                    const commitMessage = `Add image: ${fileName}`;
                    await commitFileToGitHub(localPath, repoPath, commitMessage);
                    post.image_url.push(`/${repoPath}`);
                    post.imageText.push(fileName);
                    index++;
                } catch (error) {
                    console.error(`Error processing image ${fileName}:`, error.message);
                }
            }

            existingData.unshift(post);
            writeToJson(existingData);

            console.log('Post saved to JSON file:', post);
        }
        else if (String(thread.parent?.id) === MajorChannelID) {
            console.log(`New forum post detected: ${thread.name}`);

            const messages = await thread.messages.fetch({ limit: 1 });
            const firstMessage = messages.first();

            if (firstMessage) {
                const existingData = readFromJson();
                const lastDevLog = existingData.find(post => post.major);
                const nextDevLogNumber = lastDevLog
                    ? parseInt(lastDevLog.title.match(/Major #(\d+)/)?.[1] || 0) + 1
                    : 1;

                const post = {
                    date: thread.name,
                    title: `Major #${nextDevLogNumber}!`,
                    content: firstMessage.content || 'No content',
                    devlog: false,
                    major: true,
                    images: firstMessage.attachments.size,
                    image_url: [],
                    imageText: [],
                };

                let index = 1;
                for (const attachment of firstMessage.attachments.values()) {
                    const fileName = `${thread.name}.${index}`;
                    const localPath = `../All_Game_Previews/post_images/`;
                    const repoPath = `All_Game_Previews/post_images/`;

                    try {
                        const response = await axios.get(attachment.url, { responseType: 'arraybuffer' });
                        fs.writeFileSync(localPath, response.data);
                        const commitMessage = `Add image: ${fileName}`;
                        await commitFileToGitHub(localPath, repoPath, commitMessage);
                        post.image_url.push(`/${repoPath}`);
                        post.imageText.push(fileName);
                        index++;
                    } catch (error) {
                        console.error(`Error processing image ${fileName}:`, error.message);
                    }
                }

                existingData.unshift(post);
                writeToJson(existingData);

                console.log('Post saved to JSON file:', post);
            }
        }

    } catch (error) {
        console.error('Error processing new forum post:', error);
    }
});
client.login(DISCORD_TOKEN)
    .then(() => {
        console.log('Bot logged in and ready.');
    });