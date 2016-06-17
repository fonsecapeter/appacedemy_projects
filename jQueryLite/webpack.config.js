module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./lib",
    filename: "jquery_lite.js",
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]'
  },
  devtool: 'source-maps'
};
