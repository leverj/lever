// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Token is ERC20 {
    uint8 private _decimals_;

    constructor(string memory name, string memory symbol, uint8 _decimals) ERC20(name, symbol) {
        _decimals_ = _decimals;
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals_;
    }

    function mint(address account, uint amount) external {
        _mint(account, amount);
    }

    function burn(address account, uint amount) external {
        _burn(account, amount);
    }
}

contract Gold is ERC20Token {
    constructor() ERC20Token('Gold', unicode'💰', 18) {}
}

contract USDC is ERC20Token {
    constructor() ERC20Token('USD Coin', 'USDC', 6) {}
}

contract USDT is ERC20Token {
    constructor() ERC20Token('Tether', unicode'USD₮ ', 6) {}
}

contract WBTC is ERC20Token {
    constructor() ERC20Token('Wrapped Bitcoin', 'WBTC', 8) {}
}

