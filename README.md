# Angular Jest Spec Generator

![npm](https://img.shields.io/npm/v/node-keyword-scrapper.svg?style=for-the-badge&logo=npm "npm")
![js](https://camo.githubusercontent.com/9d07c04bdd98c662d5df9d4e1cc1de8446ffeaebca330feb161f1fb8e1188204/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4a6176615363726970742d4637444631453f7374796c653d666f722d7468652d6261646765266c6f676f3d6a617661736372697074266c6f676f436f6c6f723d626c61636b "js")
![node](https://camo.githubusercontent.com/dfc69d704694f22168bea3d84584663777fa5301dcad5bbcb5459b336da8d554/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4e6f64652e6a732d3433383533443f7374796c653d666f722d7468652d6261646765266c6f676f3d6e6f64652e6a73266c6f676f436f6c6f723d7768697465 "node")


This plugin is designed to simplify the process of creating barebone structure for Angular spec files by analyzing the imports and constructor definitions of Angular components.
This plugin is capable of generating spec files in the given folder recursively.
It currently supports **Jest** as the testing framework.

![mit](https://camo.githubusercontent.com/57b1ff17b6c633342f74f1da24a73fa090a8e9141b058f56d242b1ba4229e544/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f6c2f6e67782d73696d706c652d736c69636b "mit")
![actions](https://camo.githubusercontent.com/f0acbdace9431d2a168a8a53637655735a6fd6eee112155fd7f6daac3ff47f18/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f2d4769746875625f416374696f6e732d3230383846463f7374796c653d666c61742d737175617265266c6f676f3d6769746875622d616374696f6e73266c6f676f436f6c6f723d7768697465 "actions")
[![Coverage Status](https://coveralls.io/repos/github/asaralaya/jest-template/badge.svg?branch=main)](https://coveralls.io/github/asaralaya/jest-template?branch=main)
---

---
## Installation

To install the Angular Test Generator plugin, follow these steps:

1. Open your Angular project in the terminal.

2. Run the following command to install the plugin globally:

 ```   
 npm install -g ng-test-barrel
 ```

---
## Usage
Once you have installed the plugin, you can use it to generate spec files for your Angular entities. Follow the steps below:

1. Open a terminal in your Angular project's root directory.

2. Run the following command to execute the Angular Test Generator:
 ```
ng-test-barrel
```  
3. Follow the prompts and provide the inputs
4. The plugin will analyze your Angular component,services' imports and constructor definitions and generate corresponding spec files in the appropriate directories if they doesnot exist already

5. You can review the generated skeleton spec files to ensure they meet your testing requirements. Feel free to modify them as needed.


---
## Prompt property description
|Property Name| Description| Example
|--|----------------------|--|
| `1.folder` | path to folder inside which the search has to take place and spec files should be created | ```./src/app/components```|
| `2.file-pattern` | comma separated patterns for files for which the spec files need to be created| ```service.ts,app.directive.ts```|
| `3.exclusion-path` | optional field-  the folders/files that need to be excluded from the search | ```./src/app/components/test```|

---
## License

This project is licensed under the MIT License. See LICENSE for more information.
