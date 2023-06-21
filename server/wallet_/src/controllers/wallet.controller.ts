import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { Lucid, Slot } from "lucid-cardano";
import { NextFunction, Response } from "express";

import { Types } from "mongoose";
import Wallet from "../models/walletModel";
import { WalletType } from "../../types";
import axios from "axios";
import { handlePaytoAddr } from "../services/payToAddr";
import { secretSeed } from "../services/seed";
import { walletService } from "../services/wallet.db";

const lucid = await Lucid.new(undefined, "Preprod");

export const getWallets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const wallets = await walletService.getWallets();
    // Fetch points for each wallet
    const updatedWallets = [];
    for (const wallet of wallets) {
      const apiUrl = `https://cardano-preprod.blockfrost.io/api/v0/addresses/${wallet.address}`;
      const config = {
        headers: {
          project_id: process.env.BLOCKFROST_KEY,
        },
      };

      let points: Array<{ unit: string; quantity: string }> = [];
      try {
        const response = await axios.get(apiUrl, config);
        const responseData = response.data;

        if (responseData && responseData.amount) {
          points = responseData.amount.map((item: any) => {
            return {
              unit: item.unit,
              quantity: item.quantity,
            };
          });
        }
      } catch (error) {
        next(error);
      }

      // Update the wallet object with the points
      wallet.points = points;
      updatedWallets.push(wallet);
    }

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: updatedWallets.length,
      message: "Wallets fetched successfully",
      data: {
        wallets: updatedWallets,
      },
    });
  }
);

export const getWallet = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const wallet = await walletService.getWallet(id);

    if (!wallet) {
      return next(new AppError("No wallet found with that ID", 404));
    }

    const apiUrl = `https://cardano-preprod.blockfrost.io/api/v0/addresses/${wallet.address}`;
    const config = {
      headers: {
        project_id: process.env.BLOCKFROST_KEY,
      },
    };

    let points: Array<{ unit: string; quantity: string }> = [];
    try {
      const response = await axios.get(apiUrl, config);
      const responseData = response.data;

      if (responseData && responseData.amount) {
        points = responseData.amount.map((item: any) => {
          return {
            unit: item.unit,
            quantity: item.quantity,
          };
        });
      }
    } catch (error) {
      // Handle the error appropriately
    }

    wallet.points = points; // Update the wallet object with the points

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        wallet: {
          // _id: wallet.id,
          name: wallet.name,
          email: wallet.email,
          phone: wallet.phone,
          privateKey: wallet.privateKey,
          address: wallet.address,
          txHash: wallet.txHash,
          points: wallet.points,
        },
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
    const walletExists = await walletService.getWalletByOrPhone(email, phone);

    if (walletExists.length) {
      return next(new AppError("Wallet already exists", 400));
    }

    const result = await walletService.createWallet({
      name,
      email,
      phone,
    });

    // Retrieve points data from the API
    const apiUrl = `https://cardano-preprod.blockfrost.io/api/v0/addresses/${result.address}`;
    const config = {
      headers: {
        project_id: process.env.BLOCKFROST_KEY,
      },
    };

    let points: Array<{ unit: string; quantity: string }> = [];
    try {
      const response = await axios.get(apiUrl, config);
      const responseData = response.data;
      if (responseData && responseData.points) {
        points = responseData.points;
      }
    } catch (error) {
      // console.error(error);
    }

    await walletService.updateWallet(result._id as unknown as Types.ObjectId, {
      points,
    });

    res.status(201).json({
      status: "success",
      error: false,
      message: "Wallet created successfully",
      data: {
        result,
        txHash: result.txHash,
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
