import mongoose, { Model, Schema } from "mongoose";
import { MintType } from "../../types";

type MintModelType = Model<MintType>;

const mintSchema = new Schema<MintType>(
  {
    policyId: { type: String },
    tokenName: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: Number },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Mint = mongoose.model<MintType, MintModelType>("Mint", mintSchema);

export default Mint;
