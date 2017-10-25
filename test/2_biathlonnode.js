const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
const Ownable = artifacts.require('../contracts/ownership/Ownable.sol');
const SecondNode = artifacts.require("./SecondNode.sol");
const SecondBiathlonToken = artifacts.require("./SecondBiathlonToken.sol");
const BiathlonToken = artifacts.require("./BiathlonToken.sol");
// ... more code
let nl;
let bn;


contract('BiathlonNode', function(accounts) {
  let ownable;

  beforeEach(async function() {
    bn = await BiathlonNode.deployed();
    nl = await Nodelist.deployed();
    sn = await SecondNode.deployed();
  });


  it('should have an owner', async function() {
    let owner = await bn.owner();
    assert.isTrue(owner !== 0);
  });

  it("should be able to register itself with the Nodelist contract", async function() {
    let registration = await bn.connect_to_nodelist();
    let new_node_count = await nl.count_nodes();
    assert.equal(new_node_count, 1, "Nodelist array doesn't have deployed Node");
    let oldnode_lookup = await nl.look_for_node.call(bn.address);
    assert.isTrue(oldnode_lookup[1]);
  });

  it("should be able to register a user into the Nodelist", async function() {
    let registration = await bn.register_user(accounts[1]);
    let new_user_count = await nl.count_users();
    assert.equal(new_user_count, 1, "User is not registered");

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


  //  second node stuff

  it('should not have the second node, after deployment, be present in the Nodelist', async function() {
    let nodelist_lookup = await nl.look_for_node.call(sn.address);
    assert.equal("none", nodelist_lookup[0]);
  });

  it('should be able to upgrade from the previous contract to the new node', async function() {
    let name = await sn.name();
    let oldnode_lookup = await nl.look_for_node.call(bn.address);
    assert.notEqual("none", oldnode_lookup[0]);
    const upgrade = await nl.upgrade_node(bn.address, sn.address, name);
    assert.equal(upgrade.logs[0].event, 'UpgradeNode');
    let nodelist_lookup = await nl.look_for_node.call(sn.address);
    assert.isTrue(nodelist_lookup[1]);
    let nodelist_lookup2 = await nl.look_for_node.call(bn.address);
    assert.isFalse(nodelist_lookup2[1]);
    let count_nodes = await nl.count_nodes();
    assert.equal(1, count_nodes, 'Still should only be one node!');
  });


});
