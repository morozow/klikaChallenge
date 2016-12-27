import path from 'path';
import webpack from 'webpack';
import autoprefixer from 'autoprefixer';
import precss from 'precss';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

// default config
let appEntry = [];
let devtool = 'source-map';
let plugins = [];

const htmlTemplate = new HtmlWebpackPlugin({
  title: 'React, RxJS, GraphQL, Relay',
  template: './views/development.index.html',
  mobile: true,
  inject: false,
  appMountId: 'application',
});
const favIcon = new FaviconsWebpackPlugin('./assets/logo.png');

if (process.env.NODE_ENV === 'production') {
  appEntry = appEntry.concat(['babel-polyfill', path.join(__dirname, 'scr/application.js')]);
  devtool = 'source-map';
  plugins = plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    htmlTemplate,
    favIcon,
  ]);
} else {
  appEntry = [
    'babel-polyfill',
    path.join(__dirname, 'src/application.js'),
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
  ];
  devtool = 'eval';
  plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
    }),
    htmlTemplate,
    favIcon,
  ];
}

module.exports = {
  entry: {
    app: appEntry,
    vendor: ['react', 'react-dom', 'react-relay', 'react-router', 'react-router-relay'],
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },
  devtool,
  module: {
    loaders: [{
      test: /\.(jsx|js)?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [/lodash-es/],
    }, {
      test: /\.(scss|css)$/,
      loaders: ['style', 'css', 'sass'],
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
      loader: 'url-loader?limit=10000&name=assets/[hash].[ext]',
    }],
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
  postcss: () => [precss, autoprefixer],
  plugins,
};
