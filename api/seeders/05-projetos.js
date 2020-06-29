'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(5)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('projetos', getSeeder(), {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projetos', null, {})
  }
};
