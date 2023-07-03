import { NextFunction, Response } from "express";
import { Request, catchAsync } from "@c10lms/common";

import { userService } from "../services/user.db";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      status: "success",
      error: false,
      totalResults: users.length,
      data: {
        users,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const user = await userService.deleteUser(email);

    res.status(200).json({
      status: "success",
      error: false,
      message: "User deleted successfully",
      data: {
        user,
      },
    });
  }
);
