const shell = require("shelljs");

const removeTempFolder = (libPath) => {
  if (!libPath) {
    shell.rm("-rf", `${__filename.replace("src\\index.js", "")}temp`);
  } else {
    shell.rm("-rf", `${libPath}temp`);
  }
};

module.exports = removeTempFolder;
