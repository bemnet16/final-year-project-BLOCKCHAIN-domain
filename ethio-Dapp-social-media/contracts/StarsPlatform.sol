// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StarsPlatform is Ownable {
    IERC20 public starsToken;
    uint256 public rate = 100;

    mapping(string => uint256) public featurePrices;

    event GiftSent(address from, address to, uint256 amount);
    event FeatureUnlocked(address user, string feature, uint256 cost);
    event TokensPurchased(address buyer, uint256 amount);

    constructor(
        address _starsToken,
        address _initialOwner
    ) Ownable(_initialOwner) {
        starsToken = IERC20(_starsToken);
    }

    // TokenSale: Buy Stars with MATIC
    function buyStars() external payable {
        require(msg.value > 0, "Send MATIC to buy Stars");
        uint256 amount = msg.value * rate;
        require(
            starsToken.balanceOf(address(this)) >= amount,
            "Not enough Stars in contract"
        );
        starsToken.transfer(msg.sender, amount);
        emit TokensPurchased(msg.sender, amount);
    }

    // Gifting: Gift Stars to another user
    function giftStars(address recipient, uint256 amount) external {
        require(amount > 0, "Invalid amount");
        require(
            starsToken.transferFrom(msg.sender, recipient, amount),
            "Transfer failed"
        );
        emit GiftSent(msg.sender, recipient, amount);
    }

    // Premium: Set and use features
    function setFeaturePrice(
        string calldata feature,
        uint256 price
    ) external onlyOwner {
        featurePrices[feature] = price;
    }

    function unlockFeature(string calldata feature) external {
        uint256 cost = featurePrices[feature];
        require(cost > 0, "Feature not available");
        require(
            starsToken.transferFrom(msg.sender, address(this), cost),
            "Payment failed"
        );
        emit FeatureUnlocked(msg.sender, feature, cost);
    }

    // Admin: Withdraw collected MATIC or Stars
    function withdrawMATIC() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function withdrawStars(uint256 amount) external onlyOwner {
        require(starsToken.transfer(owner(), amount), "Withdraw failed");
    }

    function refillStars(uint256 amount) external onlyOwner {
        starsToken.transferFrom(msg.sender, address(this), amount);
    }
}
