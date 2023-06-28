import mongoose, { Model, Schema } from "mongoose";
import { MintMetadataType } from "../../types";

type MintMetadataModelType = Model<MintMetadataType>;

const mintMetadataSchema = new Schema<MintMetadataType>(
  {
    policyId: { type: String },
    metadata: {
      email: { type: String },
      description: { type: String },
      label: { type: String },
      policyId: { type: String },
      tokenName: { type: String },
      image: { type: String },
      unit: { type: Number },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const MintMetadata = mongoose.model<MintMetadataType, MintMetadataModelType>(
  "MintMetadata",
  mintMetadataSchema
);

export default MintMetadata;
