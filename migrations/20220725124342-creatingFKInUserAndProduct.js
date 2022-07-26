'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'product', 
      'added_by',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'user', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET Null',
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'product', 
      'added_by' 
    );
  }
};
