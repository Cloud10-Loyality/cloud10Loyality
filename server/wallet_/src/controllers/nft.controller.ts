import { AppError } from "@cloud10lms/shared/build/utils/appError";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { mintNFT } from "../services/mintNFT";
import { burnNFT } from "../services/burnNFT";
import Mint from "../models/mintModel";
import Burn from "../models/burnModel";
import { secretSeed } from "../services/seed";
import { lucid } from "../services";

export const createNFT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token_name = req.body.token_name;
    console.log(!token_name, "-----------------");
    if (!token_name) {
      console.log("inside request");
      return next(new AppError("Name is required", 400));
    }
    const { txHash, UNIT_VALUE } = await mintNFT(token_name);
    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
    const result = await Mint.create({
      token_name,
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

export const useNFT = async (
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
