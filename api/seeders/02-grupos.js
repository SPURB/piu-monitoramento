'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(3)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('grupos', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grupos', null, {})
  }
};
