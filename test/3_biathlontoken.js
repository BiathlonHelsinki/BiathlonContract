const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
const BiathlonToken = artifacts.require("./BiathlonToken.sol");
const Ownable = artifacts.require('../contracts/ownership/Ownable.sol');
const MintableToken = artifacts.require('../contracts/token/MintableToken.sol');


let nl;
let bn;
let bt;

contract('BiathlonToken', function(accounts) {

  beforeEach(async function() {
    bn = await BiathlonNode.deployed();
    nl = await Nodelist.deployed();
    bt = await BiathlonToken.deployed();
  });


  it('should have an owner', async function() {
    let owner = await bt.owner();
    assert.isTrue(owner !== 0);
  });

  it('should belong to the correct node', async function() {
    let node = await bt.node_address();
    let bna = await bn.address;
    assert.equal(node, bna, "Token was not initialised to correct node");
  });



  it('should mint a given amount of tokens to a given address', async function() {

    let result = await bt.mint(accounts[0], 100, { from: accounts[0] });
    assert.equal(result.logs[0].event, 'Mint');
    assert.equal(result.logs[0].args.to.valueOf(), accounts[0]);
    assert.equal(result.logs[0].args.amount.valueOf(), 100);
    assert.equal(result.logs[1].event, 'Transfer');
    assert.equal(result.logs[1].args.from.valueOf(), 0x0);

    let balance0 = await bt.balanceOf(accounts[0]);
    assert(balance0, 100);

    let totalSupply = await bt.totalSupply();
    assert(totalSupply, 100);
  })

  it('should allow owner to mint 50 to account #2', async function() {
    let result = await bt.mint(accounts[2], 50);
    assert.equal(result.logs[0].event, 'Mint');
    assert.equal(result.logs[0].args.to.valueOf(), accounts[2]);
    assert.equal(result.logs[0].args.amount.valueOf(), 50);
    assert.equal(result.logs[1].event, 'Transfer');
    assert.equal(result.logs[1].args.from.valueOf(), 0x0);

    let new_balance = await bt.balanceOf(accounts[2]);
    assert(new_balance, 50, 'Owner could not mint 50 to account #2');

  });

  it('should have account #2 on registry after first token minting', async function() {
    let check_user = await nl.users(accounts[2]);
    assert(check_user, bn.address);
  });

  
  it('should not allow non-owners to mint', async function() {
    try {
      let minttask = await bt.mint(accounts[2], 50, {from: accounts[1]});
    } catch (error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject minting from non-owner");
  });
})

contract('Nodelist', function(accounts) {
  beforeEach(async function() {
    bn = await BiathlonNode.deployed();
    nl = await Nodelist.deployed();
    bt = await BiathlonToken.deployed();
  });
  //
  // it('should be able to see user account with a balance on any nodes', async function() {
  //
  //
  // });

})
