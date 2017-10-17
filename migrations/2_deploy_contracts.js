const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
const BiathlonToken = artifacts.require("./BiathlonToken.sol");

module.exports = function(deployer) {
   deployer.deploy(Nodelist).then(function() {
  //  deployer.link(Nodelist, BiathlonNode);

      return Nodelist.address;
    }).then(function() {
      return deployer.deploy(BiathlonNode, Nodelist.address, 'Test node', 'Helsinki')
    .then(function() {
      return deployer.deploy(BiathlonToken, BiathlonNode.address, 'Test token', 'Tt', 2)
    .then(function() {
      console.log("biathlon deploy address is " + BiathlonNode.address + ' with ' + Nodelist.address);
      console.log("Token deploy address is " + BiathlonToken.address + ' with ' + BiathlonToken.node_address);
      });

    });
  })
};

// module.exports = function(deployer) {
//   deployer.deploy(Nodelist);
//   deployer.link(Nodelist, BiathlonNode);
//   deployer.deploy(BiathlonNode, Nodelist.address, 'Test node', 'Helsinki');
//   console.log('Nodelist is ' + Nodelist.address);
//   console.log('BiathlonNode is ' + BiathlonNode.address);
//
// };
