/* eslint-disable */
// Disaling LINT for CommonsJS
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');


module.exports = (env) => {
  const mockEnv = env.localServe ? 'DEV' : 'MOCK';
  const backendUrl = env.backendUrl;
  const plugins = [
    new webpack.DefinePlugin({
      'process.env.backendUrl': JSON.stringify(backendUrl),
    }),
    new CopyWebpackPlugin([
      { from: './extension-app/public/bundle.json', to: '' },
    ]),
  ];

  // Add mock client when mocking the FE
  if (mockEnv === 'MOCK') {
    plugins.push(new CopyWebpackPlugin([
        { from: './node_modules/symphony-bdk-mock-client/dist', to: '' },
    ]));
  }

  return merge(
    commonConfig(mockEnv),
    {
      plugins,
    },
    {
      mode: 'development',
      devtool: 'eval-source-map',

      devServer: {
        inline: true,
        port: 4000,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
      }
    })
};

