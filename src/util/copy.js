const shell = require("shelljs");
const removeTempFolder = require("./removeTempFolder");

const copyEverythingFromLib = (libPath, userPath) => {
  // lista todos os arquivos que foram gerados na pasta temp
  // e copia para a pasta src do usuário
  shell.ls(`${libPath}temp`).forEach((file) => {
    shell.cp("-R", `${libPath}temp/${file}`, `${userPath}/src`);
  });

  removeTempFolder(libPath);
};

module.exports = {
  copyEverythingFromLib,
};
