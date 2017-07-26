const hljs = require('highlight.js')
const externalLinks = require('markdown-it-link-attributes')

module.exports = {
  content: {
    isPost: false,
    permalink: ':slug',
    routes: [
      {
        name: 'guide-lesson',
        method: 'get'
      },
      {
        name: 'guide',
        method: 'getAll'
      }
    ]
  },

  parsers: {
    md: {
      highlight: (code, lang) => {
        if (!(lang && hljs.getLanguage(lang))) return ''
        return hljs.highlight(lang, code, true).value
      },
      use: [
        [externalLinks, {
          target: '_blank',
          rel: 'noopener'
        }]
      ]
    }
  },

  api: {
    baseURL: (isProd) => isProd ? 'http://localhost:3000' : 'http://localhost:3000'
  }
}
