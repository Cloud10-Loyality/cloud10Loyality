import { NextFunction, Request, Response } from "express";

import { AppError } from "@cloud10lms/shared/build/utils/appError";
import Integration from "../models/integration.model";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";

export const getIntegrations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const integrations = await Integration.find();

    res.status(200).json({
      message: "success",
      error: false,
      totalRecords: integrations.length,
      data: integrations,
    });
  }
);

export const getIntegration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the integration id", 400));
    }

    const integration = await Integration.findById(id);

    if (!integration) {
      return next(new AppError("Integration not found", 404));
    }

    res.status(200).json({
      message: "success",
      error: false,
      data: integration,
    });
  }
);

export const createIntegration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!body) {
      return next(
        new AppError("Please provide all the required integration details", 400)
      );
    }

    await Integration.create({ ...body });

    res.status(201).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);

export const updateIntegration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    if (!id) {
      return next(new AppError("Please provide the integration id", 400));
    }

    if (!body) {
      return next(
        new AppError("Please provide all the required integration details", 400)
      );
    }

    const newData = await Integration.findByIdAndUpdate(id, { ...body });

    res.status(200).json({
      message: "success",
      error: false,
      data: newData,
    });
  }
);

export const deleteIntegration = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the integration id", 400));
    }

    await Integration.findByIdAndDelete(id);

    res.status(204).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
