# Projetos de Intervenção Urbana 

Sistema de acompanhamento dos PIUs (Decreto nº 56.901, de 30 de março de 2016).

### Pré-requisitos
* Nodejs 
* NPM
* Gulp
* Excel
### Instalação
``` bash
# Clonar repositório
git clone https://github.com/spurb/piu-monitoramento

# CD para pasta do projeto. Instalar dependências
npm install

# Serve com 'hot reload' em localhost:3000
gulp watch

# constrói para produção com minificação (js e css apenas)
gulp build

```

> Nota: O arquivo ``monitoramento.xlsx`` simula a futura base de dados e é a atual base de dados.