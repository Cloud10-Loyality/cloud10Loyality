import { AppError, Request, catchAsync } from "@c10lms/common";
import { NextFunction, Response } from "express";

import { TierCreatedPublisher } from "../events/publishers/tier-created-publisher";
import { TierName } from "../../types";
import { Types } from "mongoose";
import { natsClient } from "../nats-client";
import { tierService } from "../services/tier.db";

export const getTiers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const type = req.query.type as unknown as TierName;

    if (!type) {
      return next(new AppError("Tier type is required", 400));
    }

    const tiers = await tierService.getTiers(type);

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        tiers,
      },
    });
  }
);

export const getAllTiersByManagerId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const managerId = req.params.managerId as unknown as Types.ObjectId;

    const tiers = await tierService.getAllTiersByManagerId(managerId);

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: tiers.length,
      data: {
        tiers,
      },
    });
  }
);

export const createTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const type = req.query.type as unknown as TierName;
    const body = req.body;

    if (!body) {
      return next(new AppError("Please fill all the reqired fields", 400));
    }

    const tier = await tierService.createTier(type, body);
    await new TierCreatedPublisher(natsClient.client).publish({
      name: tier!.name,
      points: tier!.points,
      rewards: tier!.rewards,
      manager: tier!.manager,
    });

    res.status(201).json({
      status: "success",
      error: false,
      message: "Tier created successfully",
    });
  }
);

export const updateTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const managerId = req.params.managerId as unknown as Types.ObjectId;
    const type = req.query.type as unknown as TierName;
    const body = req.body;

    if (!Object.entries(body).length) {
      return next(new AppError("Please fill all the required fields", 400));
    }

    await tierService.updateTier(managerId, type, body);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Tier updated successfully",
    });
  }
);

export const deleteTierByTierId = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tierId = req.params.tierId as unknown as Types.ObjectId;

    await tierService.deleteTierByTierId(
      tierId,
      req.query.type as unknown as TierName
    );

    res.status(200).json({
      status: "success",
      error: false,
      message: "Tier deleted successfully",
    });
  }
);

export const deleteTier = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const managerId = req.params.managerId as unknown as Types.ObjectId;
    const type = req.query.type as unknown as TierName;

    await tierService.deleteTier(managerId, type);

    res.status(200).json({
      status: "success",
      error: false,
      message: "Tier deleted successfully",
    });
  }
);
