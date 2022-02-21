var path = require('path');
var fs = require('fs');


// 打别名
exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'ui-cli': path.resolve(__dirname, '../')
};

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};

exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;
