const utils = require('../src/utils');
const createSpecfile = require('../src/createSpecfile');
const tsParser = require('../src/ts-parser/ts-parser');
const mod = require('../src/templateBuilder');
const async = require('async');
const fs = require('fs');
const path = require('path')

describe('start function', () => {
  let utilsSpy;
  let createSpecfileSpy;
  let tsParserSpy;

  beforeEach(() => {
    utilsSpy = jest.spyOn(utils, 'getFilesInDirectoryAsync');
    createSpecfileSpy = jest.spyOn(createSpecfile, 'createSpecfile');
    tsParserSpy = jest.spyOn(tsParser, 'parseFile');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    let files = [];
    //Getting the files in the example folder recursively
    const getFilesRecursively = (directory) => {
      const filesInDirectory = fs.readdirSync(directory);
      for (const file of filesInDirectory) {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) {
          getFilesRecursively(absolute);
        } else {
          files.push(absolute);
        }
      }
    };

    getFilesRecursively(__dirname + '/example')
    files.forEach(file => {
      const fileDir = path.join('./', file);
      if (file.indexOf('app.service.spec.ts') == -1 && file.indexOf("spec.ts") > -1) {
        fs.unlinkSync(file);
      }
    });
  });

  test('should call utils.getFilesInDirectoryAsync with userDirectory, patterns, and exclusions', async () => {
    const userDirectory = './test/example';
    const patterns = 'service.ts,directive.ts';
    const exclusions = 'node_modules';
    await mod.start(userDirectory, patterns, exclusions);
    expect(utilsSpy).toHaveBeenCalledWith(userDirectory, patterns.split(','), exclusions.split(','));
  });
  test('should call utils.getFilesInDirectoryAsync with userDirectory, patterns', async () => {
    const userDirectory = './test/example';
    const patterns = 'service.ts';
    await mod.start(userDirectory, patterns);
    expect(utilsSpy).toHaveBeenCalled();
  });

  test('should log an error if async waterfall returns an error', async () => {
    const files = ['/path/to/file1', '/path/to/file2'];
    utilsSpy.mockResolvedValue(files);
    const testError = new Error('test error');
    tsParserSpy.mockImplementation((filePath, cb) => cb(testError));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    await mod.start('/path/to/directory', 'pattern1,pattern2');
    expect(consoleSpy).toHaveBeenCalledWith(testError);
  });
});

