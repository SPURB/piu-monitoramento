Instruções para publicar no portal Gestão Urbana:
 - O arquivo [page-piu-monitoramento.php](page-piu-monitoramento.php) deve ser incluído no diretório do tema do Gestão Urbana, a saber:
`/home/smdu/gestaourbana.prefeitura.sp.gov.br/public/wp-content/themes/gestaourbana-1.4`

 - É necessário alterar o arquivo [env](../env) na raiz deste projeto:

No arquivo `.env`, onde está :
```
DIST_FOLDER=https://gestaourbana.prefeitura.sp.gov.br/wp-content/themes/gestaourbana-1.4/SPA/piu-monitoramento/dist/
```

deve ficar:
```
DIST_FOLDER=./
```

 - Faça o build deste projeto:
```
npm run build
```