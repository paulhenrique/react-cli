const shell = require("shelljs");
const { copyEverythingFromLib } = require("./copy");
const { plopRunMultiple } = require("./plop");
const { entitiesInquirer } = require("./entitiesInquirer");
const { createSrcFolder } = require("./createSrcFolder");
const { entityInquirer } = require("../entityInquirer");

const createPlop = async (cEntities, cType = 0) => {
  // localização da pasta da biblioteca
  const libPath = __filename.replace("src\\util\\createPlop.js", "");
  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;
  // gera os arquivos plop na pasta da lib
  shell.cd(libPath);

  // executa o comando para cada entrada de services
  if (cType !== 0) {
    plopRunMultiple(
      await entitiesInquirer(cEntities),
      await entityInquirer(cType)
    );
  } else {
    plopRunMultiple(await entitiesInquirer(cEntities));
  }
  createSrcFolder(userPath);
  copyEverythingFromLib(libPath, userPath);
};
exports.createPlop = createPlop;
