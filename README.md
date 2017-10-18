# Biathlon (Solidity contracts)
Solidity/truffle contracts for Biathlon (for Ethereum).


## Caveat!!
This is very much an early work in progress and nowhere near ready for production.

## Overview
[Biathlon](http://biathlon.io) is a toolkit for designing and producing collaborative creative/cultural spaces. A Biathlon node can choose to issue tokens to its in-person participants, which are linked together on Ethereum's blockchain, creating a decentralised network of initiatives.


## How it should work

### Nodelist
The "master" Biathlon nodelist is not yet deployed on Ethereum, but will be hopefully in early 2018. This is a contract that will catalogue the nodes of Biathlon.

### BiathlonNode
Any individuals, organisations or initiatives wishing to participate in Biathlon can deploy a BiathlonNode contract, pointing to the master Nodelist address (not yet available) and registering their initiative on the Nodelist.

By being registered in Biathlon, any ERC20 tokens created  through that BiathonNode will be designated as a "Biathlon token", and therefore can be recognised by other initiatives in the list, and exchanged with them (if so desired).

Additionally, any Ethereum account holding one of these tokens can be recognised by any other nodes using Biathlon, via the check-in system or other functions.
