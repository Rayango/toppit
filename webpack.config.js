var path = require('path');
const webpack = require('webpack');
var SRC_DIR = path.join(__dirname, '/client/src');
var DIST_DIR = path.join(__dirname, '/client/dist');
const env = process.env.NODE_ENV || 'development';

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015', 'stage-1'],
            plugins: [
              ["lodash", { "id": ["lodash", "semantic-ui-react"] }, "transform-decorators-legacy", "transform-class-properties"]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    }),
  ]
};