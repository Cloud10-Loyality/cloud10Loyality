import { AppError, Request, catchAsync } from "@cloud10lms/shared";

import { NextFunction } from "express-serve-static-core";
import { Response } from "express";
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
