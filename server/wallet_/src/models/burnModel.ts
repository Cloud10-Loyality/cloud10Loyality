import mongoose from "mongoose";

const burnSchema = new mongoose.Schema(
  {
    policyId: { type: String },
    token_name: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: Number },
  },
  { timestamps: true }
);

const Burn = mongoose.model("Burn", burnSchema);

export default Burn;
