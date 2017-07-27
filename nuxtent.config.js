const hljs = require('highlight.js')
const externalLinks = require('markdown-it-link-attributes')

module.exports = {
  content: [
    ['ency', {
      isPost: false,
      permalink: ':slug',
      anchorsLevel: 1,
      routes: [
        {
          name: 'ency-lesson',
          method: 'get'
        },
        {
          name: 'ency',
          method: 'getAll'
        }
      ]
    }],
    ['vuency', {
      isPost: false,
      permalink: ':slug',
      anchorsLevel: 1,
      routes: [
        {
          name: 'vuency-lesson',
          method: 'get'
        },
        {
          name: 'vuency',
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