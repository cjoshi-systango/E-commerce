'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'user', 
      'userRoleId',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'user_role', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET Null',
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'user', 
      'userRoleId' 
    );
  }
};
