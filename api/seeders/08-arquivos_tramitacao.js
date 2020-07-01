'use strict';

const { setSeeder, getSeeder, filtrarSeeder } = require('../preseeders/create-seeders')
setSeeder(7)

let seeders = getSeeder()

seeders = seeders.filter(seeder => seeder.id_tramitacao != 0 && seeder.id_grupo != 0 && seeder.id_fonte != 0)

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('arquivos_tramitacao', seeders, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('arquivos_tramitacao', null, {})
  }
};
