const { DataTypes } = require('sequelize');
const { CAR } = require('../../constant/dataBaseTables.enum');
const { CARS } = require('../../constant/constants');

module.exports = (client) => {
    const Car = client.define(
        CAR,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            model: {
                type: DataTypes.STRING,
                allowNull: false
            },
            year: {
                type: DataTypes.INTEGER
            },
            price: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: CARS,
            timestamps: false
        }
    );
    return Car;
};
