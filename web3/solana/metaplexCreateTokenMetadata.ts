// as used in https://www.youtube.com/watch?v=DQbt0-riooo

import * as mpl from "@metaplex-foundation/mpl-token-metadata";
import * as web3 from "@solana/web3.js";
import * as anchor from '@project-serum/anchor';

export function loadWalletKey(keypairFile:string): web3.Keypair {
    const fs = require("fs");
    const loaded = web3.Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(fs.readFileSync(keypairFile).toString())),
    );
    return loaded;
  }

const INITIALIZE = true;

async function main(){
    console.log("Let's name our token!");
    const myKeypair = loadWalletKey("fs-sol-wallet-id.json");
    console.log(myKeypair.publicKey.toBase58());
    const mint = new web3.PublicKey("CoM7cSQWFcpdLFrrDvxn5Jdg4wkfWSdoEqGw7Df3RsoU"); // Token address
    const seed1 = Buffer.from(anchor.utils.bytes.utf8.encode("metadata"));
    const seed2 = Buffer.from(mpl.PROGRAM_ID.toBytes());
    const seed3 = Buffer.from(mint.toBytes());
    const [metadataPDA, _bump] = web3.PublicKey.findProgramAddressSync([seed1, seed2, seed3], mpl.PROGRAM_ID);
    console.log(metadataPDA.toString());
    const accounts = {
        metadata: metadataPDA,
        mint,
        mintAuthority: myKeypair.publicKey,
        payer: myKeypair.publicKey,
        updateAuthority: myKeypair.publicKey,
    }
    const dataV2 = {
        name: "Witch Token",
        symbol: "WIT",
        uri: "https://arweave.net/dxPRYIekVOknkMGsBBHMtZy8JQVFIXIjepoxwE7RSKs",
        // We don't need that
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
    }
    let ix;
    if (INITIALIZE) {
        const args =  {
            createMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true
            }
        };
        ix = mpl.createCreateMetadataAccountV2Instruction(accounts, args);
    } else {
        const args =  {
            updateMetadataAccountArgsV2: {
                data: dataV2,
                isMutable: true,
                updateAuthority: myKeypair.publicKey,
                primarySaleHappened: true
            }
        };
        ix = mpl.createUpdateMetadataAccountV2Instruction(accounts, args)
    }
    const tx = new web3.Transaction();
    tx.add(ix);
    const connection = new web3.Connection("https://api.devnet.solana.com");
    const txid = await web3.sendAndConfirmTransaction(connection, tx, [myKeypair]);
    console.log(txid);
    /*

    */
}

main();