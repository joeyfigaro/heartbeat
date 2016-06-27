var webpack = require('webpack');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');
var VendorChunkPlugin = require('webpack-vendor-chunk-plugin');
var path = require('path');

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:5000',
      'webpack/hot/dev-server',
      './app/app'
    ]
  },
  output: {
    path: path.join(__dirname, 'bundles'),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      THREE: path.join(__dirname, 'app', 'lib', 'three.js', 'build', 'three.min.js')
    }
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ProgressBarPlugin()
    // new webpack.IgnorePlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel'],
        include: [
          path.join(__dirname, 'scripts'),
          path.join(__dirname, 'app')
        ],
        exclude: [
          path.join(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.glsl$/,
        loader: 'glsl'
      }
    ]
  },
  glsl: {
    chunkPath: path.join(__dirname, 'app', 'shaders')
  }
};
