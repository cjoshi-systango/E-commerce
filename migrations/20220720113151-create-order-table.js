'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('order', {
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
      status: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: "yet to dispatch"
      },
      amount: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: new Date(),
        allowNull: false
      },
      deletedAt: {
        type: Sequelize.DataTypes.DATE,
      }
    },{
      paranoid: true,
      timestamps: true
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
