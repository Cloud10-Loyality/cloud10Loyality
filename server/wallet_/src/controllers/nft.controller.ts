import { AppError, Request, catchAsync } from "@c10lms/common";
import { NextFunction, Response } from "express";
import { lucid, policyId } from "../services";

import Burn from "../models/burnModel";
import Mint from "../models/mintModel";
import MintMetadata from "../models/mintMetadata.model";
import { Types } from "mongoose";
import axios from "axios";
import { burnNFT } from "../services/burnNFT";
import { mintNftMetadata } from "../services/pointServiceV1/mintNftMetadata";
import { nftService } from "../services/nft.db";
import { secretSeed } from "../services/seed";

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
    const { email, description, label, tokenName, name, managerId } = req.body;

    const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
      email,
      description,
      label,
      tokenName,
      name,
      managerId,
    });

    const address = await lucid
      .selectWalletFromSeed(secretSeed)
      .wallet.address();

    // await nftService.handleBurning({
    //   metadata,
    //   policyId,
    //   txHash,
    //   address,
    //   tokenName,
    // });

    return res.status(201).json({
      status: "success",
      error: false,
      data: {
        policyId,
        metadata,
        txHash,
      },
    });
  }
);
export const deleteMintMetaData = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const mintMetadata = await nftService.getMintNFTMetadataById(id);

    if (!mintMetadata) {
      return next(new AppError("Data not found", 404));
    }

    await nftService.deleteMintMetadata(id);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Data deleted successfully",
    });
  }
);

export const getAssetDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    MintMetadata.find()
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).json({
            message: "Not found",
          });
        }
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  }
);

export const deleteAssets = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await MintMetadata.deleteMany();

    res.status(200).json({
      status: "success",
      error: false,
      message: "Data deleted successfully",
    });
  }
);

export const getPolicyId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const _id = await MintMetadata.findById(id);
    if (!_id) {
      return res.status(404).json({ error: "id not found" });
    }
    const policyId = _id.metadata.policyId;

    const apiUrl = `https://cardano-preprod.blockfrost.io/api/v0/assets/policy/${policyId}`;
    const config = {
      headers: {
        project_id: process.env.BLOCKFROST_KEY,
      },
    };
    let assetHex: string;
    try {
      const response = await axios.get(apiUrl, config);
      const responseData = response.data;
      if (responseData && responseData.length > 0) {
        const asset = responseData[0];
        assetHex = asset.asset;
      }
    } catch (error) {
      return next(error);
    }

    const assetUrl = `https://cardano-preprod.blockfrost.io/api/v0/assets/${assetHex}`;

    try {
      const response = await axios.get(assetUrl, config);
      const responseAsset = response.data;
      console.log(responseAsset);
      res.status(200).json({
        status: "success",
        error: false,
        message: "Asset fetched successfully",
        data: {
          assetHex,
          responseAsset,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export const burnTokenMetadata = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tokenName } = req.body;
    const { txHash } = await nftService.burnNFTMetadata({
      tokenName,
    });

    if (!tokenName) {
      return res.status(404).json({
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      error: false,
      data: {
        txHash,
        policyId,
      },
    });
  }
);

export const getPoints = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const { email } = req.query;
    const { managerId } = req.body;

    // Find documents with the specified email
    const units = await nftService.getPoints(
      email as unknown as string,
      managerId
    );

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        points: {
          email,
          points: units,
        },
      },
    });
    // } catch (err) {
    //   next(err);
    // }
  }
);
