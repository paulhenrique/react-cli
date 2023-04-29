const chalk = require("chalk");

const successMessage = (message) => console.log(`${chalk.green(message)}`);

module.exports = {
  successMessage,
};
