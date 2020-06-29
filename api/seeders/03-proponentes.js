'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(1)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('proponentes', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proponentes', null, {})
  }
};
