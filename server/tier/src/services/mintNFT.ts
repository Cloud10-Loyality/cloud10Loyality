import { TxHash, Unit, fromText } from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";

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