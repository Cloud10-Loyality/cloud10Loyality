import { Schema, model, InferSchemaType } from "mongoose";

const reservationSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    hotelName: {
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
    checkIn: {
      type: Date,
      default: Date.now(),
      required: [true, "Check-in date is required"],
    },
    checkOut: {
      type: Date,
      required: [true, "Check-out date is required"],
    },
    paymentMethod: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    paymentCard: {
      cardHolderName: {
        type: String,
      },
      cardNumber: {
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

export type ReservationType = InferSchemaType<typeof reservationSchema>;

reservationSchema.index({ hotelName: 1 });

const Reservation = model<ReservationType>("Reservation", reservationSchema);

export default Reservation;
