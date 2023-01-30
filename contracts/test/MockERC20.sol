// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    uint8 decimal;
    // solhint-disable-next-line
    constructor(
        string memory name,
        string memory symbol,
        uint8 _decimal
    ) ERC20(name, symbol) {
        decimal = _decimal; 
        _mint(msg.sender, 21000000 * 10 ** _decimal);
    }

    function decimals() public view virtual override returns (uint8) {
        return decimal;
    }
}
