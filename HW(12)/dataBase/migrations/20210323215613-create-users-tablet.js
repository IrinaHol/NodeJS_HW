const { USERS } = require('../../constant/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */ await queryInterface.createTable(
            USERS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                age: {
                    type: Sequelize.DataTypes.INTEGER
                },
                avatar: {
                    type: Sequelize.DataTypes.STRING
                },
                name: {
                    type: Sequelize.DataTypes.STRING
                },
                gender: {
                    type: Sequelize.DataTypes.STRING
                },
                email: {
                    type: Sequelize.DataTypes.STRING
                },
                password: {
                    type: Sequelize.DataTypes.STRING
                }
            }
        );
    },

    down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
        await queryInterface.dropTable(USERS);
    }
};
