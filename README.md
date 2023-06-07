# Jest Template


![npm](https://img.shields.io/npm/v/node-keyword-scrapper.svg?style=for-the-badge&logo=npm "npm")
![js](https://camo.githubusercontent.com/9d07c04bdd98c662d5df9d4e1cc1de8446ffeaebca330feb161f1fb8e1188204/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b "js")
![node](https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465 "node")


Jest template package helps in generating jest spec files for your ts projects!.
It will parse your ts files and extract all the imports and constructor definitions from those files to generate the spec files.

![mit](https://camo.githubusercontent.com/57b1ff17b6c633342f74f1da24a73fa090a8e9141b058f56d242b1ba4229e544/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6e67782d73696d706c652d736c69636b "mit")
![actions](https://camo.githubusercontent.com/f0acbdace9431d2a168a8a53637655735a6fd6eee112155fd7f6daac3ff47f18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4769746875625f416374696f6e732d3230383846463f7374796c653d666c61742d737175617265266c6f676f3d6769746875622d616374696f6e73266c6f676f436f6c6f723d7768697465 "actions")
---

## Getting Started

## Step 1: Install the package globally

    npm install -g jest-template 

## Step 2: Run the command
 
    jest-template <folder> <file-pattern> [optional]<exclusion-path>
    
## Configuration property description
|Property Name| Description| Example
|--|----------------------|--|
| `folder` | path to folder inside which the search has to take place and spec files should be created | ```./src/app/components```|
| `file-pattern` | comma separated patterns for files for which the spec files need to be created| ```service.ts,app.directive.ts```|
| `exclusion-path` | optional field-  the folders/files that need to be excluded from the search | ```./src/app/components/test```|


---
## Example command
    jest-template ./exampleFolder app.service.ts,app.component.ts

---
## License

This project is licensed under the MIT License. See LICENSE for more information.
