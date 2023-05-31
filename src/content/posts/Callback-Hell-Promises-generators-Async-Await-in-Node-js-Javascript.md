---
title: 'Callback Hell, Promises, Generators & Async-Await in Node.js/Javascript'
author: Suyash Mohan
date: 2017-06-17 09:41:00
tags:
  - Node.js
  - Javascript
categories:
  - Node.js
---
If you have ever worked with javascript even for few minutes, chances are you have already used callbacks. Callbacks are a great way to do asynchronous programming. Javascript/Node.js embraces it more than anything. They are everywhere. It might be fun to start with callbacks, but soon they become a hell.
<!-- more -->
Callback Hell
-------------
[http://callbackhell.com/](http://callbackhell.com/) explains callback hell in very good manner. It's a situation you get into when you have to call asynchronous code with an asynchronous flow. In simple words, calling callbacks inside each other. Nothing gets broken. It will still work but it becomes messy and difficult to understand what's going on there. Let's take an example:

```javascript
const addOneTo = function(number, callback){
    let result = number + 1;
    if(callback)
        callback(result);
}

// 5 + 1 = 6
addOneTo(5, function(res){
    console.log(res);
})
```

Here we defined a method named addOneTo that takes a number and returns number+1 through a callback. This is a simplified example, usually, I/O or time-consuming tasks are done using callbacks. Anyways we defined this method and then called it and got the result through the callback.

But what if we want to add 5 times one to 5 using the addOneTo method.

```javascript
// 5 + 1 + 1 + 1 + 1 + 1 = 10
addOneTo(5, function(res1){
    addOneTo(res1, function(res2){
        addOneTo(res2, function(res3){
            addOneTo(res3, function(res4){
                addOneTo(res4, function(res5){
                    console.log(res5);
                });
            });
        });
    });
});
```

Woah!!! What the hell! This is callback hell. It works, but it's messy and difficult to understand. 

Promises
--------

Promises are a great way to solve callback hells. In promises, we instead of calling the callback with the result, we return a promise that we are going to get you a result in future. Take a look at our new promise based addOneTo method

```javascript
const addOneTo = function(number){
    let result = number + 1;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}


// 5 + 1 = 6
addOneTo(5)
    .then(function(res){
        console.log(res);
    });
```

A promise is an object that is returned immediately but the result arrives later in future. Promise takes a method with two arguments, `resolve` and `reject`. `resolve` is called when we have a result and reject is called when we have an error. This promise object returned has two methods, `then` and `catch`. `then` gets the result which was raised through the `resolve` method. `catch` gets the error thrown with the reject method. Mozilla has a great a documentation for [Promises](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise). Using promises we can chain our asynchronous call in a synchronous manner.

```javascript
// 5 + 1 + 1 + 1 + 1 + 1 = 10
addOneTo(5)
    .then(function(res1){
        return addOneTo(res1);
    })
    .then(function(res2){
        return addOneTo(res2);
    })
    .then(function(res3){
        return addOneTo(res3);
    })
    .then(function(res4){
        return addOneTo(res4);
    })
    .then(function(res5){
        console.log(res5);
    })
```

This code is very simple to understand and easy to maintain. We can clearly see which code is called after which code and everything is still asynchronous.

Generators
-------------
The approach to promises works fine. But still, it can be made simpler and cleaner using generators. Generators are functions with \*. `function *()` is a generator. Generators are lightweight coroutines. Generators are functions which can be suspended or resumed in future. Usually, you won't be directly dealing with generators yourself. There are libraries that use them and you can use these libraries to utilize generators. One such great library is `co`.

```javascript
const co = require('co');

const addOneTo = function(number){
    let result = number + 1;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}

co(function *(){
    let res1 = yield addOneTo(5);
    let res2 = yield addOneTo(res1);
    let res3 = yield addOneTo(res2);
    let res4 = yield addOneTo(res3);
    let res5 = yield addOneTo(res4);

    return res5;
})
.then(function(result){
    console.log(result);
});
```

Here we wrote the same program we did with promises, using generators along with promises. The original method addOneTo remains the same. But how it is used is changed. We have used `co` library which provides a way to wrap generator method. There is also a new keyword `yield`. `yield` suspends the generators and only resumes it when we have received a result. This code looks just like synchronous code. But everything is still asynchronous. This made our program more clear to understand and extend later on.

Async & Await
-------------

Wellcome to the future. Async & Await are the next steps to the generators. Just like generators they also utilize promises but you don't have to deal with 3rd party library such as `co`. Neither you have to get confused with `*` symbol. To use this feature, you need to define your method with `async` keyword to represent that our method is going to call asynchronous calls. Now we use `await` keyword to wait and fetch the result. 

```javascript
const addOnTo = function(number){
    let result = number + 1;
    return new Promise(function(resolve, reject){
        resolve(result);
    });
}

async function main(){
    let res1 = await addOnTo(5);
    let res2 = await addOnTo(res1);
    let res3 = await addOnTo(res2);
    let res4 = await addOnTo(res3);
    let res5 = await addOnTo(res4);

    console.log(res5);
}

main();
```

This approach is cleaner and easier to maintain compared to all other techniques discussed above.

All this code was tested using latest version of Node.js i.e. 8.0. Hope I was able to clearly explain all these topics clearly and with good examples. Hope you liked this post. If you have any question, advice, or query just comment it down.

