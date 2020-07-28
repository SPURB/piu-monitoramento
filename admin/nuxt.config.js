const apiBase = {
  prod: 'https://servicos.spurbanismo.sp.gov.br/piu-monitoramento/api/0.0.1',
  local: 'http://localhost:6000/piu-monitoramento/api/0.0.1',
  homolog: 'https://spurb.github.io/piu-monitoramento-backend/v2/' // temporário
}

export default {
  mode: 'spa',
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  env: {
    apiBase: apiBase[process.env.NODE_ENV]
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ],
  modules: [
    '@nuxtjs/axios'
  ]
}
