import { Schema, Types, model } from "mongoose";

import { Integration as IntegrationInterface } from "../../types";

const integrationSchema = new Schema<IntegrationInterface>(
  {
    _id: {
      type: Types.ObjectId,
      required: [true, "Integration id is required"],
    },
    name: {
      type: String,
      required: [true, "Integration name is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Integration = model<IntegrationInterface>(
  "Integration",
  integrationSchema
);
