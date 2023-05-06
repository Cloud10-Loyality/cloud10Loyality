import { NextFunction, Request, Response } from "express";

import { AppError } from "@cloud10lms/shared/build/utils/appError";
import Reservation from "../models/reservation.model";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";

export const getReservations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reservations = await Reservation.find();

    res.status(200).json({
      message: "success",
      error: false,
      totalRecords: reservations.length,
      data: reservations,
    });
  }
);

export const updateReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const reservation = Reservation.findById(id);

    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }

    const body = req.body;

    await Reservation.findByIdAndUpdate(id, { ...body });

    res.status(200).json({
      status: "success",
      error: false,
      data: null,
    });
  }
);

export const createReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    if (!body) {
      return next(
        new AppError("Please provide all the required reservation details", 400)
      );
    }

    await Reservation.create({ ...body });

    res.status(201).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
