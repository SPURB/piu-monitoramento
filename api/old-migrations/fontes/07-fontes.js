'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const fontes = require('./json/fontes.json')
    return queryInterface.bulkInsert('fontes', fontes, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('fontes', null, {})
  }
};
