require('babel-register');

var app = new (require('express'))()
var port = process.env.PORT || 3000;

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
})


// initalize webpack dev middleware if in development context
if (process.env.NODE_ENV === 'development') {
  var webpack = require('webpack')
  var config = require('../webpack.config')

  var devMiddleware = require('webpack-dev-middleware')
  var hotDevMiddleware = require('webpack-hot-middleware')
  var compiler = webpack(config)
  var devMiddlewareConfig = {
    noInfo: true,
    stats: {colors: true},
    publicPath: config.output.publicPath
  }

  app.use(devMiddleware(compiler, devMiddlewareConfig))
  app.use(hotDevMiddleware(compiler))
}

app.use(require('express').static('public'))

var api = require('./utils/api');
api(app);

require('./utils/scanner')();

var serverRender = require('./utils/serverRender')
app.get("*", serverRender)

app.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> Listening on port %s", port)
  }
})