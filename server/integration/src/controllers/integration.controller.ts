import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { IntegrationCreatedPublisher } from "../events/publishers/integration-created-publisher";
import { IntegrationDeletedPublisher } from "../events/publishers/integration-deleted-publisher";
import { IntegrationType } from "../models/integration.model";
import { Role } from "../../types";
import { integrationService } from "../services/integrations.db";
import { natsClient } from "../nats-client";

const getIntegrations = catchAsync(
  async (
    req: Request<IntegrationType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    // FIXME: Dont't forget to uncomment the below lines
    // const role = req.role;

    // if (role !== "ADMIN") {
    //   return next(
    //     new AppError("You are not authorized to access this feature", 403)
    //   );
    // }

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

const getIntegration = catchAsync(
  async (
    req: Request<IntegrationType, Role>,
    res: Response,
    next: NextFunction
  ) => {
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

const updateIntegration = catchAsync(
  async (
    req: Request<IntegrationType, Role>,
    res: Response,
    next: NextFunction
  ) => {
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

    // await new IntegrationUpdatedPublisher(natsClient.client).publish({
    //   id: newData?._id,
    //   name: newData!.name,
    // });

    res.status(200).json({
      message: "success",
      error: false,
      data: newData,
    });
  }
);

const deleteIntegration = catchAsync(
  async (
    req: Request<IntegrationType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return next(new AppError("Please provide the integration id", 400));
    }

    const foundIntegration = await integrationService.getIntegrationById(id);

    if (!foundIntegration) {
      return next(new AppError("Integration not found", 404));
    }

    await integrationService.deleteIntegration(id);
    await new IntegrationDeletedPublisher(natsClient.client).publish({
      id: foundIntegration._id as unknown as string,
      name: foundIntegration.name,
      city: foundIntegration.city,
      email: foundIntegration.email,
      username: foundIntegration.username,
      state: foundIntegration.state,
      role: foundIntegration.role,
      pin: foundIntegration.pin,
      description: foundIntegration.description,
    });

    res.status(200).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);

export {
  getIntegrations,
  getIntegration,
  // createIntegration,
  updateIntegration,
  deleteIntegration,
};
