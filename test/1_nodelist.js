const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
// ... more code
var nl;
var bn;


contract('Nodelist', function(accounts) {

  it("should count zero nodes", async function() {
    nl = await Nodelist.deployed();
    let count = await nl.count_nodes();
    assert.equal(count, 0, "not a blank list to start with")
  });

  it("should have same address for BiathlonNode initialiser", async function() {
    bn = await BiathlonNode.deployed();
    let nla = nl.address;
    let bna = await bn.nodelist_address();
    assert.equal(bna, nla, "BiathlonNode isn't initialized with correct address");
  })

})
