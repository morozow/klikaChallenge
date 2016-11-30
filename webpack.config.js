var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    './src/application.js',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        loaders: ['babel-loader'],
        include: [path.resolve(__dirname, 'src')],
        test: /\.(js|jsx)$/,
        plugins: ['transform-runtime'],
      },
      {
        include: [/lodash-es/],
        loader: 'babel-loader',
        test: /\.js$/,
      },
      {
        test: /\.(scss|css)$/,
        loaders: ['style', 'css', 'sass'],
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', 'jsx', '.json', '.js.flow'],
    modulesDirectories: [
      path.join('node_modules'),
      path.join('types'),
      path.join('src'),
      path.join('src', 'common'),
      path.join('src', 'components'),
    ],

    root: path.resolve(path.join(__dirname)),
  },
};
