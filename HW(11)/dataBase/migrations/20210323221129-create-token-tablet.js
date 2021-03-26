const { O_AUTH } = require('../../constant/constants');

module.exports = {
    up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
        await queryInterface.createTable(
            O_AUTH,
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    autoIncrement: true,
                    allowNull: false,
                    primaryKey: true
                },
                access_token: {
                    type: Sequelize.DataTypes.STRING
                },
                refresh_token: {
                    type: Sequelize.DataTypes.STRING
                },
                users_id: {
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
        await queryInterface.dropTable(O_AUTH);
    }
};
