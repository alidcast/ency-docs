const hljs = require('highlight.js')

module.exports = {
  content: [
    ['ency', {
      permalink: ':slug',
      isPost: false,
      page: '/ency/_slug',
      generate: [
        'get', 'getAll'
      ]
    }],
    ['vuency', {
      permalink: ':slug',
      isPost: false,
      page: '/vuency/_slug',
      generate: [
        'get', 'getAll'
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
  }
}
