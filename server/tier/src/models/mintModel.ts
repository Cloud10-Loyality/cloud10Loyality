import mongoose from "mongoose";

const mintSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: String },
  },
  { timestamps: true }
);

const Mint = mongoose.model("Mint", mintSchema);

export default Mint;
