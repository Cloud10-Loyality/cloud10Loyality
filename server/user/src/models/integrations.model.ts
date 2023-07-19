import { Model, Schema, Types, model } from "mongoose";

import { IntegrationType } from "../../types";

type IntegrationsModelType = Model<IntegrationType>;

const integrationsSchema = new Schema<IntegrationType>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      required: [true, "Id is required"],
      auto: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      required: [true, "Name is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
    },
  }
);

const Integrations = model<IntegrationType, IntegrationsModelType>(
  "Integrations",
  integrationsSchema
);

export default Integrations;
