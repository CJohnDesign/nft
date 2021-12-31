const { ethers } = require("hardhat");

async function main() {
  const FreshmanYear = await ethers.getContractFactory("FreshmanYear")

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await FreshmanYear.deploy("Freshman Year", "fyb", "ipfs://QmWVLRzbpM7rATE3tRtjj5AZ8yoJVR3wVjWcLrKJYovN4y/")
  console.log("Contract deployed to address:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

