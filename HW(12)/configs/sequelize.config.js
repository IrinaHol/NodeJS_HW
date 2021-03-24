const { DB_PASSWORD, DB_USER } = require('./config');

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: 'hw_nodejs',
        host: '127.0.0.1',
        dialect: 'mysql'
    }
};
