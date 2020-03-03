/* eslint-disable no-undef */
module.exports = config => {
  /** config component style as module */
  const styleRules = config.module.rules.find(rule => rule.test.test('.scss'));
  styleRules.oneOf.unshift({
    test: /\.element\.scss$/,
    use: [{ loader: 'raw-loader' }, { loader: 'sass-loader' }]
  });

  /** config component template as module */
  config.module.rules.push({
    test: /\.html$/i,
    loader: 'html-loader'
  });

  return config;
};
