'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.addColumn('user', 'google_id', {
        type: Sequelize.STRING
      });
      await queryInterface.addColumn('user', 'provider', {
        type: Sequelize.ENUM("local","google"),
        defaultValue:"local"
      });
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.removeColumn('user', 'google_id');
      await queryInterface.removeColumn('user', 'provider');
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }
};