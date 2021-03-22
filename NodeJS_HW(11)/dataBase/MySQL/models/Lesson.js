const { DataTypes } = require('sequelize');
const { LESSON } = require('../../../constant/constants');

module.exports = (client) => {
    const Lesson = client.define(
        LESSON,
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            date: {
                type: DataTypes.STRING
            },
            label: {
                type: DataTypes.STRING
            },
            student_count: {
                type: DataTypes.INTEGER,
            }
        },
        {
            tableName: LESSON,
            timestamps: false
        }
    );

    return Lesson;
};
