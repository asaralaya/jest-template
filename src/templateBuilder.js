
/**
  * @since - release-1.0.0
  * @description - Main file for execution
  */
const userDirectory = process.argv.at(2);
const patterns = process.argv.at(3).split(',');
const utils = require("./utils");
const createSpecfile = require("./createSpecFile");
const tsParser = require("./ts-parser/ts-parser");

utils.getFilesInDirectoryAsync(userDirectory, patterns).then((data) => {
    for (let fileName of data) {
        tsParser.parseFile(fileName).then(d => {
            const data = utils.decorateData(d)
            createSpecfile.createSpecfile(fileName,data)
        }
        )
    }
})
