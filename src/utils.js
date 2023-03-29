/**
  * @since - release-1.0.0
  * @param  {string} directoryPath - The path for the directory where the search for files should take place
  * @param  {Array} pattern - The extension/pattern for files for the search
  * @param  {Array} excludeFolders - The folders that needs to be excluded from the search
  * @description - This file conttains methods that will be used to find every file with the desired extention, even if its deeply nested in subfolders using recursion and other util methods
  */

const path = require('path');
const fs = require('fs');
const util = require('util');
const fsReaddir = util.promisify(fs.readdir);
const fsLstat = util.promisify(fs.lstat);

async function getFilesInDirectoryAsync(directoryPath, pattern = [], excludeFolders = []) {
    let files = [];
    const filesFromDirectory = await fsReaddir(path.resolve(directoryPath)).catch(err => {
        throw new Error(err.message);
    });
    for (let file of filesFromDirectory) {
        const filePath = path.join(directoryPath, file);
        const stat = await fsLstat(filePath);

        // If we hit a directory, apply our function to that directoryPath. If we hit a file, add it to the array of files.
        if (!excludeFolders.some(v => filePath.includes(v))) {
            if (stat.isDirectory()) {
                const nestedFiles = await getFilesInDirectoryAsync(filePath, pattern, excludeFolders);
                files = files.concat(nestedFiles);
            } else {
                if (pattern.some(function (suffix) {
                    return filePath.endsWith(suffix)
                })) {
                    files.push(filePath);
                }
            }
        }
    };
    return files;
}

function decorateData(data) {
    const imports = []
    const constructorInit = []
    const constructorDefinition = []
    data.importsArray.forEach(function (arrayItem) {
        imports.push(`import { ${arrayItem.value} } from '${arrayItem.source}';`)
    })
    let constructorObj = Object.assign({}, ...data.constructorArray);
    constructorObj?.value?.params.forEach((item) => {
        item.parameter ?
            (constructorInit.push(`const ${item?.parameter?.name} :Partial<${item?.parameter?.typeAnnotation?.typeAnnotation?.typeName?.name}> ={};`),
                constructorDefinition.push(`${item?.parameter?.name} as ${item?.parameter?.typeAnnotation?.typeAnnotation?.typeName?.name}`)) :
            (constructorInit.push(`const ${item?.name} :Partial<${item?.typeAnnotation?.typeAnnotation?.typeName?.name}> ={};`),
                constructorDefinition.push(`${item?.name} as ${item?.typeAnnotation?.typeAnnotation?.typeName?.name}`))
    })
    return { className:data.className, imports: imports.join('\n'), constructorInit: constructorInit.join('\n\t'), constructorDefinition: constructorDefinition.join(',\n\t\t\t') }
}

module.exports = { getFilesInDirectoryAsync, decorateData }
