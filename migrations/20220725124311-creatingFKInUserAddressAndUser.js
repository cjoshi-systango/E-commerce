'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'user_address', 
      'userId',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'user', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'user_address', 
      'userId' 
    );
  }
};
