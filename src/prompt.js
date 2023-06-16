const prompts = require('prompts');
const chalk = require('chalk');
const templateBuilder = require("./templateBuilder");
const fs = require('fs');

const questions = [
  {
    type: 'text',
    name: 'path',
    message: 'Please provide a directory path!',
  },
  {
    type: (val) => fs.existsSync(val) ? (fs.readdirSync(val).length === 0 ? (console.log(chalk.yellow.bold('Provided path is empty')), process.exit(0)) : 'text') : (
      console.log(chalk.red.bold('Please provide a valid path')), process.exit(0)
    ),
    name: 'patterns',
    message: 'Please provide the file extensions for generating spec files!'
  },
  {
    type: 'confirm',
    name: 'choice',
    message: 'Do you want to provide exclusion paths?(y/n)',
  },
  {
    type: (prev) => prev == true ? 'text' : null,
    name: 'exclusions',
    message: 'Please provide the exclusion patterns'
  }
];

(async () => {
  const response = await prompts(questions);
  const _message = {
    'Source Directory': response.path,
    'File Extensions': response.patterns,
  }
  if (response.choice) _message['Exclusion Pattern'] = response.exclusions
  console.table(_message)
  const confirmMessage = await prompts([
    {
      type: 'confirm',
      name: 'value',
      message: 'Do you want to proceed with above configurations?'
    }
  ])

  if (confirmMessage.value)
    templateBuilder.start(response.path, response.patterns, response.exclusions)
})();