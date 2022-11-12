const fs = require("fs");
const path = require("path");

/**
 * Look ma, it's cp -R.
 * @param {string} src  The path to the thing to copy.
 * @param {string} dest The path to the new copy.
 */
var copyRecursiveSync = function (src, dest) {
  var exists = fs.existsSync(src);
  var stats = exists && fs.statSync(src);
  var isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);

    fs.readdirSync(src).forEach(function (childItemName) {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else if (src !== BUILD_SCRIPT) {
    fs.copyFileSync(src, dest);
  }
};

var DIST = `${__dirname}/../dist/`;
var BUILD_SCRIPT = `${__dirname}/build-script.cjs`;

copyRecursiveSync(__dirname, DIST);
