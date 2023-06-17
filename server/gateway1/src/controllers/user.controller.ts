import { NextFunction, Response } from "express";
import { Request, catchAsync } from "@cloud10lms/shared";

import { userService } from "../services/users.db";

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        users,
      },
    });
  }
);
