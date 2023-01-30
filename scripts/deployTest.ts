import { ethers } from "hardhat";
import { TestParams } from "./const";

async function main(deployTokens: boolean) {

  if(deployTokens) {
    const TestBitConey = await ethers.getContractFactory("MockERC20")
    const testBitCouney = await TestBitConey.deploy("BitConey", "BITCONEY", 8)
    await testBitCouney.deployed();
    console.log(`BitConey contract deployed to ${testBitCouney.address}`);
  
    const BUSD = await ethers.getContractFactory("MockERC20")
    const busd = await BUSD.deploy("BUSD", "BUSD", 18)
    await busd.deployed();
    console.log(`BUSD contract deployed to ${busd.address}`);
  
    const USDT = await ethers.getContractFactory("MockERC20")
    const usdt = await USDT.deploy("USDT", "USDT", 18)
    await usdt.deployed();
    console.log(`USDT contract deployed to ${usdt.address}`);
    const Stake = await ethers.getContractFactory("Stake");
    const stake = await Stake.deploy(TestParams.Treasury, TestParams.Manager, testBitCouney.address, busd.address, usdt.address);
    await stake.deployed();
    console.log(`Stake contract deployed to ${stake.address}`);
  } else {
    const Stake = await ethers.getContractFactory("Stake");
    const stake = await Stake.deploy(TestParams.Treasury, TestParams.Manager, TestParams.BitCouney, TestParams.BUSD, TestParams.USDT);
  
    await stake.deployed();
  
    console.log(`Stake contract deployed to ${stake.address}`);
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main(false).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
