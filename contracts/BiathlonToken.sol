pragma solidity ^0.4.4;
import "../contracts/BiathlonNode.sol";
import "../contracts/Nodelist.sol";

import 'zeppelin-solidity/contracts/token/MintableToken.sol';

contract BiathlonToken is Ownable, MintableToken {
  string public standard = 'BiathlonToken 2.0';
  address public node_address;
  string public name;
  string public symbol;
  uint256 public decimals;

  uint256 public sellPrice;
  uint256 public buyPrice;


  mapping (address => uint256) public balanceOf;

  function BiathlonToken(address _node_address, string _name, string _symbol, uint256 _decimals) {
    node_address = _node_address;
    name = _name;
    symbol = _symbol;
    decimals = _decimals;
  }
}
