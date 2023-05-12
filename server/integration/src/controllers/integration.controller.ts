import { NextFunction, Request, Response } from "express";

import { AppError } from "@cloud10lms/shared/build/utils/appError";
import Integration from "../models/integration.model";
import { IntegrationCreatedPublisher } from "../events/publishers/integration-created-publisher";
import { IntegrationUpdatedPublisher } from "../events/publishers/integration-updated-publisher";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";
import { integrationService } from "../services/reservations.db";
import { natsClient } from "../nats-client";

export const getIntegrations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };

    const options = {
      populate: req.query.populate,
      fields: req.query.fields,
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const integrations = await integrationService.getAllIntegrations(
      queryObj,
      options
    );

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

    const integration = await integrationService.getIntegrationById(id);

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

    const newIntegration = await integrationService.createIntegration({
      ...body,
    });

    await new IntegrationCreatedPublisher(natsClient.client).publish({
      id: newIntegration.id,
      name: newIntegration.name,
    });

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

    const newData = await integrationService.updateIntegration(id, { ...body });

    await new IntegrationUpdatedPublisher(natsClient.client).publish({
      id: newData!.id,
      name: newData!.name,
    });

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

    const foundIntegration = await integrationService.getIntegrationById(id);

    if (!foundIntegration) {
      return next(new AppError("Integration not found", 404));
    }

    await integrationService.deleteIntegration(id);

    res.status(204).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
