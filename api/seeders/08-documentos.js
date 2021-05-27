'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const arquivosTramitacao = require('./json/documentos.json')
    return queryInterface.bulkInsert('documentos', arquivosTramitacao, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('documentos', null, {})
  }
};
