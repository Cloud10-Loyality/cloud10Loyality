import { AppError, Request, catchAsync } from "@c10lms/common";
import { NextFunction, Response } from "express";

import Reservation from "../models/reservation.model";
import { ReservationCreatedPublisher } from "../events/publisher/reservation-created-publisher";
import { ReservationDeletedPublisher } from "../events/publisher/reservation-deleted-publisher";
import { Types } from "mongoose";
import { natsClient } from "../nats-client";
import { reservationService } from "../services/reservations.db";

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
      user: {
        firstname: reservation.user!?.firstname,
        lastname: reservation.user!?.lastname,
        email: reservation.user!?.email,
        phone: reservation.user!?.phone,
        gender: reservation.user!?.gender as unknown as
          | "male"
          | "female"
          | "other",
        dob: reservation.user!?.dob,
        age: reservation.user!?.age,
        uid: reservation.user!?.uid,
        country: reservation.user!?.country,
        state: reservation.user!?.state,
        city: reservation.user!?.city,
        zipCode: reservation.user!?.zipCode,
      },
      amount: reservation.amount,
      managerId: reservation.managerId,
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

export const deleteReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const reservation = await reservationService.getReservationById(id);

    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }

    await reservationService.deleteReservation(id);

    await new ReservationDeletedPublisher(natsClient.client).publish({
      _id: reservation._id as unknown as Types.ObjectId,
      user: {
        firstname: reservation.user!?.firstname,
        lastname: reservation.user!?.lastname,
        email: reservation.user!?.email,
        phone: reservation.user!?.phone,
      },
      amount: reservation.amount,
      managerId: reservation.managerId,
      checkIn: reservation.checkIn as unknown as string,
      checkOut: reservation.checkOut as unknown as string,
      city: reservation.city,
      hotelName: reservation.hotelName,
      paymentMethod: "Testing" as string,
      pin: reservation.pin,
      state: reservation.state,
      paymentCard: reservation.paymentCard,
    });

    res.status(200).json({
      status: "success",
      error: false,
      data: null,
    });
  }
);
