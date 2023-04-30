const packagesDependencies = require("./packageDependencies");

const joinPackagesToString = (entities) => {
  console.log(entities);
  let packagesToBeInstalled = [];
  // executa o comando para cada entrada de services
  entities.forEach((entity) => {
    packagesToBeInstalled = [
      ...packagesToBeInstalled,
      ...packagesDependencies[entity],
    ];
  });

  return packagesToBeInstalled.join(" ");
};
exports.joinPackagesToString = joinPackagesToString;
