import {
  TxHash,
  Unit,
  fromText,
  NFTMetadataDetails,
  Label,
} from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";

interface Assets {
  txHash: TxHash;
  UNIT_VALUE: bigint;
}

export async function assets(): Promise<TxHash> {
  const unit: Unit = policyId;

  const nftMetadata: NFTMetadataDetails = {
    [policyId]: {
      Silver: {
        mediaType: "image/jpg",
        description: "Silver badge.",
      },
    },
    name: "C10",
    image: "ipfs://QmVcwkyDgVMrwM9USjbw8ZgCPY9GtNKLRcBqYGFNwHY4a9",
  };

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: 1n })
    .validTo(Date.now() + 600000)
    .attachMintingPolicy(mintingPolicy)
    .attachMetadata(721, nftMetadata)
    .complete();

  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();

  return txHash;
}
