const cron = require('node-cron');

const deleteOldTokens = require('./delete-old-tokens');

module.exports = () => {
    try {
        cron.schedule('0 0 1 * *', async () => {
            console.log(`${new Date().toISOString()}: jobs started`);
            await deleteOldTokens();
            console.log(`${new Date().toISOString()}: jobs finished`);
        });
    } catch (e) {
        console.log(e);
    }
};
