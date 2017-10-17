const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
const Ownable = artifacts.require('../contracts/ownership/Ownable.sol');
// ... more code
let nl;
let bn;


contract('BiathlonNode', function(accounts) {
  let ownable;

  beforeEach(async function() {
    bn = await BiathlonNode.deployed();
    nl = await Nodelist.deployed();
  });


  it('should have an owner', async function() {
    let owner = await bn.owner();
    assert.isTrue(owner !== 0);
  });

  it("should be able to register itself with the Nodelist contract", async function() {


    let registration = await bn.connect_to_nodelist();
    let new_node_count = await nl.count_nodes();
    assert.equal(new_node_count, 1, "Nodelist array doesn't have deployed Node");

  });

  it("should have a duplicate registration rejected", async function() {
    nl = await Nodelist.deployed();
    bn = await BiathlonNode.deployed();
    try {
      let registration = await bn.connect_to_nodelist();
      let new_node_count = await nl.count_nodes();
    } catch (error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject duplicate registration");

  });

})
