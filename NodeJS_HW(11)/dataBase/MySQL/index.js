const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');

const { DB_PASSWORD, DB_USER } = require('../../configs/config');

module.exports = (() => {
    let instance;

    const initConnection = () => {
        const client = new Sequelize('sep-2020', DB_USER, DB_PASSWORD, { dialect: 'mysql' });

        const models = {};
        const modelsPath = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');

        const getModels = () => {
            fs.readdir(modelsPath, (err, files) => {
                files.forEach((file) => {
                    const [model] = file.split('.');
                    // eslint-disable-next-line import/no-dynamic-require
                    const modelFile = require(path.join(modelsPath, model));

                    models[model] = modelFile(client);
                });
            });
        };

        return {
            setModels: () => getModels(),
            getModel: (modelName) => models[modelName],
            transactionInstance: () => client.transaction()
        };
    };

    return {
        getInstance: () => {
            if (!instance) {
                instance = initConnection();
            }

            return instance;
        }
    };
})();
