/**
  * @since - release-1.0.0
  * @param  {string} fileName - The filename for which spec file needs tto be created
  * @param  {Object} parsedData - Object containing the required data from parsed file
  * @description - This method will be used to find every file with the desired extention, even if its deeply nested in subfolders using recursion.
  */
const fs = require('fs');

const createSpecfile = function (fileName, parsedData) {
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
            if (err) return console.log(err);
            console.log("Spec file created ✅:", specFilePath)
        });
    }
    else {
        console.log("Spec file already exists❗:", specFilePath)
    }
}

module.exports = { createSpecfile }