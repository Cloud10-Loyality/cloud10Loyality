import { lucid } from ".";  
import { secretSeed } from "./seed";

export const handlePaytoAddr = async (address) => {
    await lucid.selectWalletFromSeed(secretSeed)

    const tx = await lucid.newTx()
.payToAddress(address, { lovelace: 10000000n })
.complete();

    const signedTx = await tx.sign().complete();

    const txHash = await signedTx.submit();
    console.log(txHash, "signed hash------------------");
    return txHash;
}

