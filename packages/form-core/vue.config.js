const { defineConfig } = require('@vue/cli-service');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const CircularPlugin = require('circular-dependency-plugin');
const env = process.env.mode === 'production';
const lang = new MonacoWebpackPlugin();
const circular = new CircularPlugin();
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack (config) {
    if (!env) {
      config.plugin('monaco').use(lang);
      config.plugin('circular').use(circular);
    }
  },
});
