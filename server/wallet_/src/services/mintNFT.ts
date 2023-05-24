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

export async function mintNFT(name: string): Promise<MintNFT> {
  const unit: Unit = policyId + fromText(name);
  const UNIT_VALUE = 1n;

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: UNIT_VALUE })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return { txHash, UNIT_VALUE };
}
