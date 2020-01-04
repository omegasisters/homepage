const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    polyfill: '@babel/polyfill',
    internationalization: './preact/i18n',
    main: './preact/main',
    sindan: './preact/sindan',
  },
  output: {
    path: path.resolve(__dirname, 'assets', 'preact_build'),
    publicPath: '/homepage/',
    globalObject: 'self',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: [{loader: 'file-loader'}],
      },
    ],
  },
  plugins: [],
  devServer: {
    publicPath: '/assets/preact_build/',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
      }),
    ],
  },
};
