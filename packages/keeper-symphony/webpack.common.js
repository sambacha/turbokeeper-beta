const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const appEntry = './extension-app/app.js';
const controllerEntry = './extension-app/controller.js';

let currEnv = '';
const setApi = (env) => {
  currEnv = env.toUpperCase();
};

module.exports = (env) => {
  console.log('Current environment: ', env);
  setApi(env);
  return {
    entry: {
      controller: path.resolve(__dirname, controllerEntry),
      app: path.resolve(__dirname, appEntry),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js',
      publicPath: '/',
    },

    module: {
      rules: [
        {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 81920,
            },
          }],
        },
        {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
              },
            },
          ],
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
            presets: ['@babel/react', '@babel/preset-env'],
          },
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        { test: /\.hbs$/, loader: 'raw-loader' },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        handlebars: 'handlebars/dist/handlebars.min.js',
        // https://github.com/facebook/react/issues/14721#issuecomment-458757426
        react: path.resolve('./node_modules/react'),
        'styled-components': path.resolve('./node_modules/styled-components'),
        'react-data-table-component': path.resolve('./node_modules/react-data-table-component'),
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'controller.html',
        template: './extension-app/public/controller.html',
        inject: false,
      }),
      new HtmlWebpackPlugin({
        filename: 'app.html',
        template: './extension-app/public/app.html',
        inject: false,
      }),
      new webpack.DefinePlugin({
        'process.env.currEnv': JSON.stringify(currEnv),
      }),
      new CopyWebpackPlugin([
        { from: './extension-app/public/assets', to: 'assets' },
      ]),
      new CopyWebpackPlugin([
        { from: './extension-app/public/sass/fonts', to: 'fonts' },
      ]),
      new CopyWebpackPlugin([
        { from: './extension-app/public/config.js', to: '' },
      ]),
    ],
  };
};
