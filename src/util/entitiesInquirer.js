const inquirer = require("inquirer");

const entitiesInquirer = async (cEntities) => {
  if (cEntities?.length) {
    return cEntities;
  }

  const entities = (
    await inquirer.prompt([
      {
        type: "input",
        name: "entities",
        message: "Quais entidades a serem geradas?",
        validate: (value) => (value ? true : "Precisa especificar entidades"),
      },
    ])
  )?.entities
    .trimEnd()
    .trimStart()
    .split(" ");

  return entities;
};
exports.entitiesInquirer = entitiesInquirer;
