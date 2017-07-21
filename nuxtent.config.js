module.exports = {
  content: {
    routName: 'lesson',
    isPost: false
  },
  api: {
    baseURL: (isProd) => isProd ? 'http://localhost:3000' : 'http://localhost:3000'
  }
}
