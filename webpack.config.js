const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
			{
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true,
                exportLocalsConvention: 'as-is', 
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
		proxy: [
      {
        context: ['/service/api'],
        target: 'https://sycret.ru',
        changeOrigin: true,
        secure: false, 
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
	performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
}
};

// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// module.exports = {
//   entry: './src/index.jsx', // Основной файл
//   output: {
//     filename: 'bundle.[contenthash].js',
//     path: path.resolve(__dirname, 'dist'),
//     clean: true, // Удаляет старые бандлы
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/, // Обработка файлов .js и .jsx
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//         },
//       },
//       {
//         test: /\.module\.css$/, // Обработка CSS-модулей
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader, // Извлекает CSS в отдельные файлы
//           },
//           {
//             loader: 'css-loader',
//             options: {
//               modules: {
//                 localIdentName: '[name]__[local]___[hash:base64:5]', // Формат имен классов
//               },
//             },
//           },
//         ],
//       },
//       {
//         test: /\.css$/, // Обработка обычных файлов CSS
//         exclude: /\.module\.css$/, // Исключаем CSS-модули
//         use: [
//           {
//             loader: MiniCssExtractPlugin.loader,
//           },
//           'css-loader',
//         ],
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)$/i, // Обработка изображений
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[path][name].[hash].[ext]',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: ['.js', '.jsx'], // Добавьте поддержку расширений .js и .jsx
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Webpack Production',
//       template: './index.html', // Шаблон HTML
//     }),
//     new MiniCssExtractPlugin({
//       filename: '[name].[contenthash].css',
//     }),
//   ],
//   optimization: {
//     splitChunks: {
//       chunks: 'all', // Разделение кода
//     },
//   },
//   devServer: {
//     historyApiFallback: true, // Поддержка React Router
//     proxy: [ // Пример настройки прокси
//       {
//         context: ['/service/api'],
//         target: 'https://sycret.ru',
//         changeOrigin: true,
//         secure: false,
//       },
//     ],
//   },
//   performance: {
//     hints: false, // Отключаем подсказки о производительности
//     maxEntrypointSize: 512000,
//     maxAssetSize: 512000,
//   },
// };
