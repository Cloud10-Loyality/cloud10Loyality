import { Types } from "mongoose";
import Wallet from "../models/walletModel";
import { WalletType } from "../../types";

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

  public async createWallet(data: Partial<WalletType>): Promise<WalletType> {
    const wallet = this.model.create({
      ...data,
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
