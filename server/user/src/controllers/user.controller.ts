import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { Types } from "mongoose";
import { userService } from "../services/user.db";

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { fields, limit, sort } = req.query;
    const queryObj = { ...req.query };

    const options = {
      fields: fields as string,
      limit: limit as string,
      sort: sort as string,
    };

    const reservations = await userService.getAllUsers(queryObj, options);

    res.status(200).json({
      message: "success",
      error: false,
      totalRecords: reservations.length,
      data: reservations,
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const user = await userService.getUserId(id as unknown as Types.ObjectId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      message: "success",
      error: false,
      data: user,
    });
  }
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
