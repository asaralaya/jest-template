#!/usr/bin/env node
/**
  * @since - release-1.0.0
  * @description - Main file for execution
  **/
const utils = require("./utils");
const createSpecfile = require("./createSpecFile");
const tsParser = require("./ts-parser/ts-parser");
const async = require('async');
const chalk = require('chalk');

const start = (userDirectory, patterns, exclusions) => {
    patterns = patterns.split(',');
    if (exclusions) exclusions = exclusions.split(',');
    return utils.getFilesInDirectoryAsync(userDirectory, patterns, exclusions).then((data) => {
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
            , function (err, res) {
                if (err) {
                    console.log(chalk.red.bold("An unexpected error occured", err))
                }
            })
    })
}
module.exports = { start }

