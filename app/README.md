# Projetos de Intervenção Urbana

[Sistema de acompanhamento dos PIUs](https://gestaourbana.prefeitura.sp.gov.br/piu-monitoramento) - decreto nº 56.901, de 30 de março de 2016

### Instalação e desenvolvimento local
#### Pré-requisitos para desenvolvimento
* [Nodejs](https://nodejs.org)
* [git](https://git-scm.com/downloads)
* [git-fls](https://git-lfs.github.com)

#### Instruções para rodar localmente
```
npm i
```

### Inicie a aplicação em localhost:3000
```
npm run dev
```

### Criar arquivos para deploy no portal gestão urbana
```
npm run build:gu:prod
```

## Urls públicas
 1. gh-pages: https://spurb.github.io/piu-monitoramento/ (build desta master)
 2. produção: https://gestaourbana.prefeitura.sp.gov.br/piu-monitoramento
