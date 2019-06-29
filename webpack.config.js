const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const entry = {}
const filenames = ['background', 'init', 'main', 'options']
filenames.forEach(filename => {
  entry[filename] = `./src/js/${filename}.js`
})

module.exports = {
  mode: 'production',
  entry,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minSize: 30,
          minChunks: 2,
          priority: 1
        }
      }
    }
  },
  plugins: [
    new BundleAnalyzerPlugin({ analyzerPort: 8081 }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    alias: {
    },
    extensions: ['*', '.js', '.json']
  },
  performance: {
    hints: 'warning'
  }
}
