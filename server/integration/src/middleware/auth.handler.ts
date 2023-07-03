import { ManagerType, Role } from "../../types";
import { NextFunction, Response } from "express";
import { Request, catchAsync, decodeToken } from "@c10lms/common";

import { env } from "../env";
import { integrationService } from "../services/integrations.db";

export const protectRoute = catchAsync(
  async (
    req: Request<ManagerType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.jwt;

    const decoded = await decodeToken(token, env.ACCESS_TOKEN_SECRET);

    const manager = await integrationService.getIntegrationById(decoded?.id);

    req.manager = manager;
    req.role = decoded?.role;

    next();
  }
);
