const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");

const SecondNode = artifacts.require("./SecondNode.sol");
const BiathlonToken = artifacts.require("./BiathlonToken.sol");
const SecondBiathlonToken = artifacts.require("./SecondBiathlonToken.sol");
const TokenStorage = artifacts.require("./TokenStorage.sol");
const UpgradedNodelist = artifacts.require("./UpgradedNodelist");

module.exports = async function(deployer) {
  var sa;
  var c;
   deployer.deploy(Nodelist,  {from: web3.eth.accounts[0], gasPrice: 8000000000})
   .then(function() {
      console.log("nodelist address is " + Nodelist.address);
      return Nodelist.address;
    }).then(function() {
      return deployer.deploy(BiathlonNode, Nodelist.address, 'Kuusi Palaa', 'Helsinki', 'www.kuusipalaa.fi', {from: web3.eth.accounts[0], gasPrice: 8000000000})
    })
    .then(async function() {
      let node = await BiathlonNode.deployed()
      return await node.connect_to_nodelist()
    }).then(() => {
      return deployer.deploy(BiathlonToken, BiathlonNode.address, 'Kuusi Palaa points', 'ᵽ', 0, '0x0',  {from: web3.eth.accounts[0], gasPrice: 8000000000})
    }).then(async () => {
      let token = await BiathlonToken.deployed()
      return await token.register_with_node()
    })  
  }



// module.exports = function(deployer) {
//   deployer.deploy(Nodelist);
//   deployer.link(Nodelist, BiathlonNode);
//   deployer.deploy(BiathlonNode, Nodelist.address, 'Test node', 'Helsinki');
//   console.log('Nodelist is ' + Nodelist.address);
//   console.log('BiathlonNode is ' + BiathlonNode.address);
//
// };
