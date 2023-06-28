import { AppError, Request, catchAsync, decodeToken } from "@cloud10lms/shared";
import { ManagerType, Role } from "../../types";
import { NextFunction, Response } from "express";

import { managerService } from "../services/manager.db";

export const protectRoute = catchAsync(
  async (
    req: Request<ManagerType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    const token = req.jwt;

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET!);

    const manager = await managerService.getManagerById(decoded?.id);

    req.manager = manager;
    req.role = decoded?.role;

    next();
  }
);
