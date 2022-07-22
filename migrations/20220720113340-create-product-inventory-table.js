'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('product_inventory', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      quantity: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      }
    },{
      paranoid: true,
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
