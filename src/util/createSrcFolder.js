const shell = require("shelljs");

const createSrcFolder = (userPath) => {
  // copia todos os arquivos gerados pelo na pasta temp para a pasta src do usuário
  // e caso a pasta src não exista na pasta do usuário, cria a pasta
  shell.cd(userPath);
  shell.mkdir("-p", `${userPath}/src`);
};
exports.createSrcFolder = createSrcFolder;
