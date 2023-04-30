const shell = require("shelljs");

// types a serem gerados
const plopTypes = ["hook", "service", "page", "component"];

// generate os arquivos plop para toda uma entidade
const plopRunMultiple = (entities, type) => {
  // executa o comando para cada entrada de services
  entities.forEach((entity) => {
    if (!type) {
      plopTypes.forEach((type) => {
        shell.exec(`npm run plop ${type} ${entity}`);
      });
    } else {
      shell.exec(`npm run plop ${type} ${entity}`);
    }
  });
};

module.exports = {
  plopTypes,
  plopRunMultiple,
};
