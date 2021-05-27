'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const dataTramitacao = require('./json/data_tramitacao.json')
    return queryInterface.bulkInsert('data_tramitacao', dataTramitacao, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('data_tramitacao', null, {})
  }
};
