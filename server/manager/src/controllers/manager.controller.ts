import { AppError, Request, catchAsync } from "@c10lms/common";
import { NextFunction, Response } from "express";

import { IntegrationUpdatedPublisher } from "../events/publishers/integration-updated-publisher";
import { Types } from "mongoose";
import { managerService } from "../services/manager.db";
import { natsClient } from "../nats-client";

export const getMe = catchAsync(async (req: Request, res: Response) => {
  const manager = req.manager;

  res.status(200).json({
    status: "success",
    error: false,
    data: {
      manager,
    },
  });
});

export const getManagers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };

    const options = {
      populate: req.query.populate,
      fields: req.query.fields,
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const integrations = await managerService.getAllManagers(
      queryObj,
      options as any
    );

    res.status(200).json({
      message: "success",
      error: false,
      totalRecords: integrations.length,
      data: integrations,
    });
  }
);

export const createManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!Object.entries(body).length) {
      return next(new AppError("Please fill all the reqiuired fields", 400));
    }

    const manager = await managerService.createManager(req.body);

    res.status(201).json({
      status: "success",
      error: false,
      data: {
        manager,
      },
    });
  }
);

export const updateManager = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const body = req.body;

    if (!Object.entries(body).length) {
      return next(new AppError("Please fill all the reqiuired fields", 400));
    }

    const manager = await managerService.updateManager(id, body);

    await new IntegrationUpdatedPublisher(natsClient.client).publish({
      id: manager!._id as unknown as string,
      ...body,
    });

    res.status(200).json({
      status: "success",
      error: false,
      message: "Manager updated successfully",
      data: {
        manager,
      },
    });
  }
);
