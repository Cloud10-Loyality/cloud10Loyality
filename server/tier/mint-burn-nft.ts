import {
  Blockfrost,
  fromText,
  Lucid,
  MintingPolicy,
  PolicyId,
  TxHash,
  Address,
  NFTMetadataDetails,
  Unit,
  WalletApi
} from "lucid-cardano";

import { secretSeed } from "./seed";


// interface Wallet


let lucid: Lucid;
let policyId: PolicyId;
let mintingPolicy: MintingPolicy;


Lucid.new(
  new Blockfrost(
    "https://cardano-preprod.blockfrost.io/api/v0",
    "preprodtyFN0EwaRtGhJEHaM8R0X5V29gXS78YQ"
  ),
  "Preprod"
)
  .then((res) => {
    lucid = res;
    return lucid.selectWalletFromSeed(secretSeed);
  })
  .then(() => {
    return lucid.wallet.address();
  })
  .then((addr) => {
    const { paymentCredential } = lucid.utils.getAddressDetails(addr);

    mintingPolicy = lucid.utils.nativeScriptFromJson({
      type: "all",
      scripts: [
        { type: "sig", keyHash: paymentCredential?.hash! },
        {
          type: "before",
          slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
        },
      ],
    });

    policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
    console.log(policyId, "my policy id");
  });

export async function mintNFT(name: string): Promise<TxHash> {
  const unit: Unit = policyId + fromText(name);

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: 2n })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}
// console.log("Burn nft+++++++++++++++++++++++++++++++++++++++") 


export async function burnNFT(name: string): Promise<TxHash> {
  const unit: Unit = policyId + fromText(name);

  // console.log("Burn nft+++++++++++++++++++++++++++++++++++++++")
  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: -1n })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return txHash;
}

// let nftMetadataDetails : NFTMetadataDetails;

// export  async function getNftDetails(name:string):Promise<NFTMetadataDetails> {

  // const tokens = await lucid.wallet.tokens();

//   const nftDetails: NFTMetadataDetails[] = [];

//   for (const token of tokens) {
//     if (token.unit.startsWith(policyId)) {
//       const metadata = await lucid.tokenMetadata(token.unit);

//       if (metadata && metadata.name === name) {
//         nftDetails.push(metadata);
//       }
//     }
//   }
//   return NFTMetadataDetails;
// }

// let isMinted: any;
// mintNFT("dj tilu")
//   .then((res) => {
//     isMinted = res;
//     console.log(isMinted ? "NFT has been minted" : "NFT has not been minted");
//   })
//   .catch((err) => console.error(err));


// export async function getNftDetails(name: string): Promise<NFTMetadataDetails[]> {
//   const tokens = await lucid.wallet.tokens();

//   const nftDetails: NFTMetadataDetails[] = [];

//   for (const token of tokens) {
//     if (token.unit.startsWith(policyId)) {
//       const metadata = await lucid.tokenMetadata(token.unit);

//       if (metadata && metadata.name === name) {
//         nftDetails.push(metadata);
//       }
//     }
//   }

//   return nftDetails;
// }

