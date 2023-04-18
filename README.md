# Jest Template


Jest template package helps in creating jest spec files for your ts projects.


---
# Getting Started

## Step 1: Install the package

    npm install -g jest-template 

## Step 2: Run the command
 
    jest-template <folder> <file-pattern>
    
## Config property description
|Property Name| Description| Example
|--|----------------------|--|
| `folder` | path to folder name inside which the spec files should be created | ```./src/app/components```|
| `file-pattern` | comma separated patterns for files for which the spec files need to be created| ```service.ts,app.directive.ts```|
|

---
## Example command
    jest-template ./exampleFolder app.service.ts,app.component.ts
## License

This project is licensed under the MIT License. See LICENSE for more information.
