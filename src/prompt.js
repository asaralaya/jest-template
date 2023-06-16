const prompts = require('prompts');
const templateBuilder = require("./templateBuilder");
const fs = require('fs');

const questions = [
  {
    type: 'text',
    name: 'path',
    message: 'Please provide a directory path!',
  },
  {
    type: (val) => fs.existsSync(val) ? 'text' : (console.log('Please provide a valid path'), process.exit(0)),
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
  templateBuilder.start(response.path, response.patterns, response.exclusions)
})();