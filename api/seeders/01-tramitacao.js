'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(6)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tramitacao', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tramitacao', null, {})
  }
};
