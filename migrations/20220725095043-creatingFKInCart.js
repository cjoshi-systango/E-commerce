'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'cart', 
      'productId',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'product', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'cart', 
      'productId' 
    );
  }
};
