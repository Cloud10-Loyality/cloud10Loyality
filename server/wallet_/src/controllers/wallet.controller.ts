import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { Lucid, Slot } from "lucid-cardano";
import { NextFunction, Response } from "express";

import { Types } from "mongoose";
import Wallet from "../models/walletModel";
import { WalletType } from "../../types";
import { handlePaytoAddr } from "../services/payToAddr";
import { secretSeed } from "../services/seed";
import { walletService } from "../services/wallet.db";

const lucid = await Lucid.new(undefined, "Preview");

export const getWallets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const wallets = await walletService.getWallets();

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: wallets.length,
      message: "Wallets fetched successfully",
      data: {
        wallets,
      },
    });
  }
);

export const getWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const wallet = walletService.getWallet(id);

    if (!wallet) {
      return next(new AppError("No wallet found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        wallet,
      },
    });
  }
);

export const createWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return next(new AppError("Please provide all the required fields", 400));
    }

    // Check if the email or phone already exist in the database
    const walletExists = await Wallet.find().byEmailorPhone(email, phone);

    if (walletExists.length) {
      return next(new AppError("Wallet already exists", 400));
    }

    const privateKey = lucid.utils.generatePrivateKey();

    const address = await lucid
      .selectWalletFromPrivateKey(privateKey)
      .wallet.address();

    //* pay to this address
    const txHash = await handlePaytoAddr(address);

    const result = await walletService.createWallet({
      name,
      email,
      phone,
      privateKey,
      address,
      txHash,
    });

    res.status(201).json({
      status: "success",
      error: false,
      message: "Wallet created successfully",
      data: {
        result,
        txHash,
      },
    });
  }
);

export const updateWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body as unknown as WalletType;
    const id = req.params.id as unknown as Types.ObjectId;

    const wallet = await walletService.getWallet(id);

    if (!wallet) {
      return next(new AppError("No wallet found with that ID", 404));
    }

    await walletService.updateWallet(id, body);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Wallet updated successfully",
    });
  }
);

export const deleteWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as unknown as Types.ObjectId;

    const wallet = await walletService.getWallet(id);

    if (!wallet) {
      return next(new AppError("Wallet not found", 404));
    }

    await walletService.deleteWallet(id);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Wallet deleted successfully",
    });
  }
);
