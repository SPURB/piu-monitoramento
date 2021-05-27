import { documentos } from '../db'
import * as dao from './dao'

exports.create = (req, res) => {
  if (!req.body.status) {
    res.status(400).send({
      message: 'Inclua o status da fonte na requisição'
    })
    return
  }

  dao.create(res, documentos, req.body)
}

exports.findAll = (req, res) => dao.findAll(res, 'Lista de documentos', documentos)
exports.findOne = (req, res) => dao.findOne(req, res, documentos)
exports.update = (req, res) => dao.update(req, res, documentos)
exports.delete = (req, res) => dao.delete(req, res, documentos)
exports.deleteAll = (req, res) => dao.deleteAll(req, res, documentos)
