pragma solidity ^0.4.4;
import "../contracts/BiathlonToken.sol";
import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';

/* Attempt to make something upgradeable */

contract TokenStorage is Ownable, StandardToken {
  address node;

  function TokenStorage(address _node) {
    node = _node;
  }

  modifier onlyOwner() {
    require(msg.sender == owner || msg.sender == node);
    _;
  }

  function alterTotalSupply(uint256 _amount) onlyOwner public returns (bool) {
    totalSupply = _amount;
    return true;
  }

  function subtract(address _addr, uint256 _amount) onlyOwner external returns (bool) {
    require(_amount > 0);
    require(_amount <= balances[_addr]);
    balances[_addr] -= _amount;
    totalSupply = totalSupply.sub(_amount);
    return true;
  }

  function add(address _addr, uint256 _amount) onlyOwner external returns (bool) {
    balances[_addr] = balances[_addr].add(_amount);
    totalSupply = totalSupply.add(_amount);
    return true;
  }


}
