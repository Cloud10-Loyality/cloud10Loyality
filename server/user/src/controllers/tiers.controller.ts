import { NextFunction, Response } from "express";
import { Request, catchAsync } from "@c10lms/common";

import { Types } from "mongoose";
import { UserTiers } from "../models/userTiers.model";
import { UserType } from "../../types";
import { tierService } from "../services/tiers.db";
import { userTiersService } from "../services/userTiers.db";

export const getMe = catchAsync(
  async (req: Request<{}, {}, UserType>, res: Response, next: NextFunction) => {
    const user = req.user;

    const tiers = await userTiersService.getUserTiers(user.email!);

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: tiers!.length,
      data: {
        tiers,
      },
    });
  }
);

export const deleteMyTiers = catchAsync(
  async (req: Request<{}, {}, UserType>, res: Response, next: NextFunction) => {
    const user = req.user;

    await userTiersService.deleteUserTiers(user.email!);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Tiers deleted successfully",
      data: null,
    });
  }
);

export const deleteAllTiers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await UserTiers.deleteMany();

    res.status(200).json({
      status: "success",
      error: false,
      message: "All tiers deleted successfully",
      data: null,
    });
  }
);

export const getTiers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tiers = await tierService.getTiers();

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: tiers!.length,
      data: {
        tiers,
      },
    });
  }
);

export const deleteTiers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  await tierService.deleteTierByTierId(id as unknown as Types.ObjectId);

  res.status(200).json({
    status: "success",
    error: false,
    message: "Tier deleted successfully",
    data: null,
  });
});
