"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mod_ts_1 = require("https://deno.land/x/lucid/mod.ts");
const seed_ts_1 = require("./seed.js");
/*
    MintSimpleNFT Example
    Mint or burn a simple NFT.
   */
const lucid = await mod_ts_1.Lucid.new(new mod_ts_1.Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodtyFN0EwaRtGhJEHaM8R0X5V29gXS78YQ"), "Preprod");
lucid.selectWalletFromSeed(seed_ts_1.secretSeed);
const addr = await lucid.wallet.address();
console.log(addr, "this is address");
const { paymentCredential } = lucid.utils.getAddressDetails(await lucid.wallet.address());
const mintingPolicy = lucid.utils.nativeScriptFromJson({
    type: "all",
    scripts: [
        { type: "sig", keyHash: paymentCredential === null || paymentCredential === void 0 ? void 0 : paymentCredential.hash },
        {
            type: "before",
            slot: lucid.utils.unixTimeToSlot(Date.now() + 1000000),
        },
    ],
});
const policyId = lucid.utils.mintingPolicyToId(mintingPolicy);
console.log(policyId, "my policy id");
//Mint Nft
async function mintNFT(name) {
    const unit = policyId + (0, mod_ts_1.fromText)(name);
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
// to check nft minted or not
const isMinted = await mintNFT("rest-api-test");
console.log(isMinted ? "NFT has been minted" : "NFT has not been minted");
// Burn nft
async function burnNFT(name) {
    const unit = policyId + (0, mod_ts_1.fromText)(name);
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
module.exports = mintNFT, burnNFT;
