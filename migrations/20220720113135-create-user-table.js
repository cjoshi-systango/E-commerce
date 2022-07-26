'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("user", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fullname: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      mobile_no: {
        type: Sequelize.DataTypes.STRING(10),
        allowNull: false,
      },
      isActive: {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
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
      deletedAt:{
        type: Sequelize.DataTypes.DATE,
      }
    },{
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
