require('babel-register');

var app = new (require('express'))();
var port = process.env.PORT || 3000;

require('css-modules-require-hook')({
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});

var fs = require('fs');
var filename = './src/utils/data.json';
var dataStub = {"posts": []};
fs.writeFileSync(filename, JSON.stringify(dataStub));


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

app.use(require('express').static('public'));
require('./utils/scanner')();

var api = require('./utils/api');
app.use("/api", api);

var serverRender = require('./utils/serverRender');
app.get("*", serverRender);

app.listen(port, function(error) {
  if (error) {
    console.error(error);
  } else {
    console.info("[Server] Listening on port %s", port);
  }
})
