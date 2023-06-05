import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";

import { UserType } from "../../types";

interface IUserMethods {
  fullName(): string;
}

interface UserQueryHelpers {
  byEmail(
    email: string
  ): QueryWithHelpers<
    HydratedDocument<UserType>[],
    HydratedDocument<UserType>,
    UserQueryHelpers
  >;
  byPhone(
    phone: number
  ): QueryWithHelpers<
    HydratedDocument<UserType>[],
    HydratedDocument<UserType>,
    UserQueryHelpers
  >;
}

type UserModelType = Model<UserType, UserQueryHelpers, {}, IUserMethods>;

const userSchema = new Schema<UserType, IUserMethods, {}, UserQueryHelpers>({
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
});

userSchema.method("fullName", function fullName() {
  return `${this.firstname} ${this.lastname}`;
});

userSchema.query.byEmail = function byEmail(
  this: QueryWithHelpers<any, HydratedDocument<UserType>, UserQueryHelpers>,
  email: string
) {
  return this.find({ email });
};

userSchema.query.byPhone = function byPhone(
  this: QueryWithHelpers<any, HydratedDocument<UserType>, UserQueryHelpers>,
  phone: number
) {
  return this.find({ phone });
};

const User = model<UserType, UserModelType>("User", userSchema);

export default User;
