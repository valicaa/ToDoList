import { ethers } from "hardhat"; // Import ethers from Hardhat

const main = async () => {
  // 1. Get the contract factory for ToDoList
  // A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  // so ToDoList here is a factory for instances of our ToDoList contract.
  const ToDoListFactory = await ethers.getContractFactory("ToDoList");

  // 2. Deploy the contract
  // Calling deploy() on a ContractFactory will start the deployment,
  // and return a Promise that resolves to a Contract object.
  // This object has a method for each of your smart contract functions.
  console.log("Deploying ToDoList contract...");
  const ToDoList = await ToDoListFactory.deploy();

  // 3. Wait for the deployment to be confirmed
  // In a real network, deployment is asynchronous. `waitForDeployment` (formerly `deployed()`)
  // waits for the transaction to be mined.
  await ToDoList.waitForDeployment(); // Replaces the deprecated .deployed()

  // 4. Get the contract address
  const contractAddress = await ToDoList.getAddress(); // Replaces ToDoList.address
  console.log(`ToDoList contract deployed to: ${contractAddress}`);
}

// We recommend this pattern to be ableable to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});