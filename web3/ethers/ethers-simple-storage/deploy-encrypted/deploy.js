/**
 * Basic contract deployment with ethers.js using .env and
 * encryption for hashing the private key avoiding storage
 * in plain text. Call of Store function to alter the ledger
 * state
 */
const ethers = require("ethers")
const fs = require("fs-extra")
require("dotenv").config()

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL)

  /**
   * Create an instance of a wallet by decrypting an encrypted JSON wallet.
   * The env variable PRIVATE_KEY_PASSWORD will not be stored in the .env file,
   * but rather passed through the command line:
   *
   *   $ PRIVATE_KEY_PASSWORD=0xABBA node deploy.js
   *
   * It fundamental that after running the program, we delete terminal history to
   * elimante any traces of our decrypting password:
   *
   *   $ history -c
   *
   * Previosly: const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)
   */
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8")
  let wallet = new ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD
  )
  wallet = await wallet.connect(provider)

  const abi = fs.readFileSync("../SimpleStorage_sol_SimpleStorage.abi", "utf8")
  const bin = fs.readFileSync("../SimpleStorage_sol_SimpleStorage.bin", "utf-8")

  // Deploy contract
  const contractFactory = new ethers.ContractFactory(abi, bin, wallet)
  console.log("Deploying, please wait...")
  const contract = await contractFactory.deploy()
  contract.deployTransaction.wait(1)

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
