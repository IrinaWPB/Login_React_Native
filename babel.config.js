module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
  };
};

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
};
