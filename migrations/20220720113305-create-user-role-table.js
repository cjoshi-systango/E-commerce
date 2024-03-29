'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("user_role", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      title: {
        type: Sequelize.DataTypes.ENUM("Admin","Seller","User"),
        allowNull: false,
      },
      read: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      write: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      delete: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
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
