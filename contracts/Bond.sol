// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";


contract Bond is Ownable {
    
    bool public startBond;
    uint256 public bondAmount;
    uint256 bondStartTime;
    uint256 public bondingPeriod;
    uint256 public lockingPeriod = 60 days;
    uint256 public maxBondAmount = 10_000 * 10 ** 8;
    uint256 public DOUBLE_MULTER = 2;
    uint256 public bondPrice;
    address immutable public USDT;
    IERC20Metadata immutable public bitConey;
    address treasuryWallet;
    address bitconeyWallet; 

    struct BondInfo {
        uint256 amount;
        uint256 bondingTime;
        uint256 bondPrice;
    }

    mapping (address => BondInfo) public bondInfo;

    event BondEvent(address indexed user, uint256 amount, uint256 time);
    event ClaimEvent(address indexed user, uint256 amount);

    constructor(address _treasuryWallet, address _USDT, address _bitConey, address _bitconeyWallet) {
        treasuryWallet = _treasuryWallet;
        USDT = _USDT;
        bitConey = IERC20Metadata(_bitConey);
        bitconeyWallet = _bitconeyWallet;
    }

    function setStartBond(uint256 _price, uint256 _period) onlyOwner external {
        startBond = true;
        bondAmount = 0;
        bondStartTime = block.timestamp;
        bondPrice = _price;
        bondingPeriod = 1 days * _period;
    }

    function setInitialBondState() onlyOwner external {
        startBond = false;
    }

    function setLockingPeriod(uint256 _period) external onlyOwner {
        lockingPeriod = _period;
    }

    function setMaxBondAmount(uint256 _amount) external onlyOwner {
        maxBondAmount = _amount;
    }
    
    function bond(uint256 _amount) external {
        require(isAvailableBondByTime() && isAvailableBondByAmount(_amount), "not available");

        bondInfo[msg.sender].amount += _amount;
        bondInfo[msg.sender].bondingTime = block.timestamp;
        bondInfo[msg.sender].bondPrice = bondPrice;

        IERC20Metadata(USDT).transferFrom(msg.sender, treasuryWallet, _amount);
        emit BondEvent(msg.sender, _amount, bondInfo[msg.sender].bondingTime);
    } 

    function isAvailableBondByTime() public view returns(bool) {
        return bondStartTime + bondingPeriod > block.timestamp;
    }

    function isAvailableBondByAmount(uint256 _amount) public view returns(bool) {
        return bondPrice> 0 && maxBondAmount >= _amount * 10**16 / bondPrice / 10**18 * DOUBLE_MULTER + bondAmount;
    }

    function claim() external {
        require(isAvailableClaim(msg.sender), "Bond:no expired");
        require(bondInfo[msg.sender].amount != 0, "Bond: no reward");
        uint256 amount = userClaimAmount(msg.sender);
        bondInfo[msg.sender].amount = 0;

        IERC20Metadata(bitConey).transferFrom(bitconeyWallet, msg.sender, amount);
        emit ClaimEvent(msg.sender, amount);
    }

    function userClaimAmount(address user) public view returns(uint256) {
        return bondPrice > 0 ? bondInfo[user].amount * 10**16 / bondPrice / 10**18 * DOUBLE_MULTER : 0;
    }

    function getUserClaimTime(address user) external view returns(uint256) {
        return bondInfo[user].bondingTime + lockingPeriod > block.timestamp ? bondInfo[user].bondingTime + lockingPeriod - block.timestamp : 0;
    }

    function isAvailableClaim(address user) public view returns(bool) {
        return bondInfo[user].bondingTime > 0 && bondInfo[user].bondingTime + lockingPeriod < block.timestamp;
    } 
}
