import puppeteer from 'puppeteer'
import path from 'path'
import {
  writeJsonSync,
  ensureFile,
  writeFileSync
} from 'fs-extra'

import models from './models'
import {
  convertModel,
  read
} from './builders'

function debug () {
  console.log('------------------ debugging ---------------------------')
  const datas = convertModel(`${path.resolve(__dirname, './')}/piu-monitoramento_v2.xlsx`, models[4])// models[4] -> data_tramitacao
  console.log('')
  console.log(datas)
  console.log('------------------ END debugging --------------------------')
}

/*
  checa links da tabela 'arquivos_tramitação'
  criará arquivos de imagem com screenshots das urls em output/checagem
*/
async function checkLinks (files) {
	const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  const outputPath = file => `${path.resolve(__dirname, './')}/output/checagem/${file}`

  for (const { id, url } of files) {
    const filename = `${id}`
    try {
      await page.goto(url, { timeout: 30000, waitUntil: 'networkidle0' })
      await page.screenshot({ path: `${outputPath(filename)}.png` })
    }
    catch ({ message }) {
      writeFileSync( `${outputPath(filename)}--erro--.txt`, message)
    }
  }

  await browser.close()
}

const files = read(`${path.resolve(__dirname, './')}/piu-monitoramento_v2.xlsx`, 'arquivos_tramitacao', 'sheet_to_json')
const mappedFiles = files.map(({ id, arquivo_url }) => {
  return {
    id,
    url: arquivo_url
  }
})

// checkLinks(mappedFiles)
debug()