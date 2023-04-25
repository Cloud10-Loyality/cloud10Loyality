import { Schema, model } from "mongoose";
import { Integration } from "../../types";

const integrationSchema = new Schema<Integration>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
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

integrationSchema.index({ name: 1 });

const Integration = model("Integration", integrationSchema);

export default Integration;
