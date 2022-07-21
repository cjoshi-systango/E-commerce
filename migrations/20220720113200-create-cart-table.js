'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('cart', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      total_amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      }
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
