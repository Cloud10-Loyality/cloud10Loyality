import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";

import { BookingType } from "../../types";

interface BookingQueryHelpers {
  byUserEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<BookingType>[],
    HydratedDocument<BookingType>,
    BookingQueryHelpers
  >;
}

type BookingModelType = Model<BookingType, BookingQueryHelpers, {}, {}>;

const bookingSchema = new Schema<BookingType, {}, {}, BookingQueryHelpers>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: false,
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
    zipCode: {
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
    country: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    // numberOfGuests: {
    //   type: Number,
    //   required: [true, "Number of guests is required"],
    // },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    userEmail: {
      type: String,
      required: [true, "User email is required"],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

bookingSchema.query.byUserEmail = function byUserEmail(
  this: QueryWithHelpers<
    any,
    HydratedDocument<BookingType>,
    BookingQueryHelpers
  >,
  email: string
) {
  return this.find({ userEmail: email });
};

const Booking = model<BookingType, BookingModelType>("Booking", bookingSchema);

export default Booking;
