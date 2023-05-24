import { Request, catchAsync, decodeToken } from "@cloud10lms/shared";
import { Role } from "../../types";
import { NextFunction, Response } from "express";
import { integrationService } from "../services/integrations.db";
import { IntegrationType } from "../models/integration.model";
import { env } from "../env";

export const protectRoute = catchAsync(
  async (
    req: Request<IntegrationType, Role>,
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
