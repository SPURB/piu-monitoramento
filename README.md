# Projetos de Intervenção Urbana [![Build Status](https://travis-ci.org/SPURB/piu-monitoramento.svg?branch=master)](https://travis-ci.org/SPURB/piu-monitoramento)

Sistema de acompanhamento dos PIUs (Decreto nº 56.901, de 30 de março de 2016).

### Pré-requisitos
* Nodejs
* git-fls
 
### Instalação e desenvolvimento local
``` bash

# 'cd' para pasta do projeto. Instale as dependências especificadas em package.json
cd piu-monitoramento
npm i

# Para desenvolver
npm run dev

```
> Caso tenha erros com [atualização do node](https://github.com/nodejs/node/issues/25132) rode localmente o comando `npm install natives@1.1.6` e refaça a instalação (`npm i`).

### Para publicar
1. Rode o comando para compilar os arquivos

```bash
npm run build
```

2. Inclua todos os assets criados no diretório `dist/` no seguinte caminho do tema do portal gestão urbana:
````
\wp-content\themes\gestaourbana-versao-do-tema\SPA\piu-monitoramento\dist
````

## Backend
Esta aplicação consome os dados da api do monitoramento disponível em [api.gestaourbana.prefeitura.sp.gov.br/piu-monitoramento](api.gestaourbana.prefeitura.sp.gov.br/piu-monitoramento).

Veja a [documentação](https://documenter.getpostman.com/view/4136141/S1ZxbpLD?version=latest#1cd76587-99aa-450b-8590-1eb6882dafff)
e o [repositório](https://github.com/SPURB/piu-monitoramento-backend).

## Urls públicas
 1. gh-pages: https://spurb.github.io/piu-monitoramento/ (build desta master)
 2. produção: http://gestaourbana.prefeitura.sp.gov.br/piu-monitoramento
