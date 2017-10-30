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
    assert(bna, nla); //, "BiathlonNode isn't initialized with correct address");
  })

  it('should be active after initialisation', async function() {
    let active = await nl.is_current.call();
    
    assert.isTrue(active);
  });

  it('should not allow non-nodes to register a user on the Nodelist', async function() {
    nl = await Nodelist.deployed();
    try {
      let fru = await nl.find_and_or_register_user(accounts[4], accounts[2]);
    } catch(error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
  });
})
