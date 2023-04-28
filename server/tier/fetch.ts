//  Get all transaction value



import {
  Blockfrost,
  fromText,
  Lucid,
  MintingPolicy,
  PolicyId,
  TxHash,
  Address,
  NFTMetadataDetails,
  Unit,
  
  WalletApi
} from "lucid-cardano";

import { secretSeed } from "./seed";

let utxo;
let lucid: Lucid;

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
    // wallet = lucid.wallet;
    return lucid.wallet.getUtxos();
  })
  .then((res) => {
    utxo = res;
    console.log(utxo,"all the utxoooooooooooooo");
  })
  .catch((err) => console.error(err));
