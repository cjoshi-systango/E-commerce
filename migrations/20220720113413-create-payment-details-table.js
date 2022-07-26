'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable('payment_details', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      mode: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.DataTypes.STRING,
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
      }
    },{
      paranoid: true,
      timestamps: true
    })
  },

  async down(queryInterface, Sequelize) {
    
  }
};
