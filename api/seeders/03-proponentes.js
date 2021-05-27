'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const proponentes = require('./json/proponentes.json')
    return queryInterface.bulkInsert('proponentes', proponentes, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('proponentes', null, {})
  }
};
