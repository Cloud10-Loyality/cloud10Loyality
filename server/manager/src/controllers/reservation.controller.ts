import { AppError, Request, catchAsync } from "@c10lms/common";
import { ManagerType, Role } from "../../types";
import { NextFunction, Response } from "express";

import Reservation from "../models/reservation.model";
import { Types } from "mongoose";
import { natsClient } from "../nats-client";
import { reservationService } from "../services/reservation.db";

// import { ReservationCreatedPublisher } from "../events/publisher/reservation-created-publisher";

// import { reservationService } from "../services/reservations.db";

export const getReservations = catchAsync(
  async (
    req: Request<ManagerType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    const role = req.role;

    if (role !== "ADMIN") {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }

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
      data: {
        reservations,
      },
    });
  }
);

export const getReservationsByManager = catchAsync(
  async (
    req: Request<ManagerType, Role>,
    res: Response,
    next: NextFunction
  ) => {
    console.log(req.manager, "----");

    const role = req.role;
    const { _id } = req.manager;

    if (role === "USER") {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }
    console.log(req.manager, "--+++--");

    const { populate, fields, limit, sort } = req.query;
    const queryObj = { ...req.query };

    const options = {
      populate,
      fields,
      limit,
      sort,
    };

    console.log(req.manager, "--__--");

    const reservations = await reservationService.getAllReservationsByManager(
      _id!,
      queryObj,
      options
    );

    res.status(200).json({
      message: "success",
      error: false,
      totalRecords: reservations.length,
      data: {
        reservations,
      },
    });
  }
);

// export const updateReservation = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;

//     const reservation = reservationService.getReservationById(id);

//     if (!reservation) {
//       return next(new AppError("Reservation not found", 404));
//     }

//     await Reservation.findByIdAndUpdate(id, { ...req.body });

//     res.status(200).json({
//       status: "success",
//       error: false,
//       data: null,
//     });
//   }
// );

// export const createReservation = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const body = req.body;

//     if (!body) {
//       return next(
//         new AppError("Please provide all the required reservation details", 400)
//       );
//     }

//     await reservationService.createReservation({ ...body });

//     res.status(201).json({
//       message: "success",
//       error: false,
//       data: null,
//     });
//   }
// );

export const deleteReservation = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const reservation = await reservationService.getReservationById(id);

    if (!reservation) {
      return next(new AppError("Reservation not found", 404));
    }

    await reservationService.deleteReservation(id);

    res.status(200).json({
      status: "success",
      error: false,
      data: null,
    });
  }
);
