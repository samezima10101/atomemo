const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  // SVGをアセット(asset)として読み込めるように追加
  config.resolver.assetExts.push("svg");

  return config;
})();
