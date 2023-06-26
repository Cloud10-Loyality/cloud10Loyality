import mongoose, { Model } from "mongoose";
import { BurnType } from "../../types";

type BurnModelType = Model<BurnType>;

const burnSchema = new mongoose.Schema<BurnType>(
  {
    policyId: { type: String },
    tokenName: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: Number },
  },
  { timestamps: true }
);

const Burn = mongoose.model<BurnType, BurnModelType>("Burn", burnSchema);

export default Burn;
