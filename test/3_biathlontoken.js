const Nodelist = artifacts.require("./Nodelist.sol");
const BiathlonNode = artifacts.require("./BiathlonNode.sol");
const SecondNode = artifacts.require("./SecondNode.sol");
const BiathlonToken = artifacts.require("./BiathlonToken.sol");
const Ownable = artifacts.require('../contracts/ownership/Ownable.sol');

// const MintableToken = artifacts.require('MintableToken.sol');
const SecondBiathlonToken = artifacts.require("./SecondBiathlonToken.sol");


let nl;
let bn;
let bt;
let sn;
let st;

contract('BiathlonToken', function(accounts) {

  beforeEach(async function() {
    bn = await BiathlonNode.deployed();
    nl = await Nodelist.deployed();
    bt = await BiathlonToken.deployed();
    st = await SecondBiathlonToken.deployed();
    sn = await SecondNode.deployed();
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

  it('should have a storage contract that is separate', async function() {
    let storage_address = await bt.storage_address();
    assert.notEqual(storage_address, bt.address);
  });

  it("should be able to register itself with the Node list of tokens", async function() {
    let registration = await bt.register_with_node();
    let node_token_count = await bn.count_tokens();
    assert.equal(node_token_count, 1, "Node array of tokens doesn't have deployed BiathlonToken");
  });

  it('should mint a given amount of tokens to a given address', async function() {
    const result = await bt.mint(accounts[0], 100, { from: accounts[0] });
    assert.equal(result.logs[0].event, 'Mint');
    assert.equal(result.logs[0].args.to.valueOf(), accounts[0]);
    assert.equal(result.logs[0].args.amount.valueOf(), 100);
    assert.equal(result.logs[1].event, 'Transfer');
    assert.equal(result.logs[1].args.from.valueOf(), 0x0);

    let balance0 = await bt.balanceOf(accounts[0]);

    assert(balance0 == 100);

    let totalSupply = await bt.totalSupply();
    assert.equal(totalSupply, 100);
  })

  it('should allow owner to mint 50 to account #2', async function() {
    let result = await bt.mint(accounts[2], 50);
    assert.equal(result.logs[0].event, 'Mint');
    assert.equal(result.logs[0].args.to.valueOf(), accounts[2]);
    assert.equal(result.logs[0].args.amount.valueOf(), 50);
    assert.equal(result.logs[1].event, 'Transfer');
    assert.equal(result.logs[1].args.from.valueOf(), 0x0);

    let new_balance = await bt.balanceOf(accounts[2]);

    assert.equal(new_balance, 50, 'Owner could not mint 50 to account #2');

  });

  it('should have account #2 on registry after first token minting', async function() {
    let check_user = await nl.users(accounts[2]);
    assert.equal(check_user, bn.address);
  });




  it('should spend 25 of the tokens minted to account #2', async function() {
    let result = await bt.spend(accounts[2], 25);
    assert.equal(result.logs[0].event, 'Burn');
    let new_balance = await bt.balanceOf(accounts[2]);
    assert.equal(new_balance, 25);
  });



  it('should have total supply changed by these minting and spending operations', async function() {
    let result = await bt.totalSupply();
    assert.equal(result, 125);
  });

  it('should not allow non-onwers to spend', async function() {
    try {
      let spendtask = await bt.spend(accounts[0], 1, {from: accounts[2]})
    } catch (error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject spending from non-owner");
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

  it('should not be able to spend more than it has', async function() {
    try {
      let spendtask = await bt.spend(accounts[2], 66)
    } catch (error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject spending more than limit");
  });

  it('second deployed token should belong to the correct node', async function() {
    let node = await st.node_address();
    let bna = await bn.address;
    assert.equal(node, bna, "Token was not initialised to correct node");
  });

  it('second token should be able to upgrade the token with the node', async function() {
    let name = await st.name();
    const upgraded = await bn.upgrade_token(bt.address, st.address, name);
    assert.equal(upgraded.logs[0].event, 'UpgradeToken');
    let count_of_tokens = await bn.count_tokens();
    assert.equal(count_of_tokens, 1, 'Should only be one token in tokenlist still');
  });

  it('should deactivate original token after upgrade', async function () {
    let tia = await bn.tokens.call(bt.address);
    assert.isNotTrue(tia[1]);
    let newtoken = await bn.tokens.call(st.address);
    assert.isTrue(newtoken[1]);
  });

  it('should carry over the previous balances since storage contract is fixed', async function() {
    let get_balance = await st.balanceOf(accounts[2]);
    assert.equal(get_balance, 25);
  });

  it('should not allow the deactivated contract to mint', async function() {
    try {
      let newmint = await bt.mint(accounts[2], 10);
    } catch(error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject spending more than limit");
  });

  it('should allow minting more tokens to accounts', async function() {
    let newmint = await st.mint(accounts[2], 3);
    let getbalance = await st.balanceOf(accounts[2]);
    let totalsupply = await st.totalSupply();
    assert.equal(totalsupply, 128);
    assert.equal(getbalance, 28);
  });

  it('should be able to transfer as contract owner from one account to another', async function() {
    let thetransfer = await st.biathlon_transfer(accounts[2], accounts[3], 2);
    let getbalance2 = await st.balanceOf(accounts[2]);
    let getbalance3 = await st.balanceOf(accounts[3]);
    assert.equal(getbalance2, 26);
    assert.equal(getbalance3, 2);
  });

  it('should not be able to transfer as non-owner from one account to another', async function() {
    try {
      let thetransfer = await st.biathlon_transfer(accounts[3], accounts[4], 1, {from: accounts[1]});
    } catch(error) {
      const invalidJump = error.message.search('invalid opcode') >= 0;
      assert(invalidJump, "Expected throw, got '" + error + "' instead");
      return;
    }
    assert.fail("Expected to reject transfering from non-owner");
  })

});
