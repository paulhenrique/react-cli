const inquirer = require("inquirer");

const entityInquirer = async (cType) => {
  if (cType) {
    return cType;
  }

  const type = (
    await inquirer.prompt([
      {
        type: "input",
        name: "type",
        message: "Qual é o tipo do gerador?",
        validate: (value) => (value ? true : "Não é permitido um tipo vazio"),
      },
    ])
  )?.type;
  return type;
};
exports.entityInquirer = entityInquirer;
