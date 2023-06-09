import { Blockfrost, Lucid, MintingPolicy, PolicyId } from "lucid-cardano";
import { BlockFrostKey, secretSeed } from "./seed";

let lucid: Lucid;
let mintingPolicy: MintingPolicy;
let policyId: PolicyId;

Lucid.new(
  new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", BlockFrostKey),
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
    console.log("my policy id:---", policyId);
  });

export { lucid, policyId, mintingPolicy };
