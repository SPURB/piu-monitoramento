'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const arquivosTramitacao = require('./json/arquivos_tramitacao.json')
    return queryInterface.bulkInsert('arquivos_tramitacao', arquivosTramitacao, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('arquivos_tramitacao', null, {})
  }
};
