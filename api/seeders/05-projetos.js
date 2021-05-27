'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const projetos = require('./json/projetos.json')
    return queryInterface.bulkInsert('projetos', projetos, {})
},

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('projetos', null, {})
  }
};
