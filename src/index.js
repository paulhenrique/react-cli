const shell = require("shelljs");
const { program } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const inquirer = require("inquirer");

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

program.parse(process.argv);
