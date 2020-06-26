Instruções para publicar no portal Gestão Urbana:
1. O arquivo [page-piu-monitoramento.php](page-piu-monitoramento.php) deve ser incluído no diretório do tema do Gestão Urbana
```
/wp-content/themes/gestaourbana-1.4
```

2. Vá para o `wp-admin` do wordpress e crie uma página com o tema `piu-monitoramento`


3. Faça o build para a url pública dos recursos da aplicação
```
npm run build:gu:prod
```

4. Inclua os arquivos gerados no diretórios `dist` no diretório de produção
```
/wp-content/themes/gestaourbana-1.4/SPA/piu-monitoramento
```

Por hora temos três scripts que podem ser usados para testar nas instalações do gestão urbana:

| script | gera build para |
|-----|-----|
| `npm run build:gu:prod` | [gestaourbana.prefeitura.sp.gov.br/piu-monitoramento](https//:gestaourbana.prefeitura.sp.gov.br/piu-monitoramento) |
| `npm run build:gu:homolog` | [comunicacao.smul.pmsp/piu-monitoramento](http://comunicacao.smul.pmsp/piu-monitoramento) |
| `npm run build:gu:local` | [http://localhost/gestaourbana/piu-monitoramento](http://localhost/gestaourbana/piu-monitoramento) |


### Para alterar o diretório público
Se for necessário testar a aplicação em outro tema ou instalação de wordpress altere o parâmetro `publicPath` no comando do webpack dos `scripts` no `package.json`. Exemplo:

```json
{
  "build:gu:local": "webpack ... --env.publicPath=http://localhost:5000/gu/piu-monitoramento/"
}
```