module.exports = {
  preset: "react-native",
  setupFilesAfterEnv: [
    "./node_modules/@testing-library/react-native/extend-expect",
  ],
};
