import { NextFunction, Response } from "express";
import { Request, catchAsync } from "@cloud10lms/shared";

export const createSilverTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({});
  }
);

export const updateSilverTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({});
  }
);
