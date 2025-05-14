// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StarsToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 1_000_000 * 10 ** 18;

    constructor(
        address initialOwner
    ) ERC20("Stars", "STR") Ownable(initialOwner) {
        _mint(initialOwner, 100_000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Max supply reached");
        _mint(to, amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
