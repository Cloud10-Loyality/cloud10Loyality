import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { TierName } from "../../types";

// import { NextFunction } from "express";
// import TierNFT from "../models/tierNftModel";
// import { lucid } from "../services";
// import { assets } from "../services/assets";

// export const mintAsset = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   } catch (error) {}
// };

export const createTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tierName = req.query.name as unknown as TierName;
    const body = req.body;

    if (!tierName) {
      return next(new AppError("Tier name is required", 400));
    }

    switch (tierName) {
      case "SILVER":
        return res.status(200).json({});
        break;
      case "PLATINUM":
        return res.status(200).json({});
        break;
      case "GOLD":
        return res.status(200).json({});
        break;
      default:
        return res.status(200).json({});
        break;
    }
  }
);
