'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addConstraint('cart', {
        fields:['productId'],
        type: 'foreign key',
        name: 'fk_cart_products',
        references: {
          table: 'product',
          field: 'id',
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeConstraint('Comments', 'fk_comments_users');
  }
};
