const hljs = require('highlight.js')

module.exports = {
  content: [
    ['ency', {
      permalink: ':slug',
      isPost: false,
      routes: [
        {
          path: '/ency/_slug',
          method: 'get'
        },
        {
          path: '/ency',
          method: 'getAll'
        }
      ]
    }],
    ['vuency', {
      permalink: ':slug',
      isPost: false,
      routes: [
        {
          path: '/vuency/_slug',
          method: 'get'
        },
        {
          path: '/vuency',
          method: 'getAll'
        }
      ]
    }]
  ],

  parsers: {
    md: {
      highlight: (code, lang) => {
        if (!(lang && hljs.getLanguage(lang))) return ''
        return hljs.highlight(lang, code, true).value
      }
    }
  },

  api: {
    baseURL: (isProd) => isProd
      ? 'https://ency.now.sh'
      : 'http://localhost:3000'
  }
}
