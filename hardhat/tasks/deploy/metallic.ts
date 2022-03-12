import { task } from "hardhat/config"

task("deploy:metallic", "Deploy contract of Metallic coin", async (taskArgs, hre) => {
  const Metallic = await hre.ethers.getContractFactory("Metallic");
  const metallic = await Metallic.deploy();

  await metallic.deployed();

  console.log("Metallic deployed to:", metallic.address);
});
