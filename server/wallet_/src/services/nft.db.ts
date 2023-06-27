import { Label, NFTMetadataDetails, Unit, fromText } from "lucid-cardano";
import { lucid, mintingPolicy, policyId } from ".";
import { BurnType, MintType } from "../../types";
import Burn from "../models/burnModel";
import Mint from "../models/mintModel";
import { secretSeed } from "../services/seed";
import { burnNFT } from "./burnNFT";
import { mintNFT } from "./mintNFT";

class NftService {
  private mintModel = Mint;
  private burnModel = Burn;
  private address: string = "";
  private MINT_UNIT_VALUE: bigint = 0n;
  private mintTxHash: string = "";
  private burnTxHash: string = "";
  private BURN_UNIT_VALUE: bigint = 0n;

  public async getAddress(): Promise<void> {
    this.address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
  }

  public async mintNft(tokenName?: string): Promise<void> {
    const { txHash, UNIT_VALUE } = await mintNFT(tokenName);

    this.mintTxHash = txHash;
    this.MINT_UNIT_VALUE = UNIT_VALUE;
  }

  public async burnNft(tokenName?: string): Promise<void> {
    const { txHash, UNIT_VALUE } = await burnNFT(tokenName);

    this.burnTxHash = txHash;
    this.BURN_UNIT_VALUE = UNIT_VALUE;
  }

  public async handleMinting(body: MintType): Promise<MintType> {
    await Promise.all([this.getAddress(), this.mintNft(body.tokenName)]);

    const res = await this.mintModel.create({
      address: this.address,
      policyId: body.policyId,
      tokenName: body.tokenName,
      txHash: this.mintTxHash,
      unit: this.MINT_UNIT_VALUE.toString(),
    });

    return res;
  }

  public async handleBurning(body: BurnType): Promise<BurnType> {
    await this.getAddress();
    await this.burnNft(body.tokenName);

    const res = await this.burnModel.create({
      address: this.address,
      policyId: body.policyId,
      tokenName: body.tokenName,
      txHash: this.burnTxHash,
      unit: this.BURN_UNIT_VALUE.toString(),
    });

    return res;
  }

  public async mintNFTMetadata(data: {
    email: string;
    description: string;
    label: Label;
    tokenName: string;
  }): Promise<{
    txHash: string;
    UNIT_VALUE: bigint;
    metadata: NFTMetadataDetails;
  }> {
    // const tokenName = "NADA";
    // const label: Label = 20;
    const unit: Unit = policyId + fromText(data.tokenName);
    const UNIT_VALUE = 1n;

    const metadata: NFTMetadataDetails = {
      email: data.email,
      description: data.description,
      metadataLabel: [data.label],
      policyId: [policyId],
      tokenName: [data.tokenName],
      name: "ERC20",
      image: "",
    };

    const tx = await lucid
      .newTx()
      .mintAssets({ [unit]: UNIT_VALUE })
      .validTo(Date.now() + 100000)
      .attachMintingPolicy(mintingPolicy)
      .attachMetadata(data.label, metadata)
      .complete();

    const signedTx = await tx.sign().complete();

    const txHash = await signedTx.submit();

    return { txHash, UNIT_VALUE, metadata };
  }
}

export const nftService = new NftService();