import { AppError, Request, assignToken, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { Types } from "mongoose";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { UserDeletedPublisher } from "../events/publishers/user-deleted-publisher";
import { UserType } from "../../types";
import { natsClient } from "../nats-client";
import { userService } from "../services/user.db";

export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        user,
      },
    });
  }
);

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
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!Object.entries(body).length) {
      return next(new AppError("Please provide all the required fields", 400));
    }

    await userService.createUser(body);

    res.status(201).json({
      status: "success",
      error: false,
      message: "User created successfully",
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, phone } = req.body;

    let user: UserType[] | null | undefined;

    if (email) {
      user = await userService.getUserByEmail(email);
    }

    if (phone) {
      user = await userService.getUserByPhone(phone);
    }

    if (!user!.length) {
      return next(new AppError("No user found with that email or phone", 404));
    }

    const accessToken = await assignToken(
      {
        email: user![0].email,
        id: user![0]._id,
        role: "USER",
      },
      process.env.ACCESS_TOKEN_SECRET!,
      process.env.JWT_ACCESS_EXPIRES_IN_DEV!
    );
    const refreshToken = await assignToken(
      {
        email: user![0].email,
        id: user![0]._id,
        role: "USER",
      },
      process.env.REFRESH_TOKEN_SECRET!,
      process.env.JWT_REFRESH_EXPIRES_IN_DEV!
    );

    res.cookie("AUTH", refreshToken, {
      path: "/",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({
      status: "success",
      message: "Login successfull",
      error: false,
      data: {
        accessToken,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    if (!id) {
      return next(new AppError("Please provide the user id", 400));
    }

    const user = await userService.deleteUser(id as unknown as Types.ObjectId);
    await new UserDeletedPublisher(natsClient.client).publish({
      id,
      email: user!.email,
    });

    res.status(200).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
