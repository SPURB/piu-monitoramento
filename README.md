# Projetos de Intervenção Urbana [![Build Status](https://travis-ci.org/SPURB/piu-monitoramento.svg?branch=master)](https://travis-ci.org/SPURB/piu-monitoramento) [![Netlify Status](https://api.netlify.com/api/v1/badges/e05983fa-28ac-4962-a17f-80b8921faead/deploy-status)](https://app.netlify.com/sites/piu-monitoramento/deploys)

[Sistema de acompanhamento dos PIUs](https://gestaourbana.prefeitura.sp.gov.br/piu-monitoramento) - decreto nº 56.901, de 30 de março de 2016


## Dados abertos
Os dados da do monitoramento estão disponíveis no seguinte repositório [spurb/piu-monitoramento-backend](https://github.com/SPURB/piu-monitoramento-backend)


### Instalação e desenvolvimento local
#### Pré-requisitos para desenvolvimento
* [Nodejs](https://nodejs.org)
* [git](https://git-scm.com/downloads)
* [git-fls](https://git-lfs.github.com)

#### Instruções para rodar localmente
``` bash
# copie o repositório
git clone https://github.com/SPURB/piu-monitoramento.git

# Vá para pasta do projeto e instale as dependências especificadas em package.json
cd piu-monitoramento
npm i

# Inicie a aplicação em localhost:3000
npm run dev
```
> Caso tenha erros com [atualização do node](https://github.com/nodejs/node/issues/25132) rode localmente o comando `npm install natives@1.1.6` e refaça a instalação (`npm i`).

### Para publicar
1. Altere o parâmetro `DIST_FOLDER` no arquivo `.env`
```
DIST_FOLDER=https://gestaourbana.prefeitura.sp.gov.br/wp-content/themes/gestaourbana-:versão-do-tema/SPA/piu-monitoramento/
```

2. Rode o comando para compilar os arquivos

```bash
npm run build
```

3. Inclua todos os assets criados no diretório `\SPA\piu-monitoramento\` no seguinte caminho do tema do portal gestão urbana:
````
\wp-content\themes\gestaourbana-versao-:versão-do-tema\SPA\piu-monitoramento\
````


## Urls públicas
 1. gh-pages: https://spurb.github.io/piu-monitoramento/ (build desta master)
 2. produção: https://gestaourbana.prefeitura.sp.gov.br/piu-monitoramento
