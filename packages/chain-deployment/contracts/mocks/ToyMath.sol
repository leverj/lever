// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

/**
 * a toy library with public methods to force the need to link it
 * (to drive link-library deployment scenario)
 */
library ToyMath {

    function tryAdd(uint256 a, uint256 b) public pure returns (bool success, uint256 result) {
        unchecked {
            uint256 c = a + b;
            if (c < a) return (false, 0);
            return (true, c);
        }
    }

    function trySub(uint256 a, uint256 b) public pure returns (bool success, uint256 result) {
        unchecked {
            if (b > a) return (false, 0);
            return (true, a - b);
        }
    }

}
