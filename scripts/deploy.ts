import { ethers } from "hardhat";
import { Params } from "./const";

async function main() {
  const Stake = await ethers.getContractFactory("Stake");
  const stake = await Stake.deploy(Params.Treasury, Params.Manager, Params.BitCouney, Params.BUSD, Params.USDT);

  await stake.deployed();

  console.log(`Stake contract deployed to ${stake.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
