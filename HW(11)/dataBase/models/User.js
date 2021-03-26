const { DataTypes } = require('sequelize');
const { USER } = require('../../constant/dataBaseTables.enum');
const { USERS } = require('../../constant/constants');

module.exports = (client) => {
    const User = client.define(
        USER,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            age: {
                type: DataTypes.INTEGER,
            },
            avatar: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
        },
        {
            tableName: USERS,
            timestamps: false
        }
    );
    const O_Auth = require('./O_Auth')(client);

    User.hasMany(O_Auth, {
        foreignKey: 'users_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    });

    return User;
};
