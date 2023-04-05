
/**
  * @since - release-1.0.0
  * @description - Main file for execution
  **/
const utils = require("./utils");
const createSpecfile = require("./createSpecFile");
const tsParser = require("./ts-parser/ts-parser");
const fs = require('fs');
const async = require('async');

if (!process?.argv?.at(2)) {
    throw new Error('Please provide directory path!')
}
if (!process?.argv?.at(3)) {
    throw new Error('Please provide file extensions for generating spec files!')
}
if (fs.access(process.argv.at(2), err => {
    if (err) {
        throw new Error('Directory doesnot exist!')
    }
})) { }

const userDirectory = process.argv.at(2);
const patterns = process.argv.at(3).split(',');
const exclusions = process.argv.at(4)?.split(',');

utils.getFilesInDirectoryAsync(userDirectory, patterns).then((data) => {
    async.eachSeries(data, function (filePath, arrayCallback) {
        async.waterfall([
            async.apply(tsParser.parseFile, filePath),
            utils.decorateData,
            async.apply(createSpecfile.createSpecfile, filePath)

        ], function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("res in waterfall", result);
                arrayCallback(null, filePath)
            }
        })
    }, function (err) {
        if (err) {
            console.log("An unexpected error occured", err)
        }
    })
})