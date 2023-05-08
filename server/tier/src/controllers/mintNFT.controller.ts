import { Request, Response, NextFunction } from "express";
import { mintNFT } from "../services/mintNFT";
import { burnNFT } from "../services/burnNFT";
import Mint from ".././models/mintModel";
import Burn from "../models/burnModel";
import { secretSeed } from "../services/seed";
import { lucid } from "../services";

export const createNFT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const { txHash, UNIT_VALUE } = await mintNFT(name);
    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
    const result = await Mint.create({
      name,
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
    next(err);
  }
};

export const useNFT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const { txHash, UNIT_VALUE } = await burnNFT(name);
    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();
    const result = await Burn.create({
      name,
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
    next(err);
  }
};
