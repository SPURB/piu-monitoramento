'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {    
    const tramitacao = require('./json/tramitacao.json')
    return queryInterface.bulkInsert('tramitacao', tramitacao, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tramitacao', null, {})
  }
};
