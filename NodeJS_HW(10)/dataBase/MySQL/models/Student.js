const { DataTypes } = require('sequelize');

module.exports = (client) => {
    const Student = client.define(
        'Student',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            age: {
                type: DataTypes.INTEGER
            },
            gender: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            tableName: 'students',
            timestamps: false
        }
    );

    return Student;
};
