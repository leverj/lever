// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ToyMath} from "./utils/ToyMath.sol";

contract Bank {

    event Deposit(address account, address token, uint quantity);
    event Withdrawal(address account, address token, uint quantity);

    mapping(address => mapping(address => uint)) public balances;
    uint64 public chainId;
    string public name;
    address public owner;

    constructor(uint64 chainId_, string memory name_) {
        chainId = chainId_;
        name = name_;
        owner = msg.sender;
    }

    function deposit(address token, uint quantity) external {
        address account = msg.sender;
        uint balanceBefore = IERC20(token).balanceOf(address(this));
        require(IERC20(token).transferFrom(account, address(this), quantity), "failure to transfer quantity from token");
        uint balanceAfter = IERC20(token).balanceOf(address(this));
        require(balanceAfter - balanceBefore == quantity, "bad Token; transferFrom erroneously reported of successful transfer");
        (bool success, uint result) = ToyMath.tryAdd(balances[account][token], quantity);
        require(success, "failed to add");
        balances[account][token] = result;
        emit Deposit(account, token, quantity);
    }

    function withdraw(address token, uint quantity) external {
        address account = msg.sender;
        require(balances[account][token] >= quantity, "not enough funds to transfer");
        (bool success, uint result) = ToyMath.trySub(balances[account][token], quantity);
        require(success, "failed to subtract");
        balances[account][token] = result;
        uint balanceBefore = IERC20(token).balanceOf(account);
        require(IERC20(token).transfer(account, quantity), "failure to transfer quantity from token");
        uint balanceAfter = IERC20(token).balanceOf(account);
        require(balanceAfter - balanceBefore == quantity, "bad Token; transferFrom erroneously reported of successful transfer");
        emit Withdrawal(account, token, quantity);
    }
}
