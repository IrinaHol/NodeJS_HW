const { CARS } = require('../../constant/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.createTable(
            CARS,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                model: {
                    type: Sequelize.DataTypes.STRING
                },
                year: {
                    type: Sequelize.DataTypes.INTEGER
                },
                price: {
                    type: Sequelize.DataTypes.INTEGER
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
        await queryInterface.dropTable(CARS);
    }
};
