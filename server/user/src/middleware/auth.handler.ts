import { AppError, Request, catchAsync, decodeToken } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { userService } from "../services/user.db";

export const protectRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.jwt;

    const decoded = await decodeToken(token, process.env.ACCESS_TOKEN_SECRET!);

    const user = await userService.getUserByEmail(decoded?.email);

    if (!user) {
      return next(
        new AppError("You'r not registered, please register to continue", 401)
      );
    }

    req.user = user[0];
    req.role = decoded?.role;

    next();
  }
);
