import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
} from "mongoose";

import { AdminType } from "../../types";
import { createHash } from "@c10lms/common";

interface AdminQueryHelpers {
  byUsername(
    username: string
  ): QueryWithHelpers<
    HydratedDocument<AdminType>[],
    HydratedDocument<AdminType>,
    AdminQueryHelpers
  >;
}

type AdminModelType = Model<AdminType, AdminQueryHelpers>;

const adminSchema = new Schema<AdminType, {}, {}, AdminQueryHelpers>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

adminSchema.index({ name: 1 });

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password!);
  next();
});

adminSchema.query.byUsername = function byUsername(
  this: QueryWithHelpers<any, HydratedDocument<AdminType>, AdminQueryHelpers>,
  username: string
) {
  return this.find({ username });
};

const Admin = model<AdminType, AdminModelType>("Admin", adminSchema);

export default Admin;
