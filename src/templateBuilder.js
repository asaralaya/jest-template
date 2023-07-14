#!/usr/bin/env node
/**
  * @since - release-1.0.0
  * @description - Entrypoint for execution
    @param  {string} userDirectory - The path for the directory where the search for files should take place. Input is recieved from promt
  * @param  {Array} patterns - The extension/pattern for files for the search. Input is provided from the prompt
  * @param  {Array} exclusions - The folders that needs to be excluded from the search. Input is provided from the prompt
  **/
const utils = require("./utils");
const createSpecfile = require("./createSpecfile");
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

