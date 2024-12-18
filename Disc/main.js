const { Client, GatewayIntentBits } = require('discord.js');
const { DISCORD_TOKEN, GITHUB_TOKEN } = require('./config.json');
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
                    headers: { Authorization: `token ${GITHUB_TOKEN}` },
                }
            );
            return data.sha; // Returns the SHA if file exists
        } catch (error) {
            if (error.response?.status === 404) {
                console.log(`File not found on GitHub: ${repoPath}. Creating new file.`);
                return null; // File doesn't exist
            }
            throw error;
        }
    };

    try {
        const fileContent = fs.readFileSync(filePath, 'utf8'); // Read file
        const sha = await getSha(); // Get SHA if exists

        await axios.put(
            `https://api.github.com/repos/${OWNER}/${REPO}/contents/${repoPath}`,
            {
                message: commitMessage,
                content: Buffer.from(fileContent).toString('base64'), // Convert to Base64
                sha: sha || undefined, // Include SHA only if it exists
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

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('threadCreate', async (thread) => {
    try {
        const DevlogChannelId = '1289302843269845104';
        const MajorChannelID = 'null';

        if (String(thread.parent?.id) === DevlogChannelId) {
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

                const dirPath = '../Posts/post_images';
                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                let index = 1;
                for (const attachment of firstMessage.attachments.values()) {
                    const sanitizedThreadName = thread.name.replace(/[<>:"/\\|?*]/g, '_');
                    const fileName = `${sanitizedThreadName}${index}.png`;
                    const localPath = `${dirPath}/${fileName}`;
                    const repoPath = `Posts/post_images/${fileName}`;

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
                await writeToJson(existingData);

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
    })
    .catch((error) => {
        console.error('Error logging into Discord:', error.message);
    });
