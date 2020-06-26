import { convertModel, create } from './builders'
import models from './models'
import path from 'path'

models.forEach((model) => {
  const data = convertModel(`${path.resolve(__dirname, './')}/piu-monitoramento_v2.xlsx`, model)
  create(`output/${model.table}.json`, data)
})
