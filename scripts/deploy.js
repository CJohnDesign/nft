async function main() {
  const MiamiTechYearbook = await ethers.getContractFactory("MiamiTechYearbook")

  // Start deployment, returning a promise that resolves to a contract object
  const contract = await MiamiTechYearbook.deploy()
  console.log("Contract deployed to address:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

