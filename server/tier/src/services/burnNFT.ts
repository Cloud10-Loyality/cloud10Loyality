import { TxHash, Unit, fromText } from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";

export async function burnNFT(name: string): Promise<TxHash> {
    const unit: Unit = policyId + fromText(name);
  
    console.log("Burn nft+++++++++++++++++++++++++++++++++++++++");
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