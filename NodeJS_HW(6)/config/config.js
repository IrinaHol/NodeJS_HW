module.exports = {
    PORT: 5000,
    MONGO_DB: process.env.MONGO_URL || 'mongodb://localhost:27017/users',
    JWT_SECRET: process.env.JWT_SECRET || 'SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET'
};
