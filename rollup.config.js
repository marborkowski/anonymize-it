const { uglify } = require("rollup-plugin-uglify");

export default {
  input: "./src/index.js",
  output: {
    file: "./dist/dist.min.js",
    format: "umd",
    name: "anonymizeIT",
  },
  plugins: [uglify()],
};
