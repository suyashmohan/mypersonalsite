---
title: Hello World in Node.js - Part 1 - Introduction
author: Suyash Mohan
date: 2017-06-04 01:22:00
tags:
  - Node.js
  - Javascript
categories:
  - Node.js
---
Node.js is a standalone implementation of Javascript using Google Chrome's v8 engine. Although Node.js can be used in a lot of ways, Node.js has found a lot of popularity on the server side. Node.js has a great package manager called 'Node Package Manager(NPM)'. The community has created countless libraries and frameworks, and all can be fetched through npm.
<!-- more -->
Learning Node.js can make a lot of sense if you are already familiar with Javascript. Even if you are new to Javascript, you can directly begin your learning journey with Node.js. Although I won't be covering basics of Javascript here.

Installing Node.js
-----------

Node.js can be downloaded from its official [website](https://nodejs.org/en/download/). Steps to install it are pretty much the same as you would have installed any other application on your system. Node.js is supported on all major platforms including Windows, Linux & Mac OS. Make sure node and npm commands are available in your terminal or command prompt.

Creating a Project
-----------
Starting in Node.js is easy. You can start by creating a plain javascript file and executing it with node command. For example:

* Create index.js and put the following in it
```javascript
console.log("Hello, World!");
```
* Execute index.js in terminal
```sh
node index.js
```
* Output
```
Hello, World
```

*__Tada!!!__* You created your first Node.js Hello World Program.

Next
----

Let's continue to [Part 2](/posts/hello-world-in-node-js-part-2-npm/), where we are going to discuss about NPM.