const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const path = require('path');
const config = require('./webpack.config');

const app = new (express)();
const DEV_SERVER_PORT = 3000;

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));
app.use(express.static(path.join(__dirname)));

app.get('/**', (_req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(DEV_SERVER_PORT, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(
          ` [${new Date()}]
          Listening on port ${DEV_SERVER_PORT} 
          Open up http://localhost:${DEV_SERVER_PORT}/ in your browser.`);
  }
});
