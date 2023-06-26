import { TxHash, Unit, fromText } from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";

interface BurnNFT {
  txHash: TxHash;
  UNIT_VALUE: bigint;
}

export async function burnNFT(name: string): Promise<BurnNFT> {
  const unit: Unit = policyId + fromText(name);
  const UNIT_VALUE = -1n;

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
