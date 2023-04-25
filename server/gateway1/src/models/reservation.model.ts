import { Schema, model } from "mongoose";

import { NextFunction } from "express";
import { Reservations } from "../../types";

const reservationSchema = new Schema<Reservations>(
  {
    hotel_name: {
      type: String,
      required: [true, "Hotel name is required"],
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    state: {
      type: String,
      required: [true, "State is required"],
    },
    pin: {
      type: String,
      required: [true, "Pin is required"],
    },
    check_in: {
      type: Date,
      default: Date.now(),
      required: [true, "Check-in date is required"],
    },
    check_out: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    payment_method: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    payment_card: {
      card_holder_name: {
        type: String,
      },
      card_number: {
        type: String,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

reservationSchema.index({ fakeEmail: 1 });

const Reservation = model("Reservation", reservationSchema);

export default Reservation;
