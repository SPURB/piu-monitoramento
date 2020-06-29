'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(2)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('fontes', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fontes', null, {})
  }
};
