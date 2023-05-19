import { InferSchemaType, Schema, model } from "mongoose";

const integrationSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: false,
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

export type IntegrationType = InferSchemaType<typeof integrationSchema>;

const Integration = model<IntegrationType>("Integration", integrationSchema);

export default Integration;
