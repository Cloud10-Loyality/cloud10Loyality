import {
  AppError,
  catchAsync,
  assignToken,
  decodeToken,
  compareHash,
} from "@cloud10lms/shared";
import { NextFunction, Response } from "express";
import { integrationService } from "../services/integrations.db";
import { IntegrationCreatedPublisher } from "../events/publishers/integration-created-publisher";
import { natsClient } from "../nats-client";
import { Request } from "../../types";
import { Types } from "mongoose";

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
      "ACCESS",
      process.env.ACCESS_TOKEN_SECRET!
    );
    const refreshToken = assignToken(
      { id: integration._id },
      process.env.REFRESH_TOKEN_SECRET!,
      process.env.JWT_ACCESS_EXPIRES_IN_DEV!
    );

    res.cookie("AUTH", refreshToken, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 * 30),
      secure: process.env.NODE_ENV === "production",
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
      process.env.ACCESS_TOKEN_SECRET!,
      process.env.JWT_ACCESS_EXPIRES_IN_DEV!
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
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
    });

    res.status(200).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
