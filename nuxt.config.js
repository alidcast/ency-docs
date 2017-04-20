const resolve = require('path').resolve
const menu = require('./docs.menu')

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
      /**
       * Alias
       */
      config.resolve.alias['~articles'] = resolve(__dirname, 'articles')
      config.resolve.alias['~utilities'] = resolve(__dirname, 'utilities')

      /**
       * Loaders.
       */
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      config.module.rules.push({
        test: /\.md/,
        loader: 'vue-markdown-loader'
      })
    },
    vendor: [
      'vuency'
    ]
  },
  plugins: [
    '~plugins/vuency'
  ],
  generate: {
    routes: menuToRoutes(menu)
  }
}

/**
 * Convert a list of menu items to an array of dynamic route params.
 *
 */
function menuToRoutes(menu, query = '/') {
  let routes = []
  menu.forEach(group => {
    // for simplicity, we ignore group headings and just create a top level route
    // for each subsection
    if (group[1] instanceof Array) group[1].forEach(subsection => routes.push(`${query}${subsection}`))
    else group.forEach(section => routes.push(`${query}${section}`))
  })
  return routes
}
