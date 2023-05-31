---
title: Hello World in Node.js - Part 2 - NPM
author: Suyash Mohan
date: 2017-06-04 09:11:00
tags:
  - Node.js
  - Javascript
  - NPM
categories:
  - Node.js
---
Node.js comes with a helpful utility tool, Node.Js Package Manager(NPM). NPM is used to manage your dependencies. But NPM is not just for dependencies, it can be used to create and run custom commands against your project like testing, starting server, etc. You can also install other helpful tools and utility programs globally in your system.
<!-- more -->
In [Part 1](/posts/hello-world-in-node-js-part-1-introduction/), we created the index.js file and ran it with `node index.js` command in terminal. Along with it, we are also going to create a new file `package.json`. Let's create a new folder and move the index.js file into it. Now create package.json file with it.

Package.json
-------

`package.json` file contains all the metadata about our project. It describes our project, like who created this project, what's the current version, license, etc. But the most important use of package.json file is defining dependencies for our project. The advantage using package.json file is that you can take your code anywhere and use npm to install all the dependencies.

A Sample package.json file looks like this

```json
{
  "name": "npm_intro",
  "version": "1.0.0",
  "description": "An introduction to NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "introduction",
    "tutorial",
    "npm"
  ],
  "author": "Suyash Mohan",
  "license": "ISC"
}
```
More about package.json can be read [here](https://docs.npmjs.com/files/package.json).

You can create this file yourself in your editor or use `npm init` command in terminal. I prefer using `npm init` command. It will ask you default values for all the above fields and save it as package.json file. The above file was created using `npm init` command only.

Packages
-----
The strength of NPM comes from its vast list of packages created by the community.

In our example, we console logged "Hello World". But that is boring. Let's give color to our message. We don't have to go crazy and write all the logic our self to figure out how to print a message in color. We are going to use a very helpful package named [chalk](https://www.npmjs.com/package/chalk).

To add `chalk` to our dependency list, we can either type it out ourself in package.json file or use the following command
```sh
npm install --save chalk
```
This will download the chalk package. The `--save` flag also saves this information in our package.json file. All packages are downloaded and stored in `node_modules` folder. Our directory should look like this
```
├── index.js
├── node_modules
|  ├── ansi-regex
|  ├── ansi-styles
|  ├── chalk
|  ├── escape-string-regexp
|  ├── has-ansi
|  ├── strip-ansi
|  └── supports-color
└── package.json
```
Wait a minute! We installed chalk what all are these folders in node_modules. These are the dependencies being used by chalk package. That's how npm manages all the dependencies.

Our `package.json` file will now look like this.
```json
{
  "name": "npm_intro",
  "version": "1.0.0",
  "description": "An introduction to NPM",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "introduction",
    "tutorial",
    "npm"
  ],
  "author": "Suyash Mohan",
  "license": "ISC",
  "dependencies": {
    "chalk": "^1.1.3"
  }
}
```
Now our `package.json` contains dependencies section and dependency chalk package in it. `^1.1.3` is the version of chalk being used. This ensures, our project will always use this version, reducing the chance of incompatibility with the future version. You can, of course, change the version to your choice.

Scripts Section in package.json
------------------
The `scripts` section in package.json is a very powerful feature. We can define custom commands to execute with `npm` command. For example:
```json
"scripts": {
    "start": "node index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
```
Now we can call `npm start` or `npm run start` to execute our start script instead of calling `node index.js`.

Installing global packages.
----------------

Another important use I found about NPM is to install utility programs or tools available on NPM's registry. Once installed globally, these programs become available independent of your project.

I have created a tree structure for our project. I didn't this by hand because I don't have to. I found a great tool on NPM - [tree-cli](https://www.npmjs.com/package/tree-cli) which can be used to create tree diagrams for any structure. To install it, I ran the following command
```sh
npm install -g tree-cli
```
If you are on Mac OS or Linux, you might need to run it with `sudo` command if you don't have root access.
`tree-cli` gave me `tree` command. I can run tree command in any directory in my terminal to produce tree structure of it like this:
```sh
tree -l 2
```

Phew!!! It was a lot of stuff. If you have any doubt/advice please put it in the comments section.

Next
----
Continue to [Part 3](/posts/hello-world-in-node-js-part-3-express-js/) to get started with Express.js and create your first server.