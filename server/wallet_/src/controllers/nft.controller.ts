import { AppError, catchAsync, Request } from "@cloud10lms/shared";
import { Response, NextFunction } from "express";
import { burnNFT } from "../services/burnNFT";
import Mint from "../models/mintModel";
import Burn from "../models/burnModel";
import { secretSeed } from "../services/seed";
import { lucid, policyId } from "../services";
import { mintNftMetadata } from "../services/pointServiceV1/mintNftMetadata";
import { nftService } from "../services/nft.db";
import MintMetadata from "../models/mintMetadata.model";
import axios from "axios";

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
    const { email, description, label, tokenName, name } = req.body;

    const { txHash, UNIT_VALUE, metadata } = await nftService.mintNFTMetadata({
      email,
      description,
      label,
      tokenName,
      name,
    });

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
        policyId,
        metadata,
        txHash,
      },
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
    try {
      const { email } = req.query;

      // Find documents with the specified email
      const documents = await MintMetadata.find({ "metadata.email": email });

      // Calculate the sum of units
      let sum = 0;
      documents.forEach((doc) => {
        sum += doc.metadata.unit.valueOf();
      });

      res.status(200).json({ totalUnits: sum });
    } catch (err) {
      next(err);
    }
  }
);
