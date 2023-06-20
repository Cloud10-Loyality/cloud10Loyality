import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";

import { UserType } from "../../types";

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

type UserModelType = Model<UserType, UserQueryHelpers, {}, {}>;

const userSchema = new Schema<UserType, {}, {}, UserQueryHelpers>({
  _id: {
    type: Schema.Types.ObjectId,
    required: [true, "Id is required"],
    auto: false,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    minLength: [3, "Email must be at least 3 characters long"],
    maxLength: [55, "Email must be at most 55 characters long"],
  },
  phone: {
    type: Number,
    // required: [true, "Phone number is required"],
    unique: true,
    minLength: [3, "Phone number must be at least 3 characters long"],
    maxLength: [10, "Phone number must be at most 10 characters long"],
  },
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
