// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "hardhat/console.sol";

contract ERC20Mock is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address account, uint256 amount) external {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external {
        _burn(account, amount);
    }

    function approve(address spender, uint256 value) public override virtual returns (bool) {
        console.log("token.approve >>> allowance", msg.sender, spender, allowance(msg.sender, spender));
        bool result = super.approve(spender, value);
        console.log("token.approve <<< allowance", msg.sender, spender, allowance(msg.sender, spender));
        return result;
    }
}
