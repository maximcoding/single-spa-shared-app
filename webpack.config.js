const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "locusview",
    projectName: "shared-app",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: {
      packageName: ["rxjs"],
      lodash: [
        "https://cdn.jsdelivr.net/npm/lodash@4.17.19/lodash.min.js",
        "_",
      ],
    },
  });
};
