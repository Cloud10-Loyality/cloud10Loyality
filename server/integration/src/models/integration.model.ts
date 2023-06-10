import { InferSchemaType, Schema, model } from "mongoose";

import { createHash } from "@cloud10lms/shared";
import validator from "validator";

const integrationSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      select: false,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
      validate: [validator.isStrongPassword, "Password is not strong enough"],
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

export type IntegrationType = InferSchemaType<typeof integrationSchema>;

integrationSchema.index({ name: 1 });

integrationSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await createHash(this.password);
  next();
});

const Integration = model<IntegrationType>("Integration", integrationSchema);

export default Integration;
