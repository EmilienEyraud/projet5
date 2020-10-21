const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    app: "./src/script.js"
  },
  output: {
    filename: "init.bundle.js",
    path: path.resolve(__dirname, "dist")
  }
};
