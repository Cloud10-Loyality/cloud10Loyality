import { AppError, catchAsync, Request } from "@cloud10lms/shared";
import { Response, NextFunction } from "express";
import { burnNFT } from "../services/burnNFT";
import Mint from "../models/mintModel";
import Burn from "../models/burnModel";
import { secretSeed } from "../services/seed";
import { lucid, policyId } from "../services";
import { mintNftMetadata } from "../services/pointServiceV1/mintNftMetadata";
import { nftService } from "../services/nft.db";

export const mintNFTtoken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tokenName = req.body.tokenName;

    if (!tokenName) {
      return next(new AppError("Token name is required", 400));
    }

    const result = await nftService.handleMinting({
      tokenName,
      policyId,
    });

    res.status(201).json({
      status: "success",
      error: false,
      data: {
        result,
      },
    });
  }
);

export const burnNFTtoken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tokenName = req.body.tokenName;

    if (!tokenName) {
      return next(new AppError("Token name is required", 400));
    }

    const result = await nftService.handleBurning({
      tokenName,
      policyId,
    });

    res.status(201).json({
      status: "success",
      error: false,
      data: {
        result,
      },
    });
  }
);

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

export const mintTokenMetadata = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, description, label, tokenName } = req.body;

    const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
      email,
      description,
      label,
      tokenName,
    });
    console.log(
      "🚀 ~ file: nft.controller.ts:115 ~ { txHash, UNIT_VALUE, metadata }:",
      { txHash, UNIT_VALUE, metadata }
    );

    return;

    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();

    const result = await Burn.create({
      metadata,
      policyId,
      txHash,
      address,
      unit: UNIT_VALUE.toString(),
    });
    return res.status(201).json({
      status: "success",
      error: false,
      data: {
        result,
        metadata,
      },
    });
  }
);
