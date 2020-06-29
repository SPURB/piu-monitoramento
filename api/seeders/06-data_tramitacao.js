'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(4)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('data_tramitacao', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('data_tramitacao', null, {})
  }
};
