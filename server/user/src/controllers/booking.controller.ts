import { AppError, Request, catchAsync } from "@cloud10lms/shared";
import { NextFunction, Response } from "express";

import { UserType } from "../../types";
import { bookingService } from "../services/bookings.db";

export const getMe = catchAsync(
  async (req: Request<{}, {}, UserType>, res: Response, next: NextFunction) => {
    const user = req.user;

    console.log(user);

    const bookings = await bookingService.getBookingByEmail(user.email!);

    res.status(200).json({
      status: "success",
      error: false,
      totalLength: bookings!.length,
      data: {
        bookings,
      },
    });
  }
);

export const getBookings = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const role = req.role;

    if (role === "USER") {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }

    const { fields, limit, sort } = req.query;
    const queryObj = { ...req.query };

    const options = {
      fields: fields as string,
      limit: limit as string,
      sort: sort as string,
    };

    const bookings = await bookingService.getAllBookings(queryObj, options);

    res.status(200).json({
      status: "success",
      error: false,
      totalLength: bookings!.length,
      data: {
        bookings,
      },
    });
  }
);
