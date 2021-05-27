module.exports = (sequelize, Sequelize) => {
    const Documentos = sequelize.define("documentos", {
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      }
    })
  
    return Documentos
  }