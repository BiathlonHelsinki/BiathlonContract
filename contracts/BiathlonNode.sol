pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import "../contracts/Nodelist.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';

contract BiathlonNode is Ownable {
  address public nodelist_address;
  string public name;
  string public location;
  Nodelist nodelist;



  function BiathlonNode(address _nodelist, string _name, string _location) {
    nodelist_address = _nodelist;
    name = _name;
    location = _location;
    nodelist = Nodelist(nodelist_address);
  }

  function get_config() external returns(address) {
    return nodelist_address;
  }


  function register_user(address _user) public returns (bool) {

    require(nodelist.find_and_or_register_user(_user, this) != address(0));

    return true;


  }

  function register_minting(address _addr) public returns (uint) {

    nodelist.find_and_or_register_user(_addr, this);
    return nodelist.count_users();
    /*return true;*/
  }

  function connect_to_nodelist() public returns(bool) {

    nodelist.register_node(this, name);
    return true;

  }
}
