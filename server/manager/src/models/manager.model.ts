import { Model, Schema, model } from "mongoose";

import { ManagerType } from "../../types";

type ManagerModelType = Model<ManagerType>;

const managerSchema = new Schema<ManagerType>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: false,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      select: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    role: {
      type: String,
      enum: ["ADMIN", "USER", "MANAGER"],
      default: "MANAGER",
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pin: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

const Manager = model<ManagerType, ManagerModelType>("Manager", managerSchema);

export default Manager;
