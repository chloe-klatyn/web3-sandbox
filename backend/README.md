# klaytn-contracts

This repository contains contracts that are helpful to building blockchain applications on Klaytn.

Some files were derived from [openzeppelin contracts v2.3.0](https://github.com/OpenZeppelin/openzeppelin-contracts/releases/tag/v2.3.0).

# Security

WARNING: Please take special care when you use this code in production. We take no responsibility for any security problems you might experience.
If you find any security problems in the source code, please report it to developer@klaytn.com.

# Prerequisites

The following packages should be installed before using this source code.

* git
* docker
* Node v10.21.0
* Truffle v5.1.61
* jq (https://stedolan.github.io/jq/)

# Package Installation

Please install node packages first.

```bash
$ npm install
$ npm install -g truffle@v5.1.61
$ npm install -g ganache-cli@v6.12.1
```

# How to run Ganache

[Ganache](https://www.trufflesuite.com/ganache) is a local blockchain environment for easy testing.
Klaytn is a fork of Ethereum and compatible with Constantinople EVM, so you can use Ganache for testing.
To run a Ganache, execute the following command:

```bash
$ npm run run:ganache
```

This ganache network is defined as "development" network in [truffle-config.js](truffle-config.js)

# How to run a Local Klaytn Network

You can easily deploy a local Klaytn network via the following command:

```bash
$ npm run run:klaytn
```

To see the execution logs, run `npm run run:klaytn:log`.
To stop the network, run `npm run run:klaytn:stop`.
To resume the network, run `npm run run:klaytn:resume`.
To completely terminate the network, run `npm run run:klaytn:terminate`.
To remove log files, run `npm run run:klaytn:cleanlog`.
