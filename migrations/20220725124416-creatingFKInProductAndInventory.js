'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.addColumn(
      'product', 
      'inventory_id',
      {
        type:Sequelize.DataTypes.INTEGER,
        references: {
          model: 'product_inventory', 
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }
    );
  },

  async down(queryInterface, Sequelize) {
  
    return await queryInterface.removeColumn(
      'product', 
      'inventory_id' 
    );
  }
};
