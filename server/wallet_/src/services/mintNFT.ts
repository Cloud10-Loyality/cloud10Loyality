import {
  TxHash,
  Unit,
  fromText,
  NFTMetadataDetails,
  Label,
} from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";

interface MintNFT {
  txHash: TxHash;
  UNIT_VALUE: bigint;
}

// Define the metadata details
const metadata: NFTMetadataDetails = {
  name: "new nft test",
  description: "This is my NFT",
  image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
  mediaType: "image/jpeg",
};

export async function mintNFT(name: string): Promise<MintNFT> {
  const unit: Unit = policyId + fromText(name);
  const UNIT_VALUE = 2n;
  const label: Label = 721;

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: UNIT_VALUE })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .attachMetadata(label, metadata)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return { txHash, UNIT_VALUE };
}
