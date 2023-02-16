const fs = require('fs');
var path = require('path');

//reading path and filaname pattern from command line
const userDirectory = process.argv.at(2);
const fileName = process.argv.at(3);
var importsArray = []
var className

//method to create spec files
var createSpecfile = function (fileName, importsArray, className) {
    // files.forEach(fileName => {
    let indexPosition = fileName.lastIndexOf('.')
    fileName = fileName.split('');
    // Insert the string at the index position
    fileName.splice(indexPosition, 0, '.spec')
    let specFilePath = fileName.join('')
    if (!fs.existsSync(specFilePath)) {
        //copying the template
        fs.copyFileSync("./src/template.txt", specFilePath);
        fs.readFile(specFilePath, 'utf8', function (err, data) {
            var formatted = data.replace(/{{imports}}/g, importsArray).replace(/{{ClassName}}/g, className);
            fs.writeFile(specFilePath, formatted, 'utf8', function (err) {
                if (err) return console.log(err);
                console.log("Spec file created:", specFilePath)
            });
        });
    }
    else { console.log("Spec file already exists for:", specFilePath) }
    //   });
}

//method to search for files
var searchRecursive = function (startPath, filter) {
    var results = [];

    if (!fs.existsSync(startPath)) {
        console.log("No dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        if (filename.includes('node_modules') || filename.includes('.git') || filename.includes('coverage'))
            continue;
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results = results.concat(searchRecursive(filename, filter)); //recurse
        }
        else if (filename.indexOf(filter) >= 0) {
            results.push(filename);
        }
    }
    return results;
}

//reading original file
async function readOriginalfile() {
    for (let fileName of files) {
        importsArray = []
        const data = await fs.promises.readFile(fileName, 'utf-8');
        const contents = data.toString()
        for (const [str,] of contents.matchAll(/import([ \n\t]*(?:[^ \n\t\{\}]+[ \n\t]*,?)?(?:[ \n\t]*\{(?:[ \n\t]*[^ \n\t"'\{\}]+[ \n\t]*,?)+\})?[ \n\t]*)from[ \n\t]*(['"])([^'"\n]+)(?:['"])/g)) {
            importsArray.push(str.replaceAll('\n', ''))
        }
        for (const [str,] of contents.matchAll(/export class [A-Z][A-Za-z]*/g)) {
            let temp = str.split(" ")
            className = temp[2]
        }
        createSpecfile(fileName, importsArray, className);
    }
};

var files = searchRecursive(userDirectory, fileName);
readOriginalfile();


