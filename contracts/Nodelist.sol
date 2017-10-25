pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract Nodelist is Ownable  {
  /*mapping(address=>string) public nodes;*/
  struct Entry  {
    address addr;
    string name;
    bool active;
    address migrated;
  }
  mapping(address => Entry) public entries;

  Entry[] public nodes;
  address[] public user_list;

  mapping(address => address) public users;
  event RegisterBiathlonNode(address addr);
  event RegisterBiathlonUser(address addr);
  event LogAddress(address addr);
  event LogString(string s);

  function count_nodes() public constant returns(uint) {
    return nodes.length;
  }

  function count_users()  public constant returns(uint) {
    return user_list.length;
  }

  function register_node(string _name) public returns(address addr, string name) {
    require(keccak256(_name) != keccak256(''));
    require(keccak256(entries[msg.sender].name) == keccak256(''));
    Entry memory this_node = Entry(msg.sender, _name, true, address(0));
    entries[msg.sender] = this_node;
    LogAddress(msg.sender);
    LogString(_name);

    nodes.push(this_node);
    RegisterBiathlonNode(msg.sender);
    return (this_node.addr, this_node.name);

  }

  function find_and_or_register_user(address _addr, address _registrar) external returns(address) {

    if (users[_addr]==address(0)) {
      users[_addr] = _registrar;
      RegisterBiathlonUser(_addr);
      user_list.push(_addr);
      return _registrar;
    } else {
      return _addr;
    }


  }

}
