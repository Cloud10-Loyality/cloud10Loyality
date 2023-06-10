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
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You'r not logged in, please login to continue", 401)
      );
    }

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET!);

    const manager = await managerService.getManagerById(decoded?.id);

    req.jwt = token;
    req.manager = manager!;
    req.role = decoded?.role;

    next();
  }
);
