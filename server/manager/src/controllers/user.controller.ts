import { AppError, Request, catchAsync } from "@c10lms/common";

import { NextFunction } from "express-serve-static-core";
import { Response } from "express";
import { Types } from "mongoose";
import { userService } from "../services/user.db";

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };

    const options = {
      populate: req.query.populate,
      fields: req.query.fields,
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const users = await userService.getAllUsers(queryObj, options as any);

    res.status(200).json({
      status: "success",
      error: false,
      totalRecords: users.length,
      data: {
        users,
      },
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      return next(new AppError("User ID must be provided", 400));
    }

    const user = await userService.getUserById(id as unknown as Types.ObjectId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        user,
      },
    });
  }
);

export const getUserBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userEmail = req.query.userEmail;
    console.log(userEmail);

    const bookings = await userService.getUserBookings(userEmail as string);

    res.status(200).json({
      status: "success",
      error: false,
      totalRecords: bookings.length,
      data: {
        bookings,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await userService.getUserById(id as unknown as Types.ObjectId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    await userService.deleteUser(user.email);

    res.status(200).json({
      status: "success",
      error: false,
      message: "User deleted successfully",
    });
  }
);
