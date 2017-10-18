pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import "../contracts/Nodelist.sol";
import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract BiathlonToken is Ownable, MintableToken {

  address public node_address;
  string public name;
  string public symbol;
  uint256 public decimals;

  uint256 public sellPrice;
  uint256 public buyPrice;
  string public standard = 'BiathlonToken 2.0';

  mapping (address => uint256) public balanceOf;

  BiathlonNode node;


  function BiathlonToken(address _node_address, string _name, string _symbol, uint256 _decimals) {
    node_address = _node_address;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
    node = BiathlonNode(_node_address);
  }

  function mint(address _to, uint256 _amount) onlyOwner public returns (bool) {
    if (MintableToken.mint(_to, _amount)) {

      if (node.register_user(_to) ) {

        return true;
      } else {
        return false;
      }
    }
  }



}
