const { override, addWebpackAlias, fixBabelImports } = require("customize-cra");
const path = require("path");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    libraryDirectory: "es/components",
    style: false,
  }),

  addWebpackAlias({
    ["@"]: path.join(__dirname, "./src"),
  })
);
