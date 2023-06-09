import {
  AppError,
  Request,
  assignToken,
  catchAsync,
  compareHash,
  decodeToken,
} from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { IntegrationCreatedPublisher } from "../events/publishers/integration-created-publisher";
import { Types } from "mongoose";
import { env } from "../env";
import { integrationService } from "../services/integrations.db";
import { natsClient } from "../nats-client";

export const signup = catchAsync(
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
      id: newIntegration._id as unknown as string,
      name: newIntegration.name,
      username: newIntegration.username,
      email: newIntegration.email,
      role: newIntegration.role,
      city: newIntegration.city,
      state: newIntegration.state,
      pin: newIntegration.pin,
      description: newIntegration.description,
    });

    res.status(201).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new AppError("Please provide all the required integration details", 400)
      );
    }

    const integration = await integrationService.getIntegrationByEmail(email);

    if (!integration || !(await compareHash(password, integration.password))) {
      return next(new AppError("Invalid email or password", 400));
    }

    const accessToken = assignToken(
      { id: integration._id, role: "MANAGER" },
      env.ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_EXPIRES_IN_DEV
    );

    const refreshToken = assignToken(
      { id: integration._id },
      env.REFRESH_TOKEN_SECRET,
      env.JWT_REFRESH_EXPIRES_IN_DEV
    );

    res.cookie("AUTH", refreshToken, {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      message: "success",
      error: false,
      data: {
        accessToken,
      },
    });
  }
);

export const refresh = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { AUTH } = req.cookies;

    if (!AUTH) {
      return next(new AppError("Please login to continue", 401));
    }

    const decoded = await decodeToken(AUTH, "REFRESH");

    const manager = await integrationService.getIntegrationById(decoded?.id);

    const accessToken = assignToken(
      { id: manager._id },
      env.ACCESS_TOKEN_SECRET,
      env.JWT_ACCESS_EXPIRES_IN_DEV
    );

    res.status(200).json({
      message: "success",
      error: false,
      data: {
        accessToken,
      },
    });
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { AUTH } = req.cookies;

    if (!AUTH) {
      return next(
        new AppError("You'r not logged in, Please login to continue", 401)
      );
    }

    res.clearCookie("AUTH", {
      sameSite: "lax",
      secure: env.NODE_ENV === "production",
      httpOnly: true,
    });

    res.status(200).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
