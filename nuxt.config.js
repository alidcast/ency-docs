module.exports = {
  head: {
    title: 'Ency.js',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ency Docs' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'ency.ico' }
    ]
  },
  css: [
    'highlight.js/styles/hybrid.css',
    { src: '~assets/sass/global.sass', lang: 'sass' }
  ],
  loading: { color: '#3B8070' },
  build: {
    extend (config, ctx) {
      config.module.rules.push({
        test: /\.md/,
        loader: 'vue-markdown-loader'
      })

      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    vendor: [
      'vuency'
    ]
  },
  plugins: [
    '~plugins/vuency'
  ]
}
