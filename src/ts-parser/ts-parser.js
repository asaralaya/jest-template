/**
  * @since - release-1.0.0
  * @param  {File} fileName - The filename that need to be parsed
  * @description - This method will be used to parse the ts file to get all the imports and constructor definitions
  */
const path = require('path');
const fs = require('fs');
const tsxc = require('@typescript-eslint/typescript-estree');

async function parseFile(fileName) {
    const fileContent = fs.readFileSync(fileName).toString();
    const parsedContent = tsxc.parse(fileContent)
    // console.log(JSON.stringify(parsedContent))
    let importedValue = [];
    let importsArray = []
    let constructorArray = []
    let className;
    await parsedContent.body.forEach(function (arrayItem) {
        if (arrayItem.type === 'ImportDeclaration') {
            importedValue = []
            for (let i = 0; i < arrayItem.specifiers.length; i++) {
                importedValue.push(arrayItem?.specifiers[i]?.local?.name)
            }
            importsArray.push({ value: importedValue, source: arrayItem?.source?.value })
        } else if (arrayItem.type === 'ExportNamedDeclaration') {
            className = arrayItem?.declaration?.id?.name;
            constructorArray = arrayItem?.declaration?.body.body.filter((val) => {
                return (val.type === 'MethodDefinition') && (val.key.name === 'constructor')
            })
        }
    });
    return { className, importsArray, constructorArray }
}

module.exports = { parseFile }

