'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const origens = require('./json/origens.json')
    return queryInterface.bulkInsert('origens', origens, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('origens', null, {})
  }
};
