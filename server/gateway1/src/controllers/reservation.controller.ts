import { NextFunction, Request, Response } from "express";

import { AppError } from "@cloud10lms/shared/build/utils/appError";
import Reservation from "../models/reservation.model";
import { catchAsync } from "@cloud10lms/shared/build/utils/catchAsync";
import { reservationService } from "../services/reservations.db";

export const getReservations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query };

    const options = {
      populate: req.query.populate,
      fields: req.query.fields,
      limit: req.query.limit,
      sort: req.query.sort,
    };

    const reservations = await reservationService.getAllReservations(
      queryObj,
      options
    );

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

    const reservation = reservationService.getReservationById(id);

    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }

    await Reservation.findByIdAndUpdate(id, { ...req.body });

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

    await reservationService.createReservation({ ...body });

    res.status(201).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
