
const fs = require('fs');
var path = require('path');
const fsPromises = fs.promises;


//reading path and filaname pattern from command line
const userDirectory = process.argv.at(2);
const fileName = process.argv.at(3);
var importsArray = [];
var className


//method to search for the file in the directory
var searchRecursive = function (dir, pattern) {

    // This is where we store pattern matches of all files inside the directory
    var results = [];

    // Read contents of directory
    fs.readdirSync(dir).forEach(function (dirInner) {
        if (dirInner.includes('node_modules') || dirInner.includes('.git') || dirInner.includes('coverage'))
            return;
        // Obtain absolute path
        dirInner = path.resolve(dir, dirInner);

        // Get stats to determine if path is a directory or a file
        var stat = fs.statSync(dirInner);

        // If path is a directory, scan it and combine results
        if (stat.isDirectory()) {
            results = results.concat(searchRecursive(dirInner, pattern));
        }

        // If path is a file and ends with pattern then push it onto results
        if (stat.isFile() && dirInner.match(pattern)) {
            results.push(dirInner);
        }
    });
    return results;
};

//method to create spec files
var createSpecfile = function () {
    files.forEach(fileName => {
        let indexPosition = fileName.lastIndexOf('.')
        fileName = fileName.split('');
        // Insert the string at the index position
        fileName.splice(indexPosition, 0, '.spec')
        let specFilePath = fileName.join('')
        fs.copyFileSync("./src/template.txt", specFilePath);
    });
}

var readOriginalfile = function () {
    files.forEach(fileName => {
        //reading original file
        fs.readFile(fileName, 'utf-8', (error, data) => {
            if (error) throw error;
            var array = data.toString().split("\n");
            for (let i in array) {
                if (array[i].startsWith('import')) {
                    importsArray.push(array[i])
                }
                else if (array[i].includes('export class')) {
                    let temp = array[i].split(" ")//now you have 3 words in temp
                    className = temp[2]
                }
            }
            console.log(importsArray)
        });


        // const origin = fs.createReadStream(fileName, {
        //     flags: 'r',
        //     // read data as a string not as a buffer
        //     encoding: 'utf8'
        // });
        // const transform = new stream.Transform({
        //     // accept data as a strings
        //     writableObjectMode: true,
        //     transform: function removeNewLines(chunk, encoding, callback){
        //         callback(null, chunk.replace(/\n/g, ''));
        //     }
        // });
        // const destination = fs.createWriteStream('input.txt', {
        //     flags: 'w+',
        //     // write data as a strings, this is default value
        //     encoding: 'utf8'
        // });

        // origin.pipe(transform).pipe(destination);

    });


}

var files = searchRecursive(userDirectory, fileName);
createSpecfile();
readOriginalfile();


