const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: ['@babel/polyfill', './preact/index'],
  output: {
    path: path.resolve(__dirname, 'assets', 'preact_build'),
    filename: 'bundle.js',
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
