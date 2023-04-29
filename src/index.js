const shell = require("shelljs");
const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

const packagesDependencies = require("./util/packageDependencies");

const package = require("../package.json");

program.version(package.version);

// remove a pasta temp antes da execução das instruções
shell.rm("-rf", `${__filename.replace("src\\index.js", "")}temp`);

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

    let entities = cEntities;
    if (!entities?.length) {
      entities = (
        await inquirer.prompt([
          {
            type: "input",
            name: "entities",
            message: "Quais entidades a serem geradas?",
            validate: (value) =>
              value ? true : "Precisa especificar entidades",
          },
        ])
      )?.entities
        .trimEnd()
        .trimStart()
        .split(" ");
    }

    // executa o comando para cada entrada de services
    entities.forEach((entity) => {
      shell.exec(`npm run plop ${type} ${entity}`);
    });

    // copia todos os arquivos gerados pelo na pasta temp para a pasta src do usuário
    // e caso a pasta src não exista na pasta do usuário, cria a pasta
    shell.cd(userPath);
    shell.mkdir("-p", `${userPath}/src`);

    // lista todos os arquivos que foram gerados na pasta temp
    // e copia para a pasta src do usuário
    shell.ls(`${libPath}temp`).forEach((file) => {
      shell.cp("-R", `${libPath}temp/${file}`, `${userPath}/src`);
    });

    // remove a pasta temp da lib
    shell.rm("-rf", `${libPath}temp`);
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

  let entities = cEntities;
  if (!entities?.length) {
    entities = (
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
  }

  // types a serem gerados
  const types = ["hook", "service", "page", "component"];

  // executa o comando para cada entrada de services
  entities.forEach((entity) => {
    types.forEach((type) => {
      shell.exec(`npm run plop ${type} ${entity}`);
    });
  });

  // copia todos os arquivos gerados pelo na pasta temp para a pasta src do usuário
  // e caso a pasta src não exista na pasta do usuário, cria a pasta
  shell.cd(userPath);
  shell.mkdir("-p", `${userPath}/src`);

  // lista todos os arquivos que foram gerados na pasta temp
  // e copia para a pasta src do usuário
  shell.ls(`${libPath}temp`).forEach((file) => {
    shell.cp("-R", `${libPath}temp/${file}`, `${userPath}/src`);
  });

  // remove a pasta temp da lib
  shell.rm("-rf", `${libPath}temp`);
});

const successMessage = (message) => console.log(`${chalk.green(message)}`);
// generate os arquivos plop para toda uma entidade
// gerando os hooks, services, pages e components para a entidade passada
program.command("install [entities...]").action(async (cEntities) => {
  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;
  console.log(userPath);
  let entities = cEntities;
  if (!entities?.length) {
    entities = (
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
  }

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

  let packagesToBeInstalled = [];
  // executa o comando para cada entrada de services
  entities.forEach((entity) => {
    packagesToBeInstalled = [
      ...packagesToBeInstalled,
      ...packagesDependencies[entity],
    ];
  });

  // roda o install via yarn ou npm dos packagesToBeInstalled
  shell.exec(`yarn add ${packagesToBeInstalled.join(" ")}`);

  successMessage(
    `O(s) pacote(s) ${packagesToBeInstalled.join(",")} foram adicionados!`
  );
});

program.parse(process.argv);
