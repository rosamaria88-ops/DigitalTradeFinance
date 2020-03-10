const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const globEntries = require('webpack-glob-entries')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

// Webpack doesn't support glob paths. For the nunjucks-html-loader,
// we need each path to be specified for it to work (even subdirectories)
function returnEntries(globPath) {
  let entries = globEntries(globPath, true);
  let folderList = new Array();
  for (let folder in entries) {
    folderList.push(path.join(__dirname, entries[folder]));
  }
  return folderList;
}

module.exports = {
  mode: 'development',
  entry: {
    main: [
      './scripts/main.js',
      'webpack-hot-middleware/client?reload=true'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/assets',
    filename: '[name].js'
  },
  target: 'web',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.html$|njk|nunjucks/,
        use: ['html-loader', {
          loader: 'nunjucks-html-loader',
          options: {
            // base directory in which webpack is going to find any .njk files
            searchPaths: [...returnEntries('./templates/**/')]
          }
        }]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // creates `style` nodes from JS strings
          'style-loader',
          // translates CSS into CommonJS
          'css-loader',
          // compiles Sass to CSS
          'sass-loader',
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'index.html',
      inject: 'body',
      // tell webpack to pass index.njk through the nunjucks-html-loader
      template: 'nunjucks-html-loader!./templates/index.njk',
    }),
    new CopyPlugin([
      { from: './node_modules/govuk-frontend/govuk/assets', to: './assets' }
    ]),
    // OccurrenceOrderPlugin is needed for webpack 1.x only
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
