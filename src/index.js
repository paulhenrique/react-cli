const shell = require("shelljs");
const { program } = require("commander");
const package = require("../package.json");

program.version(package.version);

// gera os arquivos plop na pasta da lib e depois copia para a pasta
// em que o usuário executou o comando
program.command("gen <type> <services...>").action((type, entities) => {
  // localização da pasta da biblioteca
  const libPath = __filename.replace("src\\index.js", "");
  // localização da pasta do usuário
  const userPath = shell.pwd().stdout;

  // gera os arquivos plop na pasta da lib
  shell.cd(libPath);

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
