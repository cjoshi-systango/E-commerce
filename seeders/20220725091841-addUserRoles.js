'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user_role', [{
      title: 'Admin',
      read: true,
      write: true,
      delete: true,
    }, {
      title: 'Seller',
      read: true,
      write: true,
      delete: true,
    }, {
      title: 'User',
      read: true,
      write: false,
      delete: false,
    },], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('user_role', null, {});
  }
};
