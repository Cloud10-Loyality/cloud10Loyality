import {
  TxHash,
  Unit,
  fromText,
  NFTMetadataDetails,
  Label,
  PolicyId,
} from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from "..";

interface MintNFT {
  txHash: TxHash;
  UNIT_VALUE: bigint;
  metadata: NFTMetadataDetails;
}

export async function mintNftMetadata(): Promise<MintNFT> {
  const tokenName = "NADA";
  const label: Label = 20;
  const unit: Unit = policyId + fromText(tokenName);
  const UNIT_VALUE = 1n;

  const metadata: NFTMetadataDetails = {
    email: "barik@gmail.com",
    description: "This NFT is minted by anil.",
    metadataLabel: [label],
    policyId: [policyId],
    tokenName: [tokenName],
    name: "ERC20",
    image: "",
  };

  const tx = await lucid
    .newTx()
    .mintAssets({ [unit]: UNIT_VALUE })
    .validTo(Date.now() + 100000)
    .attachMintingPolicy(mintingPolicy)
    .attachMetadata(label, metadata)
    .complete();

  const signedTx = await tx.sign().complete();

  const txHash = await signedTx.submit();

  return { txHash, UNIT_VALUE, metadata };
}
