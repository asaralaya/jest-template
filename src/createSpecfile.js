/**
  * @since - release-1.0.0
  * @param  {string} fileName - The filename for which spec file needs tto be created
  * @param  {Object} parsedData - Object containing the required data from parsed file
  * @param  {function} createSpecCallback - Callback function for async
  * @description - This method will be used to find every file with the desired extention, even if its deeply nested in subfolders using recursion.
  */
const fs = require('fs');
const chalk=require('chalk')

const createSpecfile = (fileName, parsedData, createSpecCallback) => {
    let indexPosition = fileName.lastIndexOf('.')
    fileName = fileName.split('');
    // Insert the string at the index position
    fileName.splice(indexPosition, 0, '.spec')
    let specFilePath = fileName.join('')
    if (!fs.existsSync(specFilePath)) {
        const header = `/**
* Description.
* This spec file was created using jest-template plugin!
*
*/`
        const data = `
${header}

${parsedData.imports}

describe('${parsedData.className}', () => {
    let component: ${parsedData.className};

    ${parsedData.constructorInit}

    beforeAll(() => {
        component = new ${parsedData.className}(
            ${parsedData.constructorDefinition}
        )
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
            
    it('should create a instance of component', () => {
        expect(component).toBeTruthy();
    });
});`;

        fs.writeFile(specFilePath, data, 'utf8', function (err) {
            if (err) {
                createSpecCallback(new Error(chalk.red.bold("Failed to spec file for ", specFilePath)))
            } else {
                console.log(chalk.green.bold("Spec file created ✅:",chalk.underline( specFilePath)))
                createSpecCallback()
            }
        });
    }
    else {
        console.log(chalk.red.bold("Spec file already exists❗:", chalk.underline(specFilePath)))
        createSpecCallback()
    }
}

module.exports = { createSpecfile }