import { InferSchemaType, Schema, model } from "mongoose";

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
        unique: true,
        lowercase: true,
        minLength: [3, "Email must be at least 3 characters long"],
        maxLength: [55, "Email must be at most 55 characters long"],
      },
      gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true,
      },
      age: {
        type: Number,
      },
      uid: {
        type: String,
        // required: [true, "Email is required"],
      },
      dob: {
        type: Date,
        required: [true, "Date of birth is required"],
      },
      phone: {
        type: Number,
        // required: [true, "Phone number is required"],
        unique: true,
        minLength: [3, "Phone number must be at least 3 characters long"],
        maxLength: [10, "Phone number must be at most 10 characters long"],
      },
      country: {
        type: String,
        // required: [true, "Country is required"],
        minLength: [3, "Country must be at least 3 characters long"],
        maxLength: [55, "Country must be at most 55 characters long"],
      },
      state: {
        type: String,
        // required: [true, "State is required"],
        minLength: [3, "State must be at least 3 characters long"],
        maxLength: [55, "State must be at most 55 characters long"],
      },
      city: {
        type: String,
        // required: [true, "City is required"],
        minLength: [3, "City must be at least 3 characters long"],
        maxLength: [55, "City must be at most 55 characters long"],
      },
      zipCode: {
        type: Number,
        // required: [true, "Zip code is required"],
      },
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
