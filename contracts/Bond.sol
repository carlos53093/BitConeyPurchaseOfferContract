// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IERC20 {
    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);
}

interface IERC20Metadata is IERC20 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the decimals places of the token.
     */
    function decimals() external view returns (uint8);
}


abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}

abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _transferOwnership(_msgSender());
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        _checkOwner();
        _;
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if the sender is not the owner.
     */
    function _checkOwner() internal view virtual {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _transferOwnership(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Internal function without access restriction.
     */
    function _transferOwnership(address newOwner) internal virtual {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}

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
