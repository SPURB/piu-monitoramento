'use strict'

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(0)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('origens', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('origens', null, {})
  }
};
