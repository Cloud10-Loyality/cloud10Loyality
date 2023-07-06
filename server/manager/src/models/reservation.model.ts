import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  Types,
  model,
} from "mongoose";
import { ManagerType, ReservationType } from "../../types";

interface ReservationQueryHelpers {
  byManager(
    managerId: Types.ObjectId
  ): QueryWithHelpers<
    HydratedDocument<ManagerType>[],
    HydratedDocument<ManagerType>,
    ReservationQueryHelpers
  >;
}

type ReservationModelType = Model<ReservationType, ReservationQueryHelpers>;

const reservationSchema = new Schema<
  ReservationType,
  {},
  {},
  ReservationQueryHelpers
>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: false,
    },
    hotelName: {
      type: String,
      required: [true, "Hotel name is required"],
    },
    managerId: {
      type: Schema.Types.ObjectId,
      required: [true, "Manager id is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
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
    city: {
      type: String,
    },
    paymentCard: {
      cardHolderName: {
        type: String,
      },
      cardNumber: {
        type: String,
      },
    },
    paymentMethod: {
      type: String,
    },
    pin: {
      type: String,
    },
    state: {
      type: String,
    },
    user: {
      firstname: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [55, "Name must be at most 55 characters long"],
      },
      lastname: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [55, "Name must be at most 55 characters long"],
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        lowercase: true,
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
      },
      age: {
        type: Number,
      },
      uid: {
        type: String,
      },
      dob: {
        type: Date,
        required: [true, "Date of birth is required"],
      },
      phone: {
        type: Number,
        minLength: [3, "Phone number must be at least 3 characters long"],
        maxLength: [10, "Phone number must be at most 10 characters long"],
      },
      country: {
        type: String,
      },
      state: {
        type: String,
      },
      city: {
        type: String,
      },
      zipCode: {
        type: Number,
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

reservationSchema.index({ hotelName: 1 });

reservationSchema.query.byManager = function (
  this: QueryWithHelpers<
    any,
    HydratedDocument<ManagerType>,
    ReservationQueryHelpers
  >,
  managerId: Types.ObjectId
) {
  return this.where({ managerId });
};

const Reservation = model<ReservationType, ReservationModelType>(
  "Reservation",
  reservationSchema
);

export default Reservation;
