import { AppError, Request, catchAsync } from "@c10lms/common";
import { NextFunction, Response } from "express";

import { ResponseBody } from "../../types";
import { Types } from "mongoose";
import { userService } from "../services/users.db";

export const getUsers = catchAsync(
  async (req: Request, res: Response<ResponseBody>, next: NextFunction) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      status: "success",
      error: false,
      message: "Users fetched successfully",
      data: {
        users,
      },
    });
  }
);

export const deleteUsers = catchAsync(
  async (req: Request, res: Response<ResponseBody>, next: NextFunction) => {
    const { email } = req.query;

    const user = await userService.getUserByEmail(email as string);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    await userService.deleteUser(email as string);

    res.status(200).json({
      status: "success",
      error: false,
      message: "User deleted successfully",
      data: null,
    });
  }
);
