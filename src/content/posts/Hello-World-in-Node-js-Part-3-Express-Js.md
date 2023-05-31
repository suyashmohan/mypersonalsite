---
title: Hello World in Node.js - Part 3 - Express.Js
author: Suyash Mohan
date: 2017-06-05 21:24:00
tags:
  - Javascript
  - Node.js
  - Express.js
categories:
  - Node.js
---
In [Part 1](/posts/hello-world-in-node-js-part-1-introduction/) & [Part 2](/posts/hello-world-in-node-js-part-2-npm/), we came to know how we can create a simple project in Node.js and print "Hello! World". But that's not much fun. Moreover, Node.js is famous for Server Side usage. Let's see how we can produce Hello! World using HTTP server. A number of good frameworks are available in Node.js for web development. The most famous one and my favorite one is Express.js.
<!-- more -->
Unlike other frameworks, Express.js does not feel bulky. It is simple to start with and powerful enough to take it to production. Express has been used a lot on production servers by lots of companies. Express.js has also been used as a base for several other frameworks.
To begin, create a new directory and create package.json like we learned in [Part 2](/posts/hello-world-in-node-js-part-2-npm/).
```sh
npm init
```
Next, we need to install express as our dependency. This can be done by using `npm install` command. Remember to use `--save` flag to also update package.json file.
```sh
npm install --save express
```
Run both the commands in terminal/command prompt. 
Now lets create index.js file and put the following content into it :
```javascript
const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('Hello! World');
});

app.listen(3000, ()=>{
    console.log('Server started');
});
```
This is our first Hello! World program using Express & Node.js. To run it, use the following command in terminal
```sh
node index.js
```
Explanation
-----------
Let's break down our program step by step.
```javascript
const express = require('express');
const app = express();
```
Since we are using express.js, we need to import it into our project. When we install express using `npm install` command, we downloaded it into our local `node_modules` folder. To use it inside our code, we need a reference to it. By using `require` we imported express. `const` keyword is used to define our identifier that will be used to reference express library. `const` is also used to refer to variables that are not going to refer anything else in future. Next, we created our app by creating an object of express and referencing it as 'app'. 
```javascript
app.get('/', (req, res)=>{
    res.send('Hello! World');
});
```
Now we need to define paths/routes for our server. `/` refers to root path or you can think of it as the home page in naive meaning. HTTP supports different ways to call a URL, for e.g. GET, POST, PUT, DELETE, etc. These methods define our intent, what we want to do with the URL. The default one is GET and is used to fetch details about a resource. Therefore we have used `app.get()` to get the page at `/` root URL. The next parameter in our call is a callback that we will use to respond to a request. We have defined a method that takes request as req and response as res. We can send any response by using `res.send()` method. Here we said Hello! World.
```javascript
app.listen(3000, ()=>{
    console.log('Server started');
});
``` 
We have created our app and defined what we are going to do for the requests. Now we have to start the server by listening over a port. Think of ports as doors to the server. The port number defines at what port we want to listen to the incoming requests. The default port for HTTP sites is 80. But since we are doing it for testing purpose we have used port 3000. Next is the callback, which takes a function that will be called when the server has started. Here we used it to print that our server has started.
Open your browser and open page by typing http://localhost:3000 in the address bar. You will see a Hello! World message. 

Hurray! We created our first server in Node.js