const shell = require("shelljs");
const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

const { successMessage } = require("./util/messages");
const yarnInstallPackage = require("./util/yarnInstallPackage");
const removeTempFolder = require("./util/removeTempFolder");

const package = require("../package.json");
const { copyEverythingFromLib } = require("./util/copy");
const { plopRunMultiple } = require("./util/plop");
const { entitiesInquirer } = require("./util/entitiesInquirer");
const { joinPackagesToString } = require("./util/joinPackagesToString");
const { createSrcFolder } = require("./util/createSrcFolder");

program.version(package.version);

// remove a pasta temp antes da execução das instruções
removeTempFolder();

// exibe o nome do projeto
console.log(chalk.cyan(figlet.textSync("React CLI")));

// cria os arquivos plop na pasta da lib e depois copia para a pasta
// em que o usuário executou o comando
program
  .command("create [type] [services...]")
  .action(async (cType, cEntities) => {
    // localização da pasta da biblioteca
    const libPath = __filename.replace("src\\index.js", "");
    // localização da pasta do usuário
    const userPath = shell.pwd().stdout;

    // gera os arquivos plop na pasta da lib
    shell.cd(libPath);

    let type = cType;
    if (!type) {
      type = (
        await inquirer.prompt([
          {
            type: "input",
            name: "type",
            message: "Qual é o tipo do gerador?",
            validate: (value) =>
              value ? true : "Não é permitido um tipo vazio",
          },
        ])
      )?.type;
    }
    plopRunMultiple(await entitiesInquirer(cEntities), type);
    createSrcFolder(userPath);
    copyEverythingFromLib(libPath, userPath);
  });

// generate os arquivos plop para toda uma entidade
// gerando os hooks, services, pages e components para a entidade passada
program.command("generate [entities...]").action(async (cEntities) => {
  // localização da pasta da biblioteca
  const libPath = __filename.replace("src\\index.js", "");

  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;

  // gera os arquivos plop na pasta da lib
  shell.cd(libPath);

  // executa o comando para cada entrada de services
  plopRunMultiple(await entitiesInquirer(cEntities));
  createSrcFolder(userPath);
  copyEverythingFromLib(libPath, userPath);
});

// generate os arquivos plop para toda uma entidade
// gerando os hooks, services, pages e components para a entidade passada
program.command("install [entities...]").action(async (cEntities) => {
  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;
  shell.cd(userPath);

  // verifica se o package.json existe na pasta do usuário
  // caso não exista, pergunta ao usuário se pode criar com yarn
  if (!shell.test("-f", `${userPath}/package.json`)) {
    const { createPackageJson, useYarn, addGitIgnore, initGitRepository } =
      await inquirer.prompt([
        {
          type: "confirm",
          name: "createPackageJson",
          message: "Não foi encontrado o package.json, deseja criar?",
        },
        {
          type: "confirm",
          name: "useYarn",
          message: "Deseja utilizar yarn?",
        },
        {
          type: "confirm",
          name: "initGitRepository",
          message:
            "Se não estiver configurado, deseja inicializar o repositório git?",
        },
        {
          type: "confirm",
          name: "addGitIgnore",
          message: "Deseja adicionar o .gitignore?",
        },
      ]);

    // cria o package.json com yarn ou npm
    if (createPackageJson) {
      if (useYarn) {
        shell.exec("yarn init -y");
      } else {
        shell.exec("npm init -y");
      }
    }

    successMessage("Configuração de package json adicionada!");

    // adiciona o .gitignore fazendo um download do github para a configuração de node.js
    if (addGitIgnore) {
      shell.exec(
        "curl -o .gitignore https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore"
      );
    }
    successMessage("Gitignore adicionado!");

    // inicializa o repositório git
    if (initGitRepository) {
      shell.exec("git init");
    }
    successMessage("Repositório git inicializado!");
  }

  yarnInstallPackage(joinPackagesToString(await entitiesInquirer(cEntities)));
});

program.parse(process.argv);
