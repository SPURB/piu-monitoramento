'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const grupos = require('./json/grupos.json')
    return queryInterface.bulkInsert('grupos', grupos, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('grupos', null, {})
  }
};
