// import { Params } from './../scripts/const';
// import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
// import { expect } from "chai";
// import { ethers } from "hardhat";

// describe("Staking", function () {
  
//   // We define a fixture to reuse the same setup in every test.
//   // We use loadFixture to run this setup once, snapshot that state,
//   // and reset Hardhat Network to that snapshot in every test.
//   async function deployContracts() {
//     // Contracts are deployed using the first signer/account by default
//     const [owner, manager, user1, user2, user3, user4, user5, user6, treasury] = await ethers.getSigners();
//     const BitConey = await ethers.getContractFactory("MockERC20");
//     const bitConey = await BitConey.deploy("BITCONEY", "BITCONEY", 8);
//     const USDT = await ethers.getContractFactory("MockERC20");
//     const usdt = await USDT.deploy("BUSD", "busd", 18);
//     const BUSD = await ethers.getContractFactory("MockERC20");
//     const busd = await BUSD.deploy("USDT", "usdt", 18);
//     const Stake = await ethers.getContractFactory("Stake");
//     const stake = await Stake.deploy(treasury.address, manager.address, bitConey.address, busd.address, usdt.address);
//     await bitConey.transfer(user1.address, "1000000000000")
//     await bitConey.transfer(user2.address, "1000000000000")
//     await bitConey.transfer(user3.address, "1000000000000")
//     await bitConey.transfer(user4.address, "1000000000000")
//     await bitConey.transfer(user5.address, "1000000000000")
//     await bitConey.transfer(manager.address, "1000000000000")
//     await bitConey.transfer(stake.address, "1000000000000")
//     await usdt.transfer(user1.address, "10000000000000000000000")
//     await usdt.transfer(user2.address, "10000000000000000000000")
//     await usdt.transfer(user3.address, "10000000000000000000000")
//     await usdt.transfer(user4.address, "10000000000000000000000")
//     await usdt.transfer(user5.address, "10000000000000000000000")
//     await usdt.transfer(manager.address, "10000000000000000000000")
//     await busd.transfer(user1.address, "10000000000000000000000")
//     await busd.transfer(user2.address, "10000000000000000000000")
//     await busd.transfer(user3.address, "10000000000000000000000")
//     await busd.transfer(user4.address, "10000000000000000000000")
//     await busd.transfer(user5.address, "10000000000000000000000")
//     await busd.transfer(manager.address, "10000000000000000000000")
//     return { stake, bitConey, 
//       owner, manager, user1, user2, user3, user4, user5, user6, treasury, 
//       usdt, busd };
//   }

//   describe("CreateBlock by manager", function () {
    
//     it("Should be set only by manger", async function () {
//       const { stake, manager, user1 } = await loadFixture(deployContracts);
//       await stake.connect(manager).createBlock("236", "1250000000", "510000000");
//       const prizeAmount = (await stake.blockInfo("236")).prizeAmount;
//       const price = (await stake.blockInfo("236")).price;
//       expect(prizeAmount).to.equal(ethers.BigNumber.from("1250000000"))
//       expect(price).to.equal(ethers.BigNumber.from("510000000"))

//       await expect(stake.connect(user1).createBlock("236", "1250000000", "510000000")).to.be.revertedWith(
//         "Not manager"
//       );

//       await expect(stake.connect(manager).createBlock("236", "1250000000", "510000000")).to.be.revertedWith(
//         "already exists"
//       );
//     });

//   });

//   describe("Invest", function () {
    
//     it("Investing test", async function () {
//       const { stake, manager, user1, user2, user3, user4, user5, usdt, busd, bitConey } = await loadFixture(deployContracts);
//       await stake.connect(manager).createBlock("236", "1250000000", "510000000");

//       await usdt.connect(user1).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user1).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user1).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user2).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user2).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user2).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user3).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user3).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user3).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user4).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user4).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user4).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user5).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user5).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user5).approve(stake.address, "999999999999999999999999999")

//       await stake.connect(user1).invest("236", usdt.address, "15000000000000000000");
//       // expect(await usdt.balanceOf(user1.address)).to.equal(ethers.BigNumber.from("9979000000000000000000"))
//       // expect(await bitConey.balanceOf(user1.address)).to.equal(ethers.BigNumber.from("999000000000"))
//       // expect((await stake.blockInfo("236")).pooledAmount).to.equal(ethers.BigNumber.from("21000000000000000000"))
//       // expect((await stake.stakeInfo("236", user1.address)).coin).to.equal(usdt.address)

//       await expect(stake.connect(user1).invest("237", usdt.address, "10000000000000000000")).to.be.revertedWith(
//         "Not initial"
//       );

//       await expect(stake.connect(user1).invest("236", usdt.address, "10000000000000000000")).to.be.revertedWith(
//         "cant add more"
//       );

//       await expect(stake.connect(user2).invest("236", usdt.address, "5000000000000000000")).to.be.revertedWith(
//         "invalid amount"
//       );

//       await stake.connect(user2).invest("236", usdt.address, "15000000000000000000");
//       await stake.connect(user3).invest("236", usdt.address, "15000000000000000000");

//       await expect(stake.connect(user4).invest("236", usdt.address, "15000000000000000000")).to.be.revertedWith(
//         "exceed full amount"
//       );

//       time.increase(60 * 5 + 1);
//       await expect(stake.connect(user4).invest("236", usdt.address, "10000000000000000000")).to.be.revertedWith(
//         "time out!"
//       );
//     });

//   });

//   describe("Withdraw", function () {
    
//     it("withdraw test", async function () {
//       const { stake, manager, user1, user2, user3, user4, usdt, busd, bitConey } = await loadFixture(deployContracts);
//       await stake.connect(manager).createBlock("236", "1250000000", "1000000000");

//       await usdt.connect(manager).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(manager).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(manager).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user2).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user2).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user2).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user3).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user3).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user3).approve(stake.address, "999999999999999999999999999")

//       await usdt.connect(user4).approve(stake.address, "999999999999999999999999999")
//       await bitConey.connect(user4).approve(stake.address, "999999999999999999999999999")
//       await busd.connect(user4).approve(stake.address, "999999999999999999999999999")

//       await stake.connect(manager).invest("236", usdt.address, "10000000000000000000");
//       // // time.increase(60 * 2);
//       // // await stake.connect(user2).invest("236", usdt.address, "21000000000000000000");
//       // // time.increase(60 * 2);
//       // // await stake.connect(user3).invest("236", usdt.address, "21000000000000000000");
//       // // await stake.connect(user4).invest("236", usdt.address, "10000000000000000000");

//       await expect(stake.connect(manager).widthdraw("236")).to.be.revertedWith(
//         "not ready"
//       );

//       time.increase(2 * 60 * 60);
//       await stake.connect(manager).widthdraw("236");

//       expect(await bitConey.balanceOf(manager.address)).to.equal(ethers.BigNumber.from("1000111111111"))
//       // expect(await bitConey.balanceOf(user1.address)).to.equal(ethers.BigNumber.from("1000359589041"))

//       // await expect(stake.connect(user1).widthdraw("236")).to.be.revertedWith(
//       //   "already withdrawed"
//       // );
//     });

//   });
// });
