pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';


contract Nodelist  is Ownable  {
  /*mapping(address=>string) public nodes;*/
  struct Entry  {
    address addr;
    string name;
  }
  mapping(address => Entry) public entries;

  Entry[] public nodes;
  address[] public user_list;

  mapping(address => address) public users;
  event RegisterBiathlonNode(address addr);
  event RegisterBiathlonUser(address addr);

  function count_nodes() public constant returns(uint) {
    return nodes.length;
  }

  function count_users()  public constant returns(uint) {
    return user_list.length;
  }

  function register_node(address _addr, string _name) public returns(address addr, string name) {
    require(sha3(_name) != sha3(''));
    require(sha3(entries[_addr].name) == sha3(''));
    Entry memory this_node = Entry(_addr, _name);
    entries[_addr] = this_node;
    nodes.push(this_node);
    RegisterBiathlonNode(_addr);
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
