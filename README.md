# Projetos de Intervenção Urbana 

Sistema de acompanhamento dos PIUs (Decreto nº 56.901, de 30 de março de 2016).

### Pré-requisitos
* Nodejs 
* Gulp
* Excel

### Instalação
``` bash

# Clonar repositório
git clone https://github.com/spurb/piu-monitoramento

# 'cd' para pasta do projeto. Instale as dependências especificadas em package.json
npm install

# Serve com 'hot reload' em localhost:3000
gulp

# constrói para produção e minificação 
gulp build

```

> Nota1 : O arquivo ``data_src/monitoramento.xlsx``  e ``data/src/hiperlinks`` simula a futura base de dados. Neste projeto os dados estão sendo compilados em `dist/main.min.js`.
> Nota2: Os kmls a serem colocados em `dist/kml` devem ter a nomenclatura numérica da coluna `rev_id` do `monitoramento.xlsx`. 

