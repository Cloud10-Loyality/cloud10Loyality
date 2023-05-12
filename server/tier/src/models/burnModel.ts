import mongoose from "mongoose";

const burnSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String },
    txHash: { type: String },
    unit: { type: String },
  },
  { timestamps: true }
);

const Burn = mongoose.model("Burn", burnSchema);

export default Burn;
