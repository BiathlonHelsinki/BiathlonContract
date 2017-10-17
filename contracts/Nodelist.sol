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



  function count_nodes() public constant returns(uint) {
    return nodes.length;
  }

  function register_node(string _name) public returns(address addr, string name) {
    require(sha3(_name) != sha3(''));
    require(sha3(entries[msg.sender].name) == sha3(''));
    Entry memory this_node = Entry(msg.sender, _name);
    entries[msg.sender] = this_node;
    nodes.push(this_node);
    return (this_node.addr, this_node.name);

  }

}
