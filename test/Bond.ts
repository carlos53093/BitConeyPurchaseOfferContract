import { Params } from '../scripts/const';
import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Staking", function () {
  
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployContracts() {
    // Contracts are deployed using the first signer/account by default
    const [owner, user1, user2, user3, user4, user5, user6, treasury, bitconeyWallet] = await ethers.getSigners();
    const BitConey = await ethers.getContractFactory("MockERC20");
    const bitConey = await BitConey.deploy("BITCONEY", "BITCONEY", 8);
    const BUSD = await ethers.getContractFactory("MockERC20");
    const busd = await BUSD.deploy("USDT", "usdt", 18);
    const Bond = await ethers.getContractFactory("Bond");
    const bond = await Bond.deploy(treasury.address, busd.address, bitConey.address, bitconeyWallet.address);

    // await bitConey.transfer(user1.address, "1000000000000")
    // await bitConey.transfer(user2.address, "1000000000000")
    // await bitConey.transfer(user3.address, "1000000000000")
    // await bitConey.transfer(user4.address, "1000000000000")
    // await bitConey.transfer(user5.address, "1000000000000")
    await bitConey.transfer(bitconeyWallet.address, "1000000000000")

    await busd.transfer(user1.address, "1000000000000000000000000")
    await busd.transfer(user2.address, "10000000000000000000000")
    await busd.transfer(user3.address, "10000000000000000000000")
    await busd.transfer(user4.address, "10000000000000000000000")
    await busd.transfer(user5.address, "10000000000000000000000")

    await bitConey.connect(bitconeyWallet).approve(bond.address, "99999999999999999999");
    return { bond, bitConey, 
      owner, user1, user2, user3, user4, user5, user6, treasury, 
      busd, bitconeyWallet };
  }

  describe("Bond test", function () {
    
    it("Set Bond config", async function () {
      const { bond, user1, owner } = await loadFixture(deployContracts);
      await expect(bond.connect(user1).setStartBond("500000000", "7")).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );

      await bond.connect(owner).setStartBond("500000000", "7");

      await expect(bond.connect(owner).setStartBond("500000000", "7")).to.be.revertedWith("already started")
    });

    it("Bonding....", async function () {
      const { bond, user1, owner, busd } = await loadFixture(deployContracts);
      await bond.connect(owner).setStartBond("500000000", "7");
      await busd.connect(user1).approve(bond.address, "99999999999999999999");
      await bond.connect(user1).bond("5000000000000000000");

      expect(await bond.userClaimAmount(user1.address)).to.equal(ethers.BigNumber.from("200000000"))
      expect(await bond.getUserClaimTime(user1.address)).to.equal(ethers.BigNumber.from(60*60*24*60))

      await time.increase(60 * 60 * 100);
      expect(await bond.getUserClaimTime(user1.address)).to.equal(ethers.BigNumber.from(60*60*24*60 - 60*60*100))
      // expect(await bond.getUserClaimTime(user1.address)).to.equal(ethers.BigNumber.from(""))

      await expect(bond.connect(user1).bond("10000000000000000000000000")).to.be.revertedWith("not available")
      await bond.connect(user1).bond("20000000000000000000");
      expect(await bond.getUserClaimTime(user1.address)).to.equal(ethers.BigNumber.from(60*60*24*60))
      expect(await busd.balanceOf(user1.address)).to.be.equal(ethers.BigNumber.from("1000000000000000000000000").sub("5000000000000000000").sub("20000000000000000000"))

    });

    it("Claim reward....", async function () {
      const { bond, user1, owner, busd, bitConey } = await loadFixture(deployContracts);
      await bond.connect(owner).setStartBond("500000000", "7");
      await busd.connect(user1).approve(bond.address, "99999999999999999999");
      await bond.connect(user1).bond("5000000000000000000");
      await time.increase(60 * 60 * 100);
      await bond.connect(user1).bond("20000000000000000000");

      expect(await bond.userClaimAmount(user1.address)).to.equal(ethers.BigNumber.from("1000000000"))
      await time.increase(60 * 60 * 24 * 61);
      await bond.connect(user1).claim();
      expect(await bitConey.balanceOf(user1.address)).to.equal(ethers.BigNumber.from("1000000000"))

    });

  });
});
