// const { Sequelize, dataTypes } = require('sequelize');
// const path = require('path');
// const fs = require('fs');
//
// module.exports = () => {
//     let instance;
//
//     const initConnection = () => {
//         const client = new Sequelize('sep-2020', 'root', 'irina1995', { dialect: 'mysql' });
//         const models = {};
//         const pathModels = path.join(process.cwd(), 'dataBase', 'MySQL', 'models');
//
//         const getModels = () => {
//             fs.readdir(pathModels, (err, files) => {
//                 files.forEach((file) => {
//                     const [model] = file.split('.');
//
//                     const modelFile = require(path.join(pathModels, model));
//                     models[model] = modelFile(client, dataTypes);
//                 });
//             });
//         };
//     };
//
//     return {
//         getInstance: () => {
//             if (!instance) {
//                 instance = initConnection();
//             }
//             return instance;
//         }
//     };
// };
