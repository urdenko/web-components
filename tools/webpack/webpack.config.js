module.exports = (config, cont) => {
  config.module.rules.unshift({
    test: /\.html$/i,
    loader: 'html-loader'
  });
  return config;
};
