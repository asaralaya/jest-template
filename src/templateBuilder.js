#!/usr/bin/env node
/**
  * @since - release-1.0.0
  * @description - Main file for execution
  **/
const utils = require("./utils");
const createSpecfile = require("./createSpecFile");
const tsParser = require("./ts-parser/ts-parser");
const fs = require('fs');
const async = require('async');
const chalk = require('chalk');

if (!process?.argv?.at(2)) {
    throw new Error(chalk.red.bold('Please provide a directory path!'))
}
if (!process?.argv?.at(3)) {
    throw new Error(chalk.red.bold('Please provide the file extensions for generating spec files!'))
}
if (fs.access(process.argv.at(2), err => {
    if (err) {
        throw new Error(chalk.red.bold('Directory doesnot exist!'))
    }
})) { }

const userDirectory = process.argv.at(2);
const patterns = process.argv.at(3).split(',');
const exclusions = process.argv.at(4)?.split(',');

utils.getFilesInDirectoryAsync(userDirectory, patterns, exclusions).then((data) => {
    async.eachSeries(data, function (filePath, arrayCallback) {
        async.waterfall([
            async.apply(tsParser.parseFile, filePath),
            utils.decorateData,
            async.apply(createSpecfile.createSpecfile, filePath)

        ], function (err) {
            if (err) {
                console.log(err)
            } else {
                arrayCallback(null, filePath)
            }
        })
    }
    , function (err,res) {
        if (err) {
            console.log(chalk.red.bold("An unexpected error occured", err))
        }
    })
})