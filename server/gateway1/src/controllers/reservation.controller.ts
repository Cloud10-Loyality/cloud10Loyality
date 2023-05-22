import { NextFunction, Response } from "express";

import { AppError, catchAsync, Request } from "@cloud10lms/shared";
import Reservation from "../models/reservation.model";
import { reservationService } from "../services/reservations.db";
import { ReservationCreatedPublisher } from "../events/publisher/reservation-created-publisher";
import { natsClient } from "../nats-client";
import { Types } from "mongoose";

export const getReservations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { populate, fields, limit, sort } = req.query;
    const queryObj = { ...req.query };

    const options = {
      populate,
      fields,
      limit,
      sort,
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

    const reservation = await reservationService.createReservation({ ...body });

    await new ReservationCreatedPublisher(natsClient.client).publish({
      _id: reservation._id as unknown as Types.ObjectId,
      user: reservation._id as unknown as Types.ObjectId,
      amount: reservation.amount,
      checkIn: reservation.checkIn as unknown as string,
      checkOut: reservation.checkOut as unknown as string,
      city: reservation.city,
      hotelName: reservation.hotelName,
      paymentMethod: "Testing" as string,
      pin: reservation.pin,
      state: reservation.state,
    });

    res.status(201).json({
      message: "success",
      error: false,
      data: null,
    });
  }
);
