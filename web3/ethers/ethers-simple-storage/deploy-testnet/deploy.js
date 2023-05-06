/**
 * Basic contract deployment with ethers.js using .env and
 * calling the Store function to alter the ledger state
 */
const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
  const abi = fs.readFileSync("../SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const bin = fs.readFileSync("../SimpleStorage_sol_SimpleStorage.bin", "utf-8")

  // Deploy contract
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  console.log("Deploying, please wait...")
  const contract = await contractFactory.deploy()
  contract.deployTransaction.wait(1)
  console.log(`Contract Address: ${contract.address}`)

  // Get favorite number
  const curFavNum = await contract.retrieve()
  console.log(`Current favorite number: ${curFavNum.toString()}`)
  const txResponse = await contract.store("7")
  const txReceipt = await txResponse.wait(1)
  const updFavNum = await contract.retrieve()
  console.log(`Updated favorite number: ${updFavNum}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
