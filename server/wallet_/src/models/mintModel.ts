import mongoose from "mongoose";

const mintSchema = new mongoose.Schema(
  {
    policyId: { type: String },
    token_name: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: Number },
  },
  { timestamps: true }
);

const Mint = mongoose.model("Mint", mintSchema);

export default Mint;
