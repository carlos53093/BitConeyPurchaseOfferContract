// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20Metadata } from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
 
// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Stake is Ownable, Pausable {
    
    struct BlockInfo {
        uint256 blockNumber;
        uint256 prizeAmount;
        uint256 startTime;
        address[] userList;
        uint256 price;
        uint256 pooledAmount;
    }

    struct StakeInfo {
        address coin;
        uint256 amount;
        uint256 stakedTime;
        bool refunded;
    }

    mapping (uint256 => BlockInfo) public blockInfo; // blockNumber => BlockInfo
    mapping (uint256 => mapping (address => StakeInfo)) public stakeInfo; // blockNumber => userAddress => StakeInfo
    
    address public treasury;
    address public manager;         // from back-end size

    uint256 public entranceMulter = 8;
    uint256 entranceDivider = 10;
    uint256 public maxDepositMulter = 25;           // 25%
    uint256 public maxPooledAmountMulter = 90;      // 90%
    uint256 public constant priceDecimal = 8;
    IERC20Metadata public bitConey;
    address immutable public BUSD;
    address immutable public USDT;
    uint256 validTimeforNewBlock = 5 * 1 minutes;
    uint256 lockTimeforReward = 60 * 1 minutes;
    uint256 minStakeValue = 10 * 10 ** 18;

    event CreateBlock(uint256 indexed blockNumber, uint256 prizeAmount, uint256 startTime);
    event Invest(uint256 indexed blockNumber, address coin, uint256 amount, uint256 stakedTime, address indexed user);
    event Withdraw(uint256 indexed _blockNumber, address indexed user, uint256 reward, uint256 entrance);

    constructor(address _treasury, address _manager, address _bitConeyAddr, address _BUSD, address _USDT) {
        treasury = _treasury;
        manager = _manager;
        bitConey = IERC20Metadata(_bitConeyAddr);
        BUSD = _BUSD;
        USDT = _USDT;
    }

    function setEntranceMulter (uint256 _multer) onlyOwner external {
        entranceMulter = _multer;
    }

    function setMaxDepositMulter (uint256 _multer) onlyOwner external {
        maxDepositMulter = _multer;
    }

    function setMaxPooledAmountMulter (uint256 _multer) onlyOwner external {
        maxPooledAmountMulter = _multer;
    }

    function setManager (address _manager) onlyOwner external {
        manager = _manager;
    }

    function setTreasury (address _wallet) onlyOwner external {
        treasury = _wallet;
    }

    function setValidTimeforNewBlock(uint256 time) onlyOwner external {
        validTimeforNewBlock = time * 1 minutes;
    }

    function setLockTimeforReward(uint256 time) onlyOwner external {
        lockTimeforReward = time * 1 minutes;
    }

    function setPause(bool flag) onlyOwner external {
        if(flag) {
            _pause();
        } else {
            _unpause();
        }
    }

    function setMinStakeValue(uint256 value) onlyOwner external {
        minStakeValue = value;
    }

    function createBlock(uint256 _blockNumber, uint256 _prizeAmount, uint256 _price) whenNotPaused external {
        require(msg.sender == manager, "Not manager");
        require(blockInfo[_blockNumber].blockNumber == 0, "already exists");
        blockInfo[_blockNumber].blockNumber = _blockNumber;
        blockInfo[_blockNumber].prizeAmount = _prizeAmount;
        blockInfo[_blockNumber].startTime = block.timestamp;
        blockInfo[_blockNumber].price = _price;

        emit CreateBlock(_blockNumber, _prizeAmount, blockInfo[_blockNumber].startTime);
    }

    function invest(uint256 _blockNumber, address _coin, uint256 amount) whenNotPaused external {
        require(blockInfo[_blockNumber].blockNumber != 0 && blockInfo[_blockNumber].prizeAmount != 0 && blockInfo[_blockNumber].startTime != 0, "Not initial");
        require(blockInfo[_blockNumber].startTime + validTimeforNewBlock > block.timestamp, "time out!");
        require(stakeInfo[_blockNumber][msg.sender].amount == 0, "cant add more");
        require(_isRequiredAmount(_blockNumber, amount), "invalid amount");
        require(_isNotFilledAmount(_blockNumber, amount), "exceed full amount");

        require(_coin == USDT || _coin == BUSD, "not available coin");

        blockInfo[_blockNumber].userList.push(msg.sender);
        blockInfo[_blockNumber].pooledAmount += amount;
        stakeInfo[_blockNumber][msg.sender].amount = amount;
        stakeInfo[_blockNumber][msg.sender].coin = _coin;
        stakeInfo[_blockNumber][msg.sender].stakedTime = block.timestamp;
        
        bitConey.transferFrom(msg.sender, address(this), blockInfo[_blockNumber].prizeAmount * entranceMulter / entranceDivider);        // transfer (PrizeAmount * 0.8) Bitconey tokens
        IERC20Metadata(_coin).transferFrom(msg.sender, treasury, amount);

        emit Invest(_blockNumber, _coin, amount, stakeInfo[_blockNumber][msg.sender].stakedTime, msg.sender);
    }

    function _isRequiredAmount(uint256 _blockNumber, uint256 amount) internal view returns(bool) {
        return minStakeValue <= amount && amount <= blockInfo[_blockNumber].price * blockInfo[_blockNumber].prizeAmount * maxDepositMulter * 10 ** 18 / 100 / (10 ** priceDecimal) / (10**bitConey.decimals());
    }

    function _isNotFilledAmount (uint256 _blockNumber, uint256 amount) internal view returns(bool) {
        return blockInfo[_blockNumber].pooledAmount + amount <= blockInfo[_blockNumber].prizeAmount * blockInfo[_blockNumber].price * maxPooledAmountMulter * 10 ** 18 / 100 / (10 ** priceDecimal) / (10**bitConey.decimals());
    }

    function widthdraw(uint256 _blockNumber) external {
        require(!stakeInfo[_blockNumber][msg.sender].refunded, "already withdrawed");
        require(stakeInfo[_blockNumber][msg.sender].stakedTime + lockTimeforReward < block.timestamp, "not ready");
        require(stakeInfo[_blockNumber][msg.sender].amount != 0, "no user");

        bool flag;
        for(uint i = 0; i < blockInfo[_blockNumber].userList.length; i++) {
            if(blockInfo[_blockNumber].userList[i] == msg.sender) {
                flag = true;
                break;
            }
        }

        assert(flag == true);
        uint256 entrance = blockInfo[_blockNumber].prizeAmount * entranceMulter / entranceDivider;
        uint256 reward = stakeInfo[_blockNumber][msg.sender].amount * blockInfo[_blockNumber].prizeAmount / (blockInfo[_blockNumber].prizeAmount * blockInfo[_blockNumber].price * maxPooledAmountMulter * 10 ** 18 / 100 / (10 ** priceDecimal) / (10**bitConey.decimals()));
        stakeInfo[_blockNumber][msg.sender].refunded = true;

        bitConey.transfer(msg.sender, entrance+reward);
        emit Withdraw(_blockNumber, msg.sender, reward, entrance);
    }

    function getUserListFromBlock(uint256 _blockNumber) external view returns(address[] memory userList) {
        userList = new address[](blockInfo[_blockNumber].userList.length);
        userList = blockInfo[_blockNumber].userList;
    }

}
