'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("user_address", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      address_line1: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      address_line2: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      city: {
        type: Sequelize.DataTypes.STRING,
        allowNull: true
      },
      country: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      pincode: {
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
