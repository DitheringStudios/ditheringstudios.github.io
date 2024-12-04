const { REST, Routes } = require('discord.js');
const { clientId, token } = require('./config.json');

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started removing all application (/) commands.`);

        // Clear global commands
        await rest.put(Routes.applicationCommands(clientId), { body: [] });
        console.log('Successfully removed all global application (/) commands.');

    } catch (error) {
        console.error('Error removing commands:', error);
    }
})();
