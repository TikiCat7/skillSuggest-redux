import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const serverPort = process.env.PORT || 8080
export const serverURI = `http://localhost:${serverPort}`

export default {
  entry: {
    app: './src/entry/app.js',
  },

  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js',
    publicPath: `/public`,
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css'),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /.s?css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
          'resolve-url',
          'sass',
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
