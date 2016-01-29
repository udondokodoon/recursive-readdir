module.exports = function recursiveReadDir(path, callback) {
  var fs = require("fs");
  fs.lstat(path, function(err, stats) {
    if (err) throw err;
    if (stats.isFile()) {
      return callback(path, stats);
    }
    if (stats.isDirectory()) {
      return fs.readdir(path, function(err, files) {
        if (err) throw err;
        files.forEach(function(file) {
          recursiveReadDir(path + "/" + file, callback);
        });
      });
    }
    if (stats.isSymbolicLink()) {
      throw new Error("sorry, not implemented for symboliclink");
    }
  });
};
