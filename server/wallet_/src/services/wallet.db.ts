import { Types } from "mongoose";
import Wallet from "../models/walletModel";
import { WalletType } from "../../types";
import { handlePaytoAddr } from "./payToAddr";
import { lucid } from ".";

class WalletService {
  private model = Wallet;

  public async getWallets(): Promise<WalletType[]> {
    const wallets = this.model.find();
    return wallets;
  }

  public async getWallet(id: Types.ObjectId): Promise<WalletType> {
    const wallet = this.model.findById(id);
    return wallet;
  }

  public async getWalletByOrPhone(
    email: string,
    phone: number
  ): Promise<WalletType[]> {
    const wallet = this.model.find().byEmailorPhone(email, phone);
    return wallet;
  }

  public async createWallet(data: Partial<WalletType>): Promise<WalletType> {
    const privateKey = lucid.utils.generatePrivateKey();

    const address = await lucid
      .selectWalletFromPrivateKey(privateKey)
      .wallet.address();

    //* pay to this address
    const txHash = await handlePaytoAddr(address);

    const wallet = this.model.create({
      ...data,
      privateKey,
      address,
      txHash,
    });

    return wallet;
  }

  public async updateWallet(
    id: Types.ObjectId,
    data: Partial<WalletType>
  ): Promise<WalletType> {
    const wallet = await this.model.findByIdAndUpdate(id, data);

    return wallet;
  }

  public async deleteWallet(id: Types.ObjectId): Promise<WalletType> {
    const wallet = await this.model.findByIdAndDelete(id);
    return wallet;
  }
}

export const walletService = new WalletService();
