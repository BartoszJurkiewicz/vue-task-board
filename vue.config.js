const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
if (process.env.NODE_ENV === 'production') {
  module.exports = {
    configureWebpack: {
      output: {
        publicPath: './'
      },
      plugins: [
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, '/dist'),
          routes: [ '/' ]
        })
      ]
    }
  }
}
