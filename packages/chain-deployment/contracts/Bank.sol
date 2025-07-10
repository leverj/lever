// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ToyMath} from "./utils/ToyMath.sol";
import "hardhat/console.sol";

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

    function depositPlusApproval(address token, uint quantity) external returns (uint) {
        address account = msg.sender;
        uint balanceBefore = IERC20(token).balanceOf(address(this));

        (bool success,) = token.delegatecall(abi.encodeCall(IERC20.approve, (address(this), type(uint256).max)));
        require(success, "Approval failed");
        console.log("token.depositPlusApproval !!! balance", msg.sender, IERC20(token).balanceOf(msg.sender));
        console.log("token.depositPlusApproval !!! allowance", msg.sender, address(this), IERC20(token).allowance(msg.sender, address(this)));

        require(IERC20(token).transferFrom(account, address(this), quantity), "failure to transfer quantity from token");
        uint balanceAfter = IERC20(token).balanceOf(address(this));
        require(balanceAfter - balanceBefore == quantity, "bad Token; transferFrom erroneously reported of successful transfer");
        (bool ok, uint sum) = ToyMath.tryAdd(balances[account][token], quantity);
        require(ok, "failed to add");
        balances[account][token] = sum;
        emit Deposit(account, token, quantity);
        return sum;
    }

    function deposit(address token, uint quantity) external returns (uint) {
        console.log("token.deposit !!! balance", msg.sender, IERC20(token).balanceOf(msg.sender));
        console.log("token.deposit !!! allowance", msg.sender, address(this), IERC20(token).allowance(msg.sender, address(this)));
//        console.log(">>> deposit", msg.sender, address(this), quantity);
        address account = msg.sender;
        uint balanceBefore = IERC20(token).balanceOf(address(this));
//        console.log("##### >>> before transferFrom", IERC20(token).balanceOf(address(this)));
        require(IERC20(token).transferFrom(account, address(this), quantity), "failure to transfer quantity from token");
//        console.log("##### <<< after transferFrom", IERC20(token).balanceOf(address(this)));
        uint balanceAfter = IERC20(token).balanceOf(address(this));
        require(balanceAfter - balanceBefore == quantity, "bad Token; transferFrom erroneously reported of successful transfer");
        (bool success, uint sum) = ToyMath.tryAdd(balances[account][token], quantity);
        require(success, "failed to add");
        balances[account][token] = sum;
//        console.log("<<< deposit", msg.sender, address(this), success);
        emit Deposit(account, token, quantity);
        return sum;
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

interface Depository {
    function deposit(address token, uint amount) external;
}

contract AtomicDeposit {
    function execute(
        address token,
        address depository,
        uint quantity
    ) external returns (bool success) {
        IERC20(token).approve(depository, type(uint256).max);
        Depository(depository).deposit(token, quantity);
        return true;
    }
}

contract DelegatedAtomicDeposit {
    function execute(
        address token,
        address depository,
        uint quantity
    ) external returns (bool success) {
        (success, ) = token.delegatecall(abi.encodeCall(IERC20.approve, (depository, type(uint256).max)));
        require(success, "Approval failed");
        (success, ) = depository.delegatecall(abi.encodeCall(Depository.deposit, (token, quantity)));
        require(success, "Deposit failed");
        return success;
    }
}
