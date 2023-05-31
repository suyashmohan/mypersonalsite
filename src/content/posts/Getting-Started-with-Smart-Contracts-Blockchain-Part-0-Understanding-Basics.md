---
title: Getting Started with Smart Contracts & Blockchain - Part 0 Understanding Basics
author: Suyash Mohan
date: 2017-09-12 15:21:00
tags:
  - Blockchain
  - Smart Contracts
  - Ethereum
categories:
  - Blockchain
---

![](/images/Blockchain_Smart_Contracts.png)

There are really low chances that you haven't heard about Bitcoin. There have been numerous stories of people getting higher returns after they invested in it. Then there are people talking about how Bitcoin is revolutionizing financial domain. Some even worship Bitcoin and want to throw away Banks and Governments :P

I always thought Bitcoin just as a cryptocurrency, but never realized the power of underlying technology: Blockchain. Bitcoin became famous for using Blockchain. It's this Blockchain that makes Bitcoin decentralized, secure and immutable. So what is a blockchain? Let's find out.

<!-- more -->

Blockchain
----------

Blockchain in simple words is a huge ledger of transactions distributed over numerous devices. Think of it as a big excel sheet containing records of transactional information, for e.g. John sent $20 to Emma.

![](/images/ledger.png)

The key difference is everyone will have a copy of that sheet. So, every time a transaction is recorded, everyone's copy is updated. This way there is no centralization and hence If anyone modifies it, his/her copy will be different than others on the network. These records are stored inside blocks. Blocks are nothing but a collection of records with a certain size limit. When the block gets full, a new block is created and the new block is attached to the previous block. Thus forming a chain of blocks. Hence the name blockchain came.

What makes blockchain secure is hashing. In simple words, hashing is the process of creating a digital signature. This signature is specific to the contents of the block. So even a single change, will result in a different signature. Hence this makes it secure. Also, each block contains a hash of the previous block. So if any block gets modified, its hash value will chain resulting in the change in hash values of next block, as result, the whole chain will break. This hash value is generated using a mathematical formula. For. e.g. Bitcoin's blockchain uses SHA-256 algorithm to generate the hash value. With time hash values start to get really complicated and a single man with a simple computer can't calculate these values. Hence, miners are required. These miners have special hardwares like GPUs to calculate the hash values. To understand why the complexity increases, think of mathematical function square.

![](/images/square.png)

As you can see every calculation makes it more difficult to calculate the next calculation.

Miners verify the transaction and write it to the block. Then they calculate the hash values and writes it back the block to the Blockchain. Since miners are putting in their resources and effort, they are rewarded with bitcoins. There is a certain amount that is paid to the miners for creating each block. The reward is split between the miners who participated in the creation of that block.

Smart Contracts
---------------

Bitcoin was simply created as a currency for the new decentralized world. But the underlying technology, Blockchain was very powerful and could be used for more than transferring Cryptocurrency. That's what Ethereum is about. Ethereum took the idea of Blockchain and created an EVM (Ethereum Virtual Machine) on top of the Blockchain. The currency used for Ethereum is Ether. Unlike Bitcoin, where a user account is a combination of public and private key, Ethereum supports one more type of user account other than public/private key. This is called Smart Contracts.

Smart Contracts are created through writing specific programs. The programming language used for creating Smart Contracts for Ethereum is Solidity. These programs written in Solidty runs on Ethereums Virtual Machine. The advantage of creating Smart Contracts is that they can behave automatically and take decisions regarding transactions themselves. For e.g. You may create a Smart Contract that dispatches salaries to all your employees based on their performance by the end of the month automatically. Thereby removing middlemen. There are many ways Smart Contracts can change the behavior of our organizations. The apps developed using such technology are called Dapp as they are decentralized Apps. There is one more important term and that is DAO. DAO stands for Decentralized Autonomous Organisations. The aim is to use Smart Contracts such that they are decentralized and can take automatic decisions in an organization. This can solve many problems such as corruption, mismanagement, save cost and many more advantages.

Next Steps
----------
Here we have covered basic details about the Blockchain and Smart Contracts. In next part, we will set up Geth, Mist, and TestRPC. You can read that article [here](/posts/setting-up-geth-mist-testrpc-part-1-getting-start-with-smart-contracts/).