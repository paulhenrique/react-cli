const { successMessage } = require("./messages");
const shell = require("shelljs");

const yarnInstallPackage = (packages) => {
  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;
  shell.cd(userPath);

  // roda o install via yarn ou npm dos packagesToBeInstalled
  shell.exec(`yarn add ${packages}`);

  successMessage(`O(s) pacote(s) ${packages} foi(ram) adicionados!`);
};

module.exports = yarnInstallPackage;
