pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import "../contracts/Nodelist.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract BiathlonNode is Ownable {
  address public nodelist_address;
  string public name;
  string public location;


  event SetNodelistAddress(address nla);

  function BiathlonNode(address _nodelist, string _name, string _location) {
    nodelist_address = _nodelist;
    name = _name;
    location = _location;

  }

  function get_config() external returns(address) {
    return nodelist_address;
  }

  function setNodelistAddress(address _nlAddress)  external returns (bool){
    assert(_nlAddress != address(0));
    nodelist_address = _nlAddress;
    /*cont = Nodelist(_nlAddress);*/
    SetNodelistAddress(_nlAddress);
    return true;
  }

  function connect_to_nodelist() public returns(bool) {
    Nodelist nodelist = Nodelist(nodelist_address);
    nodelist.register_node(name);
    return true;

  }
}
