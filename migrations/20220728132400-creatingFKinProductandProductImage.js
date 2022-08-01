'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'product_image', 
      'productId',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'product', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'product_image', 
      'productId' 
    );
  }
};
