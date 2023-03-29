# Jest Template


Jest template package helps in creating jest spec files for your ts projects.


---
# Getting Started

## Step 1: Install the package

    npm install jest-template -g

## Step 2: Run the command
 
    node <path-to-jest-template>/templateBuilder.js <folder> <file-pattern>
    
## Config property description
|Property Name| Description| Example
|--|----------------------|--|
| `path-to-jest-template` | The path where the package is installed  | `./node_modules/jest-template` |
| `folder` | path to folder name inside which the spec files should be created | ```./src/app/components```|
| `file-pattern` | comma separated patterns for files for which the spec files need to be created| ```service.ts,app.directive.ts```|
|

---
## Example command
    node ./dist/templateBuilder.js ./exampleFolder app.service.ts,app.component.ts
## License

This project is licensed under the MIT License. See LICENSE for more information.
