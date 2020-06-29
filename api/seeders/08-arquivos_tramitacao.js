'use strict';

const { setSeeder, getSeeder } = require('../preseeders/create-seeders')
setSeeder(7)


console.log(getSeeder())
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('arquivos_tramitacao', [
      { 
        data: '',
        documento: 'documento 01',
        arquivo_url: 'arquivo-01.pdf',
        evento: '',
        id_projetos: 1,
        id_tramitacao: 1,
        id_fonte: 1,
        id_grupo: 1
      }
   ], {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('arquivos_tramitacao', null, {})
  }
};
