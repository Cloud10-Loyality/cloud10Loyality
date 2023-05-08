import {
  Blockfrost,
  fromText,
  Lucid,
  MintingPolicy,
  PolicyId,
  TxHash,
  Address,
  Unit,
} from "lucid-cardano";

import { secretSeed } from "./seed";

// const SECRET_SEED = "unhappy hammer slow nephew nominee sudden meat office wrist just alpha spirit roof design grace sad inquiry nose reopen dismiss diary leader come play"

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

export { lucid, policyId, mintingPolicy };
