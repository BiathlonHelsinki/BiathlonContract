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
   deployer.deploy(Nodelist,  {from: web3.eth.accounts[0], gasPrice: 1000000000}).then(function() {
  //  deployer.link(Nodelist, BiathlonNode);
   
      return Nodelist.address;
    }).then(function() { 
      return deployer.deploy(BiathlonNode, Nodelist.address, 'Kuusi Palaa test node', 'Helsinki', {gasPrice: 1000000000})
    .then(function() {
      return deployer.deploy(BiathlonToken, BiathlonNode.address, 'KP Test points', 'Kpt', 0, '0x0', {gasPrice: 1000000000})
    .then(async function() {
       c = await BiathlonToken.deployed();
        sa = await c.storage_address.call();
        // console.log('sa is ' + sa);
        // let ts = await TokenStorage.at(sa);
        // console.log('ts is ' + ts);
        // let tsowner = await ts.owner();
        // console.log('owner is ' + tsowner);
        // console.log("biathlon deploy address is " + BiathlonNode.address);
        // console.log("Token deploy address is " + BiathlonToken.address);
        // console.log("Token storage address is " + sa);
        })
      // .then(function() {
      //   return deployer.deploy(SecondNode, Nodelist.address, 'Second node', 'Elsehwere', {from: web3.eth.accounts[6]})
      // .then(function() {
      //   // console.log('Second node is ' + SecondNode.address);

      //   return deployer.deploy(SecondBiathlonToken, BiathlonNode.address, 'Second test token', 'St', 2, sa)
      // .then(function() {
      //   // console.log("Second token deploy address is " + SecondBiathlonToken.address + ' with ' + SecondBiathlonToken.node_address);
      //   return deployer.deploy(UpgradedNodelist,  {from: web3.eth.accounts[8]})
      //   })
        .then(function() {
             console.log("nodelist address is " + JSON.stringify(Nodelist.abi))
             // console.log("node address is " + JSON.stringify(BiathlonNode.abi))
             // console.log("token is " + JSON.stringify(BiathlonToken.abi))
          // console.log('Second nodelist is ' + UpgradedNodelist.address);
        })
      });
    });

  };



// module.exports = function(deployer) {
//   deployer.deploy(Nodelist);
//   deployer.link(Nodelist, BiathlonNode);
//   deployer.deploy(BiathlonNode, Nodelist.address, 'Test node', 'Helsinki');
//   console.log('Nodelist is ' + Nodelist.address);
//   console.log('BiathlonNode is ' + BiathlonNode.address);
//
// };

