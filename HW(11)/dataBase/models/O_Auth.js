const { DataTypes } = require('sequelize');
const { O_AUTH } = require('../../constant/dataBaseTables.enum');

module.exports = (client) => {
    const O_Auth = client.define(
        O_AUTH,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            access_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            refresh_token: {
                type: DataTypes.STRING,
                allowNull: false
            },
            users_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                foreignKey: true
            }
        },
        {
            tableName: O_AUTH,
            timestamps: false
        }
    );

    return O_Auth;
};
