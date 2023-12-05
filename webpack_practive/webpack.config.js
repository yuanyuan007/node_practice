const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  mode: 'development', // 或者 'production' development
  entry: {
    main: './src/index.js',
    // vendor: './src/vendor.js', // 添加 vendor 入口
  },
  output: {
    filename: '[name].[contenthash].js', // 使用 contenthash 避免缓存问题
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    // port: 8080,
    hot: true, // 开启 HMR
  },
  devtool: 'inline-source-map', // 添加 source map 配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: process.env.NODE_ENV === 'production'
          ? [MiniCssExtractPlugin.loader, 'css-loader']
          : ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ['csv-loader'],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },

    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css', // 使用 contenthash 避免缓存问题
    }),
    new CleanWebpackPlugin(), // 添加 CleanWebpackPlugin 插件
    new HtmlWebpackPlugin({ // 添加 HtmlWebpackPlugin 插件
      title: 'Webpack Demo', // 设置生成 HTML 文件的标题
    }),
    new BundleAnalyzerPlugin(), // 添加 Bundle 分析插件
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin(),
    ],
  },
}