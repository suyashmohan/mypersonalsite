---
title:
  Writing your first Smart Contract using Solidity - Part 2 - Getting Started
  with Smart Contracts & Blockchain
author: Suyash Mohan
tags:
  - Blockchain
  - Smart Contracts
  - Ethereum
categories:
  - Blockchain
date: 2017-11-26 10:12:00
---

![](/images/first_smart_contract.png)

You can keep on reading theories and articles about Smart Contracts and Blockchain applications. But the real fun begins when we start writing the real code. Let's start writing our first Smart Contract.

<!-- more -->

Once you have acquired yourself with the understanding of [Blockchains and Smart contract](/posts/getting-started-with-smart-contracts-blockchain-part-0-understanding-basics/) and setup [Mist with Geth](/posts/setting-up-geth-mist-testrpc-part-1-getting-start-with-smart-contracts/), its time to write some real solidity code. We will begin with classical Hello World Program using Solidity. Smart Contracts serves a different purpose compared to other traditional technologies. Hence our Hello World Smart contract will also be a bit different from traditional printf("Hello, World!") examples.

Solidty feels a lot like Javascript. If you are already familiar with Javascript, writing code in Solidty can be easy for you. Even if you are totally new here, don't be afraid. It's easy to start with Solidity. In case you are willing, you can even try Remix IDE(https://remix.ethereum.org/). It's an easy and quick way to get started with writing Solidity code without installing or setting up anything. Open the website and write your code. You can even test your code there, as it comes with a simulator made to run inside the web browsers. Here I will be using Mist with Geth running locally to test our Smart Contract. As we move on writing complicated programs, it's a good idea to have everything setup on your local machine. 

# Contracts

Like classes are the soul of your Object-Oriented Programs, Contracts are the soul for your Blockchain Programs. Here is our first Hello World Contract in Solidity:

```
pragma solidity ^0.4.0;

contract Hello {
    string helloMsg;
    
    function Hello(string msgArg) public {
        helloMsg = msgArg;
    }
    
    function sayHello() public constant returns (string) {
        return helloMsg;
    }
}
```

Let's start digesting this program step by step.

Our program starts with `pragma solidity ^0.4.0`. This statement defines the characteristic about our program. Here we mentioned that our code is written in solidity and is compatible with 0.4.0 version compiler. This way we make sure proper compatibility is being taken care of.

Next is our Contract. As I explained earlier, like we define a class, we need to define a contract. We have created a Contract with name Hello. This contract has a member variable named `helloMsg`. This member is of string type. We are going to use it to store a message in it. To set the value for this member, we are using a constructor. To define a constructor define a new function with the same name as of Contract. We are taking a string argument and saving it in our `helloMsg` member.

Now we have our message stored in our Contract, we need a way to read it back. Hence we defined a member method named `sayHello` which can return the message we saved earlier. To define a method, we used `function` keyword and made it a public method that returns a constant string. In the body of the function, we returned the value of our stored message.

After we have written our program, we need to run it. That's simple too. If you have read my [previous blog](/posts/setting-up-geth-mist-testrpc-part-1-getting-start-with-smart-contracts/), you might be running a local `geth` server and having `Mist` connected to it. If not, then you must have it else you can use Remix IDE as mentioned above.

To run in Mist, go to Contracts section. You can see a tab saying `Contracts` at the top bar. Once you are inside the contracts section, click on the Deploy Contract button. This will take you to a screen where you can copy the above code. You need to select an account from where you want to execute the transaction. If there is a bug, you will see errors on the right side else on the right side you will see a drop-down list of your Contracts written on the left side editor. In our case we have one Contract named Hello, you will see it there. Select it. Selecting it will allow you to define arguments for the constructor. Here you can type something like "Hello! World". Then you can deploy it using the Deploy button down side. You will be asked to enter your passphrase. Once done, your contract will be deployed on the local blockchain. Now under Contracts section, you can see your Hello Contract. On selecting it will show you the sayHello method with the message you passed in argument. As our method was defined with the constant keyword, it directly shows the value. As we progress, you see that when you select a Contract, all your public methods will be visible here and you can call them to execute the respective functionality.

![](/images/mist_contract_code_hello.png)

If you were on MainNet the steps would have remained same and your contract will be deployed on the MainNet but you also need to pay a real transaction fee. It's a good idea to practice on PrivateNet or TestNet and later switch to MainNet when you are confident with your contract.

# Ethereum Virtual Machine & Gas

One important aspect while learning Smart Contracts is to understand the concept of Ethereum Virtual Machine(EVM) and gas. You can start with basic understanding but at least have an idea about these. 

Ethereum runs its Smart Contracts inside a virtual machine. This VM (virtual machine) is called Ethereum Virtual Machine. The EVM runs on the nodes in Blockchain. Since the contracts are running over the blockchain, it costs computational resources. Hence there is a fee attached to Smart Contract. Every step in your Smart Contract has a cost attached to it. This is called gas. More the computation is required, the higher will be the gas. This gas cost is paid using Ether, the currency of Ethereum. Solidity is one way to write programs for EVM. There are also other languages that can target EVM. For example, there is a programming language named Serpent, which has a syntax similar to Python. These languages target the EVM bytecode. This bytecode is eventually run by EVM. 

# Conclusion

Here we learned how to write a basic Contract and test it out on Mist connected to geth server running locally. We also had a basic introduction to EVM and Gas. As we progress, we will create complicated Contracts and try to have a deeper understanding of Smart Contracts in Ethereum.