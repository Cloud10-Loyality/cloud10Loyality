
import { AppError } from "@cloud10lms/shared/build/utils/appError";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { WalletType } from "../../types";
import { walletService } from "../services/wallet.db";
import { mintNFT } from "../services/mintNFT";
import { burnNFT } from "../services/burnNFT";
import Mint from "../models/mintModel";
import Burn from "../models/burnModel";
import { secretSeed } from "../services/seed";
import { lucid, policyId } from "../services";

export const mintNFTtoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id as unknown as Types.ObjectId;
    const wallet = await walletService.getWallet(id);
    const pkey = wallet.privateKey;
    const token_name = req.body.token_name;

    if (!token_name) {
      return next(new AppError("Name is required", 400));
    }

    const { txHash, UNIT_VALUE } = await mintNFT(token_name);

    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
    const result = await Mint.create({
      token_name,
      policyId,
      txHash,
      address,
      unit: UNIT_VALUE.toString(),
    });
    res.status(201).json({
      status: "success",
      error: false,
      data: {
        result,
      },
    });
  } catch (err) {
    res.status(400).json({
      error: "Name is required",
    });
  }
};

export const burnNFTtoken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token_name = req.body.token_name;
    if (!token_name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const { txHash, UNIT_VALUE } = await burnNFT(token_name);
    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
    const result = await Burn.create({
      token_name,
      policyId,
      txHash,
      address,
      unit: UNIT_VALUE.toString(),
    });
    res.status(200).json({
      status: "success",
      error: false,
      data: {
        result,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getNfts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    Mint.find().then((data) => {
      res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

// *TODO: NOT WORKING
export const burnByPolicyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const policyId = req.params.policyId;

    await Mint.findOneAndDelete({ policyId });

    if (!policyId) {
      return res.status(404).json({
        message: "policyId not found",
      });
    }

    const { txHash, UNIT_VALUE } = await burnNFT(policyId);

    return res.status(200).json({
      txHash,
      UNIT_VALUE,
      message: "NFT burned successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to burn NFT",
      error: error.message,
    });
  }
};
